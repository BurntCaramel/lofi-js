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

test('code', t => {
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
