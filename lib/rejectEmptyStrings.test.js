import rejectEmptyStrings from './rejectEmptyStrings'
import test from 'ava'

test('empty strings', t => {
    t.deepEqual(
        rejectEmptyStrings([
            '',
            '   ',
            '\t\n'
        ]),
        []
    )
})

test('non-empty strings', t => {
    t.deepEqual(
        rejectEmptyStrings([
            't',
            'abc',
            '  def  '
        ]),
        [
            't',
            'abc',
            '  def  '
        ]
    )
})

test('mix of strings', t => {
    t.deepEqual(
        rejectEmptyStrings([
            't',
            'abc',
            '',
            '   ',
            '\t\n',
            '  def  '
        ]),
        [
            't',
            'abc',
            '  def  '
        ]
    )
})
