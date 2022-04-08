##  path模块


## fs模块
```js
const fs  =  require('fs')
const path = require('path')
const pathToFile = path.resolve(_dirname,'./text') //尽量用绝对路径


//异步读取 ，通过回调函数
fs.readFile(pathToFile,'UTF-8',function(err,result){
    if(err){
        console.log(err)
        return err
    }
    console.log('result',result)

})

//同步读取

const content  =  fs.readFileSync(pathToFile,'UTF-8')
console.log('同步读取',content)

```
因为node的回调函数总是最后一个参数，所以可以用promsie封装

```js

function promisify(func){


    return function(...args){
    
    
        return new Promise((resolve,reject)=>{
            args.push(function(err,result){
                if(err) return reject(err)
                return resolve(result)
            })
            return func.apply(func,args)
    })
    }
}

const readFileAsync = promisify(fs.readFile) //将node方法 promise化
/* 
    promisify(fs.readFile) 相当于  
    function(...args){
        return new Promise((resolve,reject)=>{
            args.push(function(err,result){
                if(err) return reject(err)
                return resolve(result)
            })
            return fs.readFile.apply(func,args)
    })
  }
    readFilAsync(pathToFile,'utf-8')  相当于

    let args = [pathToFile,'utf-8']
    args.push(function(err,result){
                if(err) return reject(err)
                return resolve(result)
            })
    new Promise((resove,reject)=>{

        fs.readFile
    })
*/
readFilAsync(pathToFile,'utf-8').then(res=>{
    console.log(res)
}).catch(err=>{
    oonsle.log(err)
})



```

