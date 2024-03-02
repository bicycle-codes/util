import { test } from '@bicycle-codes/tapzero'
import { Queue } from '../src/index.js'

test('queue', t => {
    const start = Date.now()
    const q = new Queue<string>()

    const hello = q.add(() => new Promise(resolve => {
        setTimeout(() => {
            resolve('hello')
        }, 1000)
    }))

    const world = q.add(() => new Promise(resolve => {
        setTimeout(() => {
            resolve('world')
        }, 1000)
    }))

    hello.then(res => {
        t.equal(res, 'hello', 'should get the expected value')
        t.ok(Date.now() - start >= 1000,
            'should resolve the promise')
    })

    return world.then(res => {
        t.ok(Date.now() - start >= 2000,
            'should resolve the promises sequentially')
        t.equal(res, 'world')
    })
})

test('queue with async', async t => {
    const q = new Queue<string>()
    const test = await q.add(() => Promise.resolve('test'))
    t.equal(test, 'test', 'should resolve the promise')

    const test2 = await q.add(() => Promise.resolve('test two'))
    t.equal(test2, 'test two', 'should resolve the second promise')
})

/**
 * Here the promises should return in the order that we
 * added them to the queue
 */
test('queue multiple promises', async t => {
    const q = new Queue<string>()
    const p1 = new Promise<string>((resolve) => {
        setTimeout(() => resolve('p1'), 100)
    })

    const p2 = new Promise<string>(resolve => {
        setTimeout(() => {
            resolve('p2')
        }, 200)
    })

    let gotTwo
    q.add(() => p2)
        .then(res => {
            gotTwo = true
            t.equal(res, 'p2')
        })

    const queuePromise1 = q.add(() => p1)
        .then(res => {
            t.equal(res, 'p1')
            t.ok(gotTwo, 'should get results in order they were added')
        })

    return queuePromise1
})
