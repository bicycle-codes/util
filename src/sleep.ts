/**
 * Wait for `ms` milliseconds.
 *
 * @param {number} [ms]
 * @return {Promise<void>}
 */
export function sleep (ms?:number):Promise<void> {
    return new Promise(resolve => {
        if (!ms) {
            setTimeout(resolve, 0)
        } else {
            setTimeout(resolve, ms)
        }
    })
}
