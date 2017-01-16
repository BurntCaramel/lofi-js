const R = require('ramda')

const rejectEmptyStrings = require('./rejectEmptyStrings')

const tagsRegex = /\B#\w+(:\s*[^#]*)?/g
const mentionsRegex = /\B@\w*(.\w*)*/g

const parseText = R.pipe(
	R.replace(mentionsRegex, ''), // remove mentions
	R.replace(/\s+/g, ' ') // reduce multiple spaces
)

const parseMentions = R.pipe(
	R.match(/@(\w+)(.\w*)*/g), // match references
	R.map(R.tail),
	rejectEmptyStrings,
    // Convert to key path
	R.map(R.pipe(
		R.trim,
		R.split('.'),
		rejectEmptyStrings,
		R.map(R.when(
			R.test(/^\d/), // Starts with a digit
            (input) => parseInt(input, 10) // Convert to number
		))
	))
)

const parseTagContent = R.converge(
	(text, references) => ({ text, references }),
	[
		parseText,
		parseMentions
	]
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
					parseTagContent
				),
				R.defaultTo(true)
			),
			1
		)
	)),
	R.fromPairs
)

const parseElement = R.converge(
	([ text, references ], tags) => ({ text, tags, references, children: [] }),
	[
		R.pipe(
			R.replace(tagsRegex, ''),
			R.trim(),
			R.juxt([
				parseText,
				parseMentions
			])
		),
		parseTags
	]
)

module.exports = parseElement
