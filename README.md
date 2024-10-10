# util
![tests](https://github.com/bicycle-codes/util/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@bicycle-codes/util?style=flat-square)](README.md)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)


## install
```sh
npm i -S @bicycle-codes/util
```

## use

### sleep
Import sleep from here to reduce duplication.

```js
import { sleep } from '@bicycle-codes/util/sleep'
```

#### sleep API
```ts
function sleep (ms?:number):Promise<void>
```

### Queue
```js
import { Queue } from '@bicycle-codes/util/queue'
```

Create a queue of promises. Promises will execute 1 at a time, in sequential order.

```ts
class Queue<T> {
    add (createP:()=>Promise<T>):Promise<T|void>
}
```

#### add
Take a function that returns a promise. Return a promise that will resolve when
the created promise resolves.

```ts
add (createP:()=>Promise<T>):Promise<T|void>
```

> [!NOTE]  
> This will resolve promises in the order they were added to the queue.

#### example

```ts
import { test } from '@bicycle-codes/tapzero'
import { Queue } from '@bicycle-codes/util'

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
        t.equal(value, 'p1', '"p1" string is ok')
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

    // return 3 so the test knows when to end,
    // because they resolve in order,
    // even though the ms are backwards
    return p3
})
```
