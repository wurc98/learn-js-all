const wxApi = {
    openPhoto: (ws,config) => {
        console.log('我是native端的打开的摄像头功能')
        if(config.cb){
            ws.sendText(config.cb)
        }

    }
}

module.exports =  wxApi