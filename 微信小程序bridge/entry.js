const ws = require('nodejs-websocket')
const Koa = require('koa')
const KoaStatic = require('koa-static')
const wxApi = require('./wxApi.js')

const port = process.env.PORT || 8089

const wsserver = new ws.createServer((connect) => {
    connect.on('text', (e) => {
        console.log('用户收到了客户端的请求：' + e)
        const index = e.indexOf('jsbridge://')
        if (index !== -1) {
            console.log('是jsbridge，我要拦截了');
            const info = parse(e);
            wxApi[info.api](connect,info.query)
            return
        }
        // 如果不是的话，不拦截
    })
    connect.on('error', (error) => {
        console.log('客户端断开链接')
    })
}).listen(8081)

const parse = (url) => {
    const queryStartIndex = url.indexOf('?');
    const tempArr = url.slice(0, queryStartIndex - 1).split('.');
    const api = tempArr[tempArr.length - 1];
    const queryArr = url.slice(queryStartIndex + 1, url.length).split('&')
    const query = {}
    for (let i = 0; i < queryArr.length; i++) {
        const queryTemp =  queryArr[i].split('=')
        query[queryTemp[0]] = queryTemp[1];
    }
    return {
        api,
        query
    }
}


//搭建一个web服务器

const app = new Koa();
const staticServer = new KoaStatic(__dirname + '/public')
app.use(staticServer)
app.listen(port, () => {
    console.log('开始监听')
})