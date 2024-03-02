# util
![tests](https://github.com/nichoth/template-ts/actions/workflows/nodejs.yml/badge.svg)

## install
```sh
npm i -S @bicycle-codes/util
```

## use

### Queue
Create a queue of promises. Promises will execute 1 at a time, in sequential order.

> [!NOTE]  
> This will resolve promises in the order they were added to the queue.

#### example

```ts
import { Queue } from '@bicycle-codes/util'
const q = new Queue<string>()

// add a function that returns a promise

const p1 = new Promise<string>(resolve => {
    setTimeout(() => resolve('p1'), 100)
})

const p2 = new Promise<string>(resolve => {
    setTimeout(() => resolve('p2'), 200)
})

let gotTwo:boolean = false
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
```
