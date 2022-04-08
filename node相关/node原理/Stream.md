## Stream 

流。

shell通过管道连接各个部分，输入和输出的规范时文本流。

NodeJs，内置的Stram模块实现了类似的功能，各个部分之间通过pipe()
```js
const   Stram = require('stream')

const Readable = Stream.Readable;
const Writeable = Stream.Writeable;
const Duplex = Strem.Dublex;
const Transform = Stream.Transform

```

## Readable 

创建可读流

```js


// const fs = require('fs')

// fs.createReadStream('x.js').pipe(process.stdout);


// 流式的消耗迭代器中的

const Readable = require('stream').Readable;

class ToReadable extends Readable{

    constructor(iterator){
        super()
        this.iterator = iterator
    }

    _read(){
        const res = this.iterator.next();
        if(res.done){
            // 数据源已经消耗完了，通过push null 来通知流
            return this.push(null)
        }
        setTimeout(()=>{
            this.push(res.value + '\n');
        },0)
    }
}

const iterator = function (limit){
    return {
        next:function(){
            if(limit--){
                return {
                    done:false,
                    value:limit+Math.random()
                };
            }
            return {
                done:true
            }
        }
    }
}(1000)

const readable = new ToReadable(iterator)

readable.on('data',data=>process.stdout.write(data))

readable.on('end',()=>process.stdout.write('DONE'))
```

创建可读流时，需要继承Readable,并实现_read方法。

* _read时生产数据的逻辑
* 在_read方法中，通过调用push(data)将数据放入可读流中供下游消耗。
* 当全部数据生成完成后，push(null)
* 当可读流 结束之后，不能再调用push(data)

可以通过监听data事件消耗可读流

* 当首次监听data事件后，readable会不断的调用_read方法生产数据
* 当所有的数据生产完毕，会触发end。

## Writeable 可写流

创建可写流

```js

const Writable = require('stream').Writable;
const writable = Writable();

/**
 *
 *
 * @param {*} data  数据流
 * @param {*} enc 
 * @param {*} next  通知流 传入下一个数据
 */
writable._write = function(data,enc,next){
    console.log(data.toString().toUpperCase())
    //将流中的数据输出
    process.stdout.write(data.toString().toUpperCase());
    // 当写入完成时，通知流传入下一个数据
    process.nextTick(next)
}

writable.on('finish',()=>process.stdout.write('DONE'));

writable.write('a'+'\n')
writable.write('b'+'\n')
writable.write('c'+'\n')

writable.end()
```

* 上游通过调用write方法写入数据到可写流中。
* 在_wirte中，当数据成功写入后，需要调用next告诉流开始处理下一个数据
* 上游必须调用end方法来结束可写流
* end方法调用之后，会触发finish事件。

...
### Tips
为什么一定要toString处理
 数据默认都是一些 buffer。

## Duplex
创建 可读可写流。

## transform

在Transform 中可写端写入的数据，经过自动变换后可以自动添加到可读端。


## 数据类型

