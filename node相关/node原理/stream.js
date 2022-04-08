
// const fs = require('fs')

// fs.createReadStream('x.js').pipe(process.stdout);


// 流式的消耗迭代器中的

// const Readable = require('stream').Readable;

// class ToReadable extends Readable{

//     constructor(iterator){
//         super()
//         this.iterator = iterator
//     }

//     _read(){
//         const res = this.iterator.next();
//         if(res.done){
//             // 数据源已经消耗完了，通过push null 来通知流
//             return this.push(null)
//         }
//         setTimeout(()=>{
//             this.push(res.value + '\n');
//         },0)
//     }
// }

// const iterator = function (limit){
//     return {
//         next:function(){
//             if(limit--){
//                 return {
//                     done:false,
//                     value:limit+Math.random()
//                 };
//             }
//             return {
//                 done:true
//             }
//         }
//     }
// }(1000)

// const readable = new ToReadable(iterator)

// readable.on('data',data=>process.stdout.write(data))

// readable.on('end',()=>process.stdout.write('DONE'))

// const Writable = require('stream').Writable;
// const writable = Writable();

// /**
//  *
//  *
//  * @param {*} data  数据
//  * @param {*} enc 
//  * @param {*} next  通知流 传入下一个数据
//  */
// writable._write = function(data,enc,next){
//     console.log(data.toString().toUpperCase())
//     //将流中的数据输出
//     process.stdout.write(data.toString().toUpperCase());
//     // 当写入完成时，通知流传入下一个数据
//     process.nextTick(next)
// }

// writable.on('finish',()=>process.stdout.write('DONE'));

// writable.write('a'+'\n')
// writable.write('b'+'\n')
// writable.write('c'+'\n')

// writable.end()


const Duplex = require('stream').Duplex;

const duplex = Duplex()

duplex._read = function () {
    this._readNum = this._readNum || 0
    if(this._readNum>1){
        this.push(null)
    }else{
        this.push(`${this._readNum++}`)
    }
}

duplex._write = function (buf, enc, next) {
    console.log(`_write ${buf.toString()}\n`)
    next()
}

duplex.on('data',(data)=>console.log(`ondata = ${data.toString()}`))

duplex.write('a')
duplex.write('b')
duplex.write('c')
duplex.write('d')
duplex.write('e')
duplex.write('f')
duplex.write('g')