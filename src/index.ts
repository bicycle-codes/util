export class Queue<T> {
    _inProgress:Promise<T|null> = Promise.resolve(null)

    add (createP:() => Promise<T>):Promise<T|null> {
        this._inProgress = this._inProgress.then(() => {
            return createP()
        })

        return this._inProgress
    }
}
