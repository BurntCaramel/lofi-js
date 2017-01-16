import parseElement from './parseElement'
import test from 'ava'

test('Text', t => {
    t.deepEqual(
        parseElement('Hello world'),
        {
            text: 'Hello world',
            tags: {},
            references: [],
            children: []
        }
    )

    t.deepEqual(
        parseElement(''),
        {
            text: '',
            tags: {},
            references: [],
            children: []
        }
    )
})

test('Boolean tags', t => {
    t.deepEqual(
        parseElement('Hello #test'),
        {
            text: 'Hello',
            tags: { test: true },
            references: [],
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello world #test #yolo #truth'),
        {
            text: 'Hello world',
            tags: { test: true, yolo: true, truth: true },
            references: [],
            children: []
        }
    )

    t.deepEqual(
        parseElement('#test #yolo #truth'),
        {
            text: '',
            tags: { test: true, yolo: true, truth: true },
            references: [],
            children: []
        }
    )
})

test('Key-value tags', t => {
    t.deepEqual(
        parseElement('Hello #color: red'),
        {
            text: 'Hello',
            tags: {
                color: {
                    text: 'red',
                    references: []
                }
            },
            references: [],
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello world #name: John Smith'),
        {
            text: 'Hello world',
            tags: {
                name: {
                    text: 'John Smith',
                    references: []
                }
            },
            references: [],
            children: []
        }
    )
})

test('Mentions', t => {
    t.deepEqual(
        parseElement('Hello @first-name'),
        {
            text: 'Hello',
            tags: {},
            references: [['first-name']],
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello world #name: @first-name'),
        {
            text: 'Hello world',
            tags: {
                name: {
                    text: '',
                    references: [['first-name']]
                }
            },
            references: [],
            children: []
        }
    )
})
