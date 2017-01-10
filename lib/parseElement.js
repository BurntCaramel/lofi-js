const R = require('ramda')

const rejectEmptyStrings = require('./rejectEmptyStrings')

const tagsRegex = /\B#\w+(:\s*[^#]*)?/g

const parseText = R.pipe(
	R.replace(/\B#.+/g, ''), // remove tags
	R.replace(/\B@\w*(.\w*)*/g, ''), // remove mentions
	R.replace(/\s+/g, ' '), // clean up spaces
	R.trim
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
	(text, tags, references) => ({ text, tags, references, children: [] }),
	[
		parseText,
		parseTags,
		R.pipe(
			R.replace(tagsRegex, ''),
			parseMentions
		)
	]
)

module.exports = parseElement
