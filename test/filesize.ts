import { test } from '@bicycle-codes/tapzero'
import { humanFilesize } from '../src/filesize.js'

test('human filesize', t => {
    const size = humanFilesize(10_000)
    t.equal(size, '9.8 KiB', 'should return ')
})

test('human filesize, use SI units', t => {
    t.equal(humanFilesize(10_000, true), '10.0 kB')
})

test('decimal places', t => {
    t.equal(humanFilesize(10_000, true, 0), '10 kB')
})
