

## vue source code

### mvvm
 
 数据与视图进行双向绑定。《观察者模式》

 目标  =》  多个观察者



#### 面试题  
Mvvm 的原理或者核心模式，观察者模式的实现，如何实现响应式。


# 源码阅读
## vue 层级

### src

* compiler

    编译相关，语法树解析。
    
    面试题：

        vue 常用的两种生成节点的方式, <template></template>和 render() 是怎么做的。

        答：template 优化代码后 通过render()生成节点。


    作业：

        在vue脚手架新建项目的时候，选择runtime only or compiler，这两个在那个文件做了区分,有什么区别。
* core

    vue 核心代码。（虚拟dom等），大部分面试题出自这里。

* platforms

    跨平台代码。

* server

    服务端渲染。

* sfc

    .vue文件的解析器。

* shared

    共享工具方法


### 入口文件

### vue初始化

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

```
* 问题一：  为什么要用function 而不用 class？

    除了可读性之外，后续会在Vue的原型链上进行拓展，用function 更方便可读、维护以及拓展。

* 问题二：  为什么要单独抽离后面几个流程？

    流程作用：对vue函数进行扩充。

    生成vue必要的参数属性。
    
    1.  initMixin


        初始化参数，


        proxy()   vm._props.xxx =>vm.xxx








