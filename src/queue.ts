export class Queue<T> {
    _inProgress:Promise<T|void> = Promise.resolve()

    add (createP:()=>Promise<T>):Promise<T|void> {
        this._inProgress = this._inProgress.then(() => {
            return createP()
        })

        return this._inProgress
    }
}
