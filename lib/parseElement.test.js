import parseElement from './parseElement'
import test from 'ava'

test('Text', t => {
    t.deepEqual(
        parseElement('Hello world'),
        {
            texts: ['Hello world'],
            mentions: [null],
            tags: {},
            children: []
        }
    )

    t.deepEqual(
        parseElement(''),
        {
            texts: [],
            mentions: [],
            tags: {},
            children: []
        }
    )
})

test('Boolean tags', t => {
    t.deepEqual(
        parseElement('Hello #test'),
        {
            texts: ['Hello'],
            mentions: [null],
            tags: { test: true },
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello world #test #yolo #truth'),
        {
            texts: ['Hello world'],
            mentions: [null],
            tags: { test: true, yolo: true, truth: true },
            children: []
        }
    )

    t.deepEqual(
        parseElement('#test #yolo #truth'),
        {
            texts: [],
            mentions: [],
            tags: { test: true, yolo: true, truth: true },
            children: []
        }
    )
})

test('Key-value tags', t => {
    t.deepEqual(
        parseElement('Hello #color: red'),
        {
            texts: ['Hello'],
            mentions: [null],
            tags: {
                color: {
                    texts: ['red'],
                    mentions: [null]
                }
            },
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello world #name: John Smith'),
        {
            texts: ['Hello world'],
            mentions: [null],
            tags: {
                name: {
                    texts: ['John Smith'],
                    mentions: [null],
                }
            },
            children: []
        }
    )
})

test('Mentions', t => {
    t.deepEqual(
        parseElement('@something'),
        {
            texts: [''],
            mentions: [['something']],
            tags: {},
            children: []
        }
    )

    t.deepEqual(
        parseElement('@mention then text'),
        {
            texts: ['', ' then text'],
            mentions: [['mention'], null],
            tags: {},
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello @first-name @last-name'),
        {
            texts: ['Hello ', ' '],
            mentions: [['first-name'], ['last-name']],
            tags: {},
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello @first-name more text'),
        {
            texts: ['Hello ', ' more text'],
            mentions: [['first-name'], null],
            tags: {},
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello @first-name, how are you?'),
        {
            texts: ['Hello ', ', how are you?'],
            mentions: [['first-name'], null],
            tags: {},
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello world #name: @first-name'),
        {
            texts: ['Hello world'],
            mentions: [null],
            tags: {
                name: {
                    texts: [''],
                    mentions: [['first-name']]
                }
            },
            children: []
        }
    )
})

test('Key-path mentions', t => {
    t.deepEqual(
        parseElement('@something.nested.yes'),
        {
            texts: [''],
            mentions: [['something', 'nested', 'yes']],
            tags: {},
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello @name.first'),
        {
            texts: ['Hello '],
            mentions: [['name', 'first']],
            tags: {},
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello @people.0.name'),
        {
            texts: ['Hello '],
            mentions: [['people', 0, 'name']],
            tags: {},
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello world #name: @name.first'),
        {
            texts: ['Hello world'],
            mentions: [null],
            tags: {
                name: {
                    texts: [''],
                    mentions: [['name', 'first']]
                }
            },
            children: []
        }
    )

    t.deepEqual(
        parseElement('Hello world #name: @people.0.name'),
        {
            texts: ['Hello world'],
            mentions: [null],
            tags: {
                name: {
                    texts: [''],
                    mentions: [['people', 0, 'name']]
                }
            },
            children: []
        }
    )
})

