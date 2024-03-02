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

### Queue
Create a queue of promises. Promises will execute 1 at a time, in sequential order.

#### add
Take a function that returns a promise. Return a promise that will resolve when
the created promise resolves.

```ts
add (createPromise:() => Promise<T>):Promise<T>
```

> [!NOTE]  
> This will resolve promises in the order they were added to the queue.

#### example

```ts
import { test } from '@bicycle-codes/tapzero'
import { Queue } from '@bicycle-codes/util'

test('queue multiple promises', async t => {
    const q = new Queue<string>()

    const p1 = new Promise<string>(resolve => {
        setTimeout(() => resolve('p1'), 100)
    })

    const p2 = new Promise<string>(resolve => {
        setTimeout(() => resolve('p2'), 200)
    })

    let gotTwo:boolean = false

    // add a function that returns a promise
    q.add(() => p2)
        .then(res => {
            gotTwo = true
            t.equal(res, 'p2')
        })

    q.add(() => p1)
        .then(res => {
            t.equal(res, 'p1')
            t.ok(gotTwo, 'should get results in order they were added')
        })
})
```
