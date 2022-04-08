
//getter setter

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MPromise {
    FULFILLED_CALLBACK_LIST = []
    REJECTED_CALLBACK_LIST = []
    _status = PENDING
    /**
     * Creates an instance of MPromise.
     * @param {*} fn (resolve,reject)=> void
     * @memberof MPromise
     */
    constructor(fn) {
        // 初始状态为 pending 
        this.status = PENDING;

        this.value = null;
        this.reason = null;

        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (e) {
            console.error(e);
        }
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
        console.log()
        this._status = newStatus;
        switch (newStatus) {
            case FULFILLED: {
                this.FULFILLED_CALLBACK_LIST.forEach(cb => {
                    cb(this.value)
                })
                break
            }
            case REJECTED: {
                this.REJECTED_CALLBACK_LIST.forEach(cb => {
                    cb(this.reason)
                })
                break
            }
        }
    }

    resolve(value) {
        console.log('resolve被調用',value)
        if (this.status === PENDING) {
            this.value = value;
            this.status = FULFILLED;
        }
    }

    reject(reason) {
        if (this.status === PENDING) {
            this.reason = reason;
            this.status = REJECTED;
        }
    }

    then(onFulfilled, onRejected) {
        console.log(this.status,',then',onFulfilled(),this.FULFILLED_CALLBACK_LIST.length)
        //6.3 如果 onFulfilled 不是一个函数，promise2 以 promise1 的value 触发 fulfilled.
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : value => value;
        //6.4 如果 onRejected 不是一个函数，promise2 以 promise1 的reason 触发 rejected.
        const realOnRejected = this.isFunction(onRejected) ? onRejected : reason => {
            throw reason;
        }
        // then 返回值整体是一个promise
        const promise2 = new MPromise((resolve, reject) => {
            // 6.2 onFulfilled 或者 onRejected 执行时抛出异常，promise2需要被reject.
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnFulfilled(this.value)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }


            switch (this.status) {
                case FULFILLED: {
                    console.log('执行成功队列')
                    fulfilledMicrotask();
                    break
                }
                case REJECTED: {
                    console.log('执行失败队列')
                    rejectedMicrotask();
                    break
                }
                case PENDING: {
                    console.log('加入队列')
                    this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
                    this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);
                    break;
                }
            }
        })
        return promise2
    }

    catch(onRejected){
        return this.then(null,onRejected)
    }

    resolvePromise(promise2, x, resolve, reject) {
        console.log(x)
        if (promise2 === x) {
            return reject(new TypeError('The promise and the return value are the same'))
        }
        if (x instanceof MPromise) {
            //如果x是proimse, 那么让新的promise接受x的状态
            // 即继续执行x ,如果执行的时候又拿到一个y，那么继续解析y.
            queueMicrotask(()=>{
                x.then(y => {
                    this.resolvePromise(promise2, y, resolve, reject)
                })
            })
        } else if (typeof x === 'object' || this.isFunction(x)) {
            if (x === null) {
                return resolve(x)
            }
            let then = null
            try {
                then = x.then
            } catch (e) {
                return reject(e)
            }
            // x.then是一个函数
            if (this.isFunction(then)) {
                let called = false;
                try {
                    then.call(
                        x,
                        (y) => {
                            if (called) {
                                return
                            }
                            called = true
                            this.resolvePromise(promise2, y, resolve, reject)
                        },
                        (r) => {
                            if (called) {
                                return
                            }
                            called = true
                            reject(r)
                        }
                    )
                } catch (e) {
                    if (called) {
                        return
                    }
                    reject(e)
                }
            } else {
                resolve(x);
            }
        } else {
            console.log('調用resolve')
            resolve(x)
        }
    }

    static resolve(value){
        if(value instanceof MPromise){
            return value
        }
        return new MPromise((resolve)=>{
            resolve(value)
        })
    }
    static reject(reason){
        return new MPromise((reject)=>{
            reject(reason)
        })
    }

    static race(promiseList){
        return new MPromise((resolve,reject)=>{
            const length = promiseList.length;
            if(length===0){
                return resolve()
            }else{
                for(let i=0;i<length;i++){
                    MPromise.resolve(promiseList[i]).then(
                        (value)=>{
                            return  resolve(value)
                        },
                        (reason)=>{
                            return  reject(reason)
                        }
                    )
                }
            }
        })
    }

    isFunction(param) {
        return typeof param === 'function'
    }
}


// const promise = new MPromise((resolve, reject) => {
//     resolve('test')
// }).then(value=>{
//     return 'test2'
// }).then(value=>{
//     return 'test3'
// }).then(value=>{
//     return 'test4'
// }).then(value=>{
//     return 'test5'
// })


MPromise.resolve().then(()=>{
    console.log(0)
    return MPromise.resolve(4)
}).then(res=>{
    console.log(res)
})

MPromise.resolve().then(()=>{
    console.log(1)
}).then(()=>{
    console.log(2)
}).then(()=>{
    console.log(3)
}).then(()=>{
    console.log(5)
}).then(()=>{
    console.log(6)
}).then(()=>{
    console.log(7)
}).then(()=>{
    console.log(8)
})


