//创建一个为10，填充为0的buffer
// const buf1 =  Buffer.alloc(10)
// console.log(buf1)



//创建一个为10，填充为1的buffer
// const buf2  =  Buffer.alloc(10,1)
// console.log(buf2)




//allocUnsafe 比 alloc  但是创建的缓存区里可能存在旧数据。
// const buf2  =  Buffer.allocUnsafe(10,1)
// console.log(buf2)


const buf = Buffer.from ('hello world','ascii')

console.log(buf)

console.log(buf.toString('base64'))