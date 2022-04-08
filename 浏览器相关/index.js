/*
 * @Author: your name
 * @Date: 2021-07-26 11:26:49
 * @LastEditTime: 2021-07-26 11:26:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \正式d:\学习文件夹\jsBoost\浏览器相关\index.js
 */


const parent = document.getElementById('parent');
const child = document.getElementById('child');
const son = document.getElementById('son');

window.addEventListener('click',function(e){
    console.log('事件捕获 window')
},true)

parent.addEventListener('click',function(e){
    e.stopPropagation()
    console.log('事件捕获 parent')
},true)

child.addEventListener('click',function(e){
    console.log('事件捕获 child')
},true)

son.addEventListener('click',function(e){
    console.log('事件捕获 son')
},true)

window.addEventListener('click',function(e){
    console.log('事件冒泡 window')
})

parent.addEventListener('click',function(e){
    console.log('事件冒泡 parent')
})

child.addEventListener('click',function(e){
    console.log('事件冒泡 child')
})

son.addEventListener('click',function(e){
    console.log('事件冒泡 son')
})