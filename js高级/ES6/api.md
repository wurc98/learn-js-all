<!--
 * @Author: your name
 * @Date: 2021-07-22 15:55:34
 * @LastEditTime: 2021-07-30 17:49:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \正式d:\学习文件夹\jsBoost\.history\ES6\api.md
-->
/*
 * @Author: your name
 * @Date: 2021-07-22 15:55:34
 * @LastEditTime: 2021-07-22 16:00:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \正式d:\学习文件夹\jsBoost\.history\ES6\api.js
 */

## 常量

```javascript
const a = 1;
//es5定义不可更改常量
var arg = '常量'
Object.defineProperty(window, arg, {
    value: '固定值',
    writable: false
})
arg = '常量2'
//
```

## 块级作用域

## 无变量提升

## 死区

```javascript
if (true) { //暂时性死区
    a = 2
    const a = 1
}
```

## 箭头函数

##  上下文 - this

```js
let name = 123
const obj = {
    name: 'wrc',
    age: 12,
    getName: () => {
        console.log(this)
        return this.name
    },
    getAge: function() {
        return this.age
    }
}
obj.getName()
obj.getAge()
```

## class 类

```js
class Course {
    constructor(name, course) {
        this.name = name;
        this.course = course;
    }

    getCourse() {
        return `${name}的课程为${course}`
    }
}
```

###  class 是什么类型     

class 是语法糖，和function 没有任何区别

### 属性定义

```js
class Course {
    constructor(name, course) {
        this.name = name
        this.course = course
    }
    getCourse() {

    }
    get teacher() {
        return this.teacher
    }
    set teacher(val) {
        this.teacher = val
    }
}
```

意义：
1.  定义只读变量

```js
class Course {
    constructor(name, course) {
        this.name = name
        this.course = course
    }
    getCourse() {

    }
    get teacher() {
        return this.teacher
    }
    set teacher(val) {
        this.teacher = val
    }
}
```

修改只读变量会报错吗  --无法改变，但不会报错

2. 实现私有属性  --闭包

```js
// 1
class Course {
    constructor(name, course) {
        this.name = name
        let course = 'es6'
        this.getCourse = () => {
            return this.course
        }
    }
    get teacher() {
        return this.teacher
    }
    set teacher(val) {
        this.teacher = val
    }
}
//  2
class Course {
    #course = 'es6'
    constructor(name, course) {
        this.name = name
    }
    get course() {
        return #course
    }
    set course(val) {
        #course = val
    }
}
```

3. 封装核心 -- 适配器模式  (不懂！！！！)
    底层封装好通用core服务

```js
    class Utils {
        constructor(core) {
            this._main = core
            this._name = 'myName'
        }
        get name: {
            ...this._main.name,
            name: $ {
                this,
                _name
            }
        }
        set name(val) {
            this._name = val
        }
    }
    ``
    `  

### 静态方法  --直接挂载，无需实例化即可获得

`
    ``
    js

    function Course(name, course) {
        this._name = name
        this.course = course
    }
    Course.Call = function() {
        console.log('calling')
    }

    class Course {
        constructor(name, course) {
            this._name = name
        }
        static Call() {
            console.log('calling')
        }
    }
```

### 继承 -- js如何继承

1. 通过原型链实现

```js
function Course(name, course) {
    this._name = name
    this.course = course
}
Course.Call = function() {
    console.log('calling')
}
Course.prototype.send = function() {
    console.log('sending')
}
/* 子对象 */
function Child() {
    // 初始化父对象
    Course.call(this, 'wurc', 'ES6')
    this.start = function() {
        console.log('starting')
    }
}
Child.prototype = Course.prototype;
```

2. es6实现方法

```js
class Course {
    constructor(name, course) {
        this._name = name
        this.course = course
    }
    send() {
        console.log('sending')
    }
    static call() {
        console.log('calling')
    }
}

class Child extends Course {
    constructor() {
        super('wurc', 'ES6')
    }
    start() {
        console.log('starting')
    }
}
```

## 解构

```ts
const person  = {
    name:'wurc',
    age:23
}

const name = person.name;
const age  = person.age
const {name,age} = person

//数组
const arr[] = ['','']
const a= arr[0]
const b = arr[1]

const [a,b] =  arr

```

### 技巧

```js
//key 别名
const person = {
    : {
        name
    }
}
```

### 解构适用哪些场景

