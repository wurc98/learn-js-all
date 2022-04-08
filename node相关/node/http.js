/*
 * @Author: your name
 * @Date: 2021-08-05 13:05:44
 * @LastEditTime: 2021-08-05 13:08:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \正式d:\学习文件夹\jsBoost\node\http.js
 */

const http = require('http')

const proxy = http.createServer((req,resp)=>{
    resp.end()
})

proxy.listen('8888',()=>{
    console.log(8888,'启动成功')
})