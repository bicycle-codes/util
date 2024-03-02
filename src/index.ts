export class Queue<T> {
    _inProgress:Promise<T>|null = null

    add (createP:() => Promise<T>):Promise<T> {
        if (this._inProgress) {
            return this._inProgress.then(() => {
                return createP()
            })
        }

        this._inProgress = createP()

        return this._inProgress
    }
}
