const fs = require('fs')
const path = require('path')

const pathToFile = path.resolve(__dirname, './text')

console.log(1)

//异步
// fs.readFile(pathToFile, 'UTF-8', function (err, result) {
//     if (err) {
//         console.log('err:', err)
//         return err
//     }

//     console.log('result', result)
// })

//同步
const content = fs.readFileSync(pathToFile,'utf-8')
console.log('content:',content)

console.log(2)

