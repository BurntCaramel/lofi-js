const R = require('ramda')

const rejectEmptyStrings = require('./rejectEmptyStrings')

const tagsRegex = /\B#\w+(:\s*[^#]*)?/g
const mentionsRegex = /\B@([a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]+)*)/g

const reduceMultipleSpaces = R.replace(/\s+/g, ' ')

const convertToKeyPath = R.pipe(
	R.trim,
	R.split('.'),
	rejectEmptyStrings,
	R.map(R.when(
		R.test(/^\d/), // Starts with a digit
		(input) => parseInt(input, 10) // Convert to number
	))
)

const reduceTextAndMentionSeries = R.reduce((result, [text, mention]) => {
	if (text !== '' || mention != null) {
		result.texts.push(reduceMultipleSpaces(text))
		result.mentions.push(mention == null ? null : convertToKeyPath(mention))
	}
	return result
})

const parseTextAndMentions = R.pipe(
	R.split(mentionsRegex), // split at mentions
	R.splitEvery(2),
	(list) => reduceTextAndMentionSeries({ texts: [], mentions: [] }, list)
)

const parseTags = R.pipe(
	R.match(tagsRegex), // match tags,
	R.map(R.pipe(
		R.match(/\B#([a-zA-Z0-9-_]+)(:\s*([^#]*))?/), // capture tag elements,
		R.props([1, 3]),
		R.adjust(
			R.pipe(
				R.when(
					R.is(String),
					parseTextAndMentions
				),
				R.defaultTo(true)
			),
			1
		)
	)),
	R.fromPairs
)

const parseElement = R.converge(
	({ texts, mentions }, tags) => ({ texts, mentions, tags, children: [] }),
	[
		R.pipe(
			R.replace(tagsRegex, ''),
			R.trim(),
			parseTextAndMentions
		),
		parseTags
	]
)

module.exports = parseElement
