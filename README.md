# util
![tests](https://github.com/nichoth/template-ts/actions/workflows/nodejs.yml/badge.svg)

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
import { Queue } from '@bicycle-codes/util'
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
```
