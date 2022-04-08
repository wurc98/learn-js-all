
let longTimeFn = function(time){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(time)
        },time)
    })
}

function asyncFunction(generator){
    const iterator = generator();
    const next = (data) =>{
        const {
            value,
            done
        } = iterator.next()
        if(done){
            return
        }

        value.then()
    }
    next()
}

asyncFunction(function* (){
    let data = yield longTimeFn(1000)
    console.log(data)
    data = yield longTimeFn(2000)
    console.log(data)
    return data
})