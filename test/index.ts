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
    const p1 = new Promise<string>(resolve => {
        setTimeout(() => resolve('p1'), 100)
    })

    const p2 = new Promise<string>(resolve => {
        setTimeout(() => {
            resolve('p2')
        }, 200)
    })

    let gotTwo:boolean = false
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

test('queue of 3 items', t => {
    const q = new Queue<string>()

    // [p1, p2, p3]
    const returned = [false, false, false]

    const p1 = q.add(() => {
        return new Promise<string>(resolve => {
            setTimeout(() => resolve('p1'), 300)
        })
    })

    const p2 = q.add(() => {
        return new Promise<string>(resolve => {
            setTimeout(() => resolve('p2'), 200)
        })
    })

    const p3 = q.add(() => {
        return new Promise<string>(resolve => {
            setTimeout(() => resolve('p3'), 100)
        })
    })

    // p1 takes the longest
    p1.then((value) => {
        t.equal(value, 'p1', 'p1 string is ok')
        returned[0] = true
        t.ok(!returned[2], 'p2 should not have returned yet')
        t.ok(!returned[1], 'p1 should not have returned yet')
    })

    p2.then(value => {
        t.equal(value, 'p2', 'should get string "p2"')
        returned[1] = true
        t.ok(returned[0], 'should have p1 b/c it was added first')
        t.ok(!returned[2], 'should not have 3 yet b/c it was addded last')
    })

    // p3 is the fastest
    p3.then(value => {
        t.equal(value, 'p3', 'should get string "p3"')
        returned[2] = true
        t.ok(returned[0], 'should have p1 because it was added first')
        t.ok(returned[1], 'should have p2 because it was added next')
    })

    // return 3 because they resolve in order,
    // event though the ms are backwards
    return p3
})
