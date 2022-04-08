const appInstance = getApp()

console.log('我是pageA的js文件中获取的全局数据')


Page({
    data: {
        message: '我是pageA.js',
        name: '李大锤'
    },
    changeMessage() {
        this.setData({
            message: '我是改变后的数据！'
        })
    },
    bindtestcb(e) {
        const { detail } = e
        const { name } = detail || {}
        this.setData({
            name
        })
        console.log("父组件被调用", name)
    }
})