```js
    //数组传参
    const sum = arr => {
        let res = 0;
        arr.forEach(each => {
            res += each
        })
    }

    //es6

    const sum = ([a, b, c]) => {
        return a + b + c
    }
```

### 结合初始值

```js
    const course = ({
        teacher,
        leader,
        course = 'es6'
    }) => {

    };

    course({
        teacher: 'x',
        leader: 'y'
    })
```

###  返回值

```js
const getCourse = () => {
    return {
        teacher: 'y',
        leader: 'x'
    }
}

const {
    teacher,
    leader
} = getCourse()
```

### 变量交换

```js
 let a = 1;
 let b = 2;

 [b, a] = [a, b]
```

### json 处理

```js
const json = `{
    name:'wurc',
    age:23
}
`
const obj = JSON.parsee(json)

const {
    teacher,
    name
} = JSON.parsee(json)
```

### ajax 

```js
ajax.get(URL).then(res => {
    let code = res.code;
    let data = res.data;
    let msg = res.msg;

    if (code == 0) {

    }
    return {
        code,
        data,
        msg
    }
})
```

## 数组方法

* 新增的数组方法：
    

    1. Array.from() && Array.of();

        Array.of()

        * 创建数组，目的是为了防止使用new Array()创建数组时参数为Number类型<br>
        ```js
            const arr = new Array(3); //  [empty,empty,empty]
            const arr2 = Array.of(3); //[3]  
        ```

        Array.from()

        * 将伪数组（如 arguments）转化为数组，可以传入3个参数<br>
        

        ```js
            /** es6之前,实现伪数组转化的方法主要有两种
             * 1. 通过for 循环遍历伪数组，push到 new Array() 中。
             * 2. 通过Array.prototype.slice.call(likeArray)转化
             **/
            function translateArray(likeArray) {
                return Array.prototype.slice.call(likeArray)
                /**
                 *likeArray本身没有slice属性，所以要通过call将slice的this指向likeArray
                */
            }
            /**
             *  第一个参数为需要被转换的伪数组<br>
             *  第二个参数为映射函数，可以改变转化时的数组属性<br>
             *  第三个参数为映射函数内部this指向的对象
             */
            function translateArray1(likeArray) {
                return Array.from(likeArray, value => value + 1)
            }

                            function translateArray2(likeArray) {
                return Array.from(likeArray, value => value + 1)
            }

             let helper = {
                diff: 1,
                add(value) {
                    return value + this.diff
                }
            }

            function translateArray3(likeArray) {
                return Array.from(likeArray, helper.add, helper)
            }
        ```

    2. Array.find() && Array.findIndex();

        * 查找元素，可以传入两个参数, find返回数组元素, finIndex返回坐标
        * 适用场景为：需要根据某种条件查找匹配的元素时。
        ```js
            /**
             * 第一个参数为 回调函数，查找到一个值后调用的函数。
            * 第二个参数为 回调函数内部this的指向。
            */

            let numbers = [25, 30, 35, 40]
            numbers.find(n => n > 25) //30
            numbers.findIndex(n => n > 25) //1 
            let helper = {
                target: 35,
                fn(n) {
                    return n - this.target === 0
                }
            }
            numbers.find(helper.fn, helper) //35
            numbers.findIndex(helper.fn, helper) //2
        ```

    4. Array.fill() && Array.copyWithin();

        Array.fill()
        
        * 往数组内填充一个或者多个内容,可传入3个参数
        ```js
            let numbers = [1,2,3,4]
            numbers.fill(1) //[1,1,1,1]

            /**
            * 第一个参数为填充内容
            * 第二个参数为开始填充的位置
            * 第三个参数为结束填充的位置(不包括结束位置)
            */
            numvers.fill(0,1) // [1,0,0,0]
            numbers.fill(0,1,3)// [1,0,0,1]
        ```

        Array.copeWithin()
        * 从数组中复制元素的值，填充到指定索引的位置。可传入3个参数。
        
        * 会改变原数组！！
        ```js
        /**
         *第一个参数为，粘贴位置
         *第二个参数为，复制开始位置
         *第三个参数为可选参数，复制结束的索引（未填写时，复制到粘贴位置）
         **/
        let numbers = [1, 2, 3, 4, 5, 6]

        numbers.copyWithin(3,0) //[1,2,3,1,2,3]
        numbers.copyWithin(2,0) //[1,2,1,2,5,6]
        numbers.copyWithin(3,0,2) //[1,2,1,2,5,6]

        ```


##  定型数组
