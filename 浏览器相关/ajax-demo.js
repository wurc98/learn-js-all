function promiseTimeout(fn,timeout){
    return new Promise((resolve,reject)=>{
        fn().then(resolve).catch(reject)
        setTimeout(reject,timeout)
    })

}