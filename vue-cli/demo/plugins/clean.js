/*
 * @Author: your name
 * @Date: 2021-08-27 09:08:05
 * @LastEditTime: 2021-08-27 12:58:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \正式d:\学习文件夹\jsBoost\vue-cli\demo\plugins\clean.js
 */
module.exports =(options)=> (api) =>{
    api.registerCommands('clean',(...args)=>{
        console.log('exec clean script success')
    })

    api.registerCommands('sb',(...args)=>{
        console.log('sb')
    })
}