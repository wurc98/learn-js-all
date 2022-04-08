// const { constants } = require('buffer');
// const EventEmitter = require('events')

// const event = new EventEmitter()




class EventEmitter1 {
    constructor() {
        this.events = {};
    }
    /* 触发监听事件 */
    emit(event, ...args) {
        const cbs= this.events[event];
        if(!cbs){
            console.error('当前事件未注册')
        }
        cbs.forEach(cb=>cb.apply(this,args))
        return this
    }
    /* 创建监听事件 */
    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(cb)
        return this
    }
    /* 创建监听一次的事件 */
    once(event, cb) {
        const func = (...args)=>{
            this.off(event,func)
            cb.apply(this,args)
        }
        this.on(event,func)
        return this
    }
    /* 移除事件监听 */
    off(event, cb) {

    }
}


const event1 = new EventEmitter1()
event1.on('a',(a)=>{
    console.log(a)
})
event1.on('b',(a)=>{
    console.log(a)
})
event1.emit('a',6)
event1.emit('b',7)
console.log(5)