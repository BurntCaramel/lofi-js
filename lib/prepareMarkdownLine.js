const R = require('ramda')

const isCode = /^  /g
const isPrimaryHeading = /^#\s*\b/g
const isSecondaryHeading = /^##\s*\b/g
const isTertiaryHeading = /^###\s*\b/g
const isQuote = /^>\s*\b/g

const processAndAddTags = R.curry((f, tags, input) => ({
	text: f(input),
	tags
}))

const processLine = R.cond([
	[ R.test(isCode), processAndAddTags(R.replace(isCode, ''), { code: true }) ],
	[ R.test(isPrimaryHeading), processAndAddTags(R.replace(isPrimaryHeading, ''), { primary: true }) ],
	[ R.test(isSecondaryHeading), processAndAddTags(R.replace(isSecondaryHeading, ''), { secondary: true }) ],
	[ R.test(isTertiaryHeading), processAndAddTags(R.replace(isTertiaryHeading, ''), { tertiary: true }) ],
	[ R.test(isQuote), processAndAddTags(R.replace(isQuote, ''), { quote: true }) ],
	[ R.T, processAndAddTags(R.identity, {}) ]
])

module.exports = processLine
