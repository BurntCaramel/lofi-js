import prepareMarkdownLine from './prepareMarkdownLine'
import test from 'ava'

test('primary', t => {
    t.deepEqual(
        prepareMarkdownLine('# Hello'),
        {
            text: 'Hello',
            tags: { primary: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine('#Hello'),
        {
            text: 'Hello',
            tags: { primary: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine(' # Hello'),
        {
            text: ' # Hello',
            tags: {}
        }
    )
})

test('secondary', t => {
    t.deepEqual(
        prepareMarkdownLine('## Hello'),
        {
            text: 'Hello',
            tags: { secondary: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine('##Hello'),
        {
            text: 'Hello',
            tags: { secondary: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine(' ## Hello'),
        {
            text: ' ## Hello',
            tags: {}
        }
    )
})

test('tertiary', t => {
    t.deepEqual(
        prepareMarkdownLine('### Hello'),
        {
            text: 'Hello',
            tags: { tertiary: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine('###Hello'),
        {
            text: 'Hello',
            tags: { tertiary: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine(' ### Hello'),
        {
            text: ' ### Hello',
            tags: {}
        }
    )
})

test('whitespace code', t => {
    t.deepEqual(
        prepareMarkdownLine('  Hello'),
        {
            text: 'Hello',
            tags: { code: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine('  # Hello'),
        {
            text: '# Hello',
            tags: { code: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine('   Hello'),
        {
            text: ' Hello',
            tags: { code: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine('   # Hello'),
        {
            text: ' # Hello',
            tags: { code: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine('  '),
        {
            text: '',
            tags: { code: true }
        }
    )
})

// test('backtick code', t => {
//     t.deepEqual(
//         prepareMarkdownLine('`some code`'),
//         {
//             text: 'some code',
//             tags: { code: true }
//         }
//     )

//     t.deepEqual(
//         prepareMarkdownLine('`not code'),
//         {
//             text: '`not code',
//             tags: {}
//         }
//     )

//     t.deepEqual(
//         prepareMarkdownLine('not code`'),
//         {
//             text: 'not code`',
//             tags: {}
//         }
//     )

//     t.deepEqual(
//         prepareMarkdownLine(' `not code`'),
//         {
//             text: ' `not code`',
//             tags: {}
//         }
//     )
// })

test('quote', t => {
    t.deepEqual(
        prepareMarkdownLine('> Hello'),
        {
            text: 'Hello',
            tags: { quote: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine('>Hello'),
        {
            text: 'Hello',
            tags: { quote: true }
        }
    )

    t.deepEqual(
        prepareMarkdownLine(' > Hello'),
        {
            text: ' > Hello',
            tags: {}
        }
    )
})
