## 1.call的实现

*  第一个参数为null或者undefined时，this指向全局对象window，值为原始值的指向该原始值的自动包装对象，如 String、Number、Boolean
*  为了避免函数名与上下文(context)的属性发生冲突，使用Symbol类型作为唯一值
*  将函数作为传入的上下文(context)属性执行
*  函数执行完成后删除该属性
*  返回执行结果
```js
const myCall = function(context,...args){

    let cxt = context || window;
    let func = Symbol();
 /* 
 a.myCall(b,'1')

 this，就是a
 ctx 就是 b
func 里的  this 是指向 ctx的。
所以func = this 之后。 this里的this  就会指向 ctx 
  */   
    ctx[func] = this;

    args ? args :[]

    const res  = args.length > 0 ? ctx[func](...args) : ctx[func]();

    delete ctx[func];
    return res
}

```

## 2.apply的实现
apply 与 call 只是参数形式的区别
```js
const myApply = function(context,args =  []){
    let ctx = context || window;

    let func = Symbol();

    ctx[func] = this;

    const res = args.length > 0 ? ctx[func](...args) : ctx[func]();
    
    delete ctx[func];

    return res;
}

```

## 3.bind的实现
* bind() 除了 this 外，还可传入多个参数；
* bind 创建的新函数可能传入多个参数；
* 新函数可能被当做构造函数调用；
* 函数可能有返回值；
```js
const myBind = function(context,...args){
    
    const fn = this;

    args ? args : [];
    
    return function newFn(...newFnArgs){
        if(this instanceof newFn){
            return new fn(...args,...newFnArgs)
        }
        return fn.apply(context,[...args,...newFnArgs])
    }
}


```


## 4.测试