class BaseRoute{
    constructor(){
        this.routes = {}
        this.refresh = this.refresh.bind(this)
        window.addEventListener('load',this.refresh)
        window.addEventListener('hashchange',this.refresh)
    }
    route(path,cb){
        this.routes[path] = cb
    }
        refresh(){
            const path = `/${location.hash.slice(1)||''}`;
        console.log(location.hash,path)
        const cb = this.routes[path]
        cb&&cb()
    }
}

const body = document.querySelector('body')

function changeBgColor(color){
    body.style.backgroundColor = color
}


const Router = new BaseRoute()

Router.route('/',function(){
    changeBgColor('white')
})

Router.route('/grey',function(){
    changeBgColor('grey')
})

Router.route('/yellow',function(){
    changeBgColor('yellow')
})

Router.route('/green',function(){
    changeBgColor('green')
})
