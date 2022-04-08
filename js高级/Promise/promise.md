<!--
 * @Author: your name
 * @Date: 2021-07-22 10:53:07
 * @LastEditTime: 2021-07-22 11:00:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \正式d:\学习文件夹\jsBoost\Promise\promise.md
-->
# primise A+规范

## 规范

### Promise Status

promise应该有两种动作，三种状态。

1. pending

    1.1 初始的状态，可改变。
    
    1.2 一个promise在发出 resolve后者reject动作之前，都处于这个状态。

    1.3 通过resolve -> fulfilled

    1.4 通过reject -> rejected

2. fulfiled

    2.1 最终态，不可改变。

    2.2 一个promise必须要经过resolve动作后变成这个状态。

    2.3 必须拥有一个value值。

3. rejected

    3.1 最终态，不可改变。

    3.2 一个promise必须要经过reject动作后变成这个状态。

    3.3 必须拥有一个reasib值。//undefined

### then 
    
promise应该提供一个then方法，用来访问最终的结果，无论是value还是reson。

```js
promise.then(onFulfiled,onRejected);
```
1. 参数要求

    1.1 onFulfiled 和 onRejected 必须是函数类型，如果不是函数，应该被忽略。

2. onFulfilled 特性

    2.1 在promise 状态变成fulfiled 时，应该调用 onFulfiled ,参数 value。

    2.2 在promise 状态变成fulfiled之前，不应该被调用。

    2.3 只能被调用一次。

3. onRejected

    3.1 在promise 状态变成rejected 时，应该调用 onRejected ,参数 reson.

    3.2 在promise 状态变成rejected之前，不应该被调用。

    3.3 只能被调用一次。

4. onFulfilled和onRejected 应该时 微任务。

    setTimeout 时 宏任务。 不应该用这个模拟promise。
    使用 queueMicrotask 实现微任务的调用

5. then方法可以被调用多次

    5.1 promise 变成fulfilled之后，所有的onFulfilled回调都应该按照then的顺序执行
    ```js
    const promise  = new Promise()
    promise.then(cb1).then(cb2)
    promise.then()
    promise.then()
    ```
    所以在实现时需要一个数组来存储onFulfilled的cb

    5.2 promise 变成rejected之后，所有的 onRejected 回调都应该按照then的顺序执行
    
    实现时需要一个数组来存储 onRejected 的cb.

6. 返回值

    then返回值是一个新的promise。

    ```js
    promise2 = promise1.then(onFulfilled,onRejected)
    ```

    6.1 onFulfilled 或者 onRejected 执行的结果时x ,调用 resolvePromise.

    6.2 onFulfilled 或者 onRejected 执行时抛出异常，promise2需要被reject.

    6.3 如果 onFulfilled 不是一个函数，promise2 以 promise1 的value 触发 fulfilled.

    6.4 如果 onRejected 不是一个函数，promise2 以 promise1 的reason 触发 rejected。

7. resolvePromise

    ```js
    resolvePromise(promise2,x,resolve,reject)
    ```

    7.1 如果 promise2 和 x 相等，那么reject TypeError.

    7.2 如果 x 是一个 promise 
        
    7.2.1 如果x是pending,promise 的状态必须也是等待pending，知道x变成了fulfilled / rejected

    7.2.2 如果x 是 fulfilled， fulfill promise with the same value.

    7.2.2 如果x 是 rejected reject promise with the same reson.

    7.3 如果x是一个object 或者 是一个 function

    ```js
    
    ```