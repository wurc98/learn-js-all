const body = document.querySelector('body')


function changeBgColor(color) {
    body.style.backgroundColor = color
}

class BaseRoute {
    constructor() {
        this.routes = new Map()
        this.bindPopState()

    }
    route(path, cb) {
        this.routes[path] = cb || function () { }
    }
    refresh(path, cb) {
        
    }

    bindPopState() {
        window.addEventListener('popstate', e => {
            const path = e.state && e.state.path
            console.log('in popstate listener path =' + path)
            const cb = this.routes[path]

            cb && cb()
        })
    }
}

const Router = new BaseRoute()

Router.route('/', function () {
    changeBgColor('white')
})

Router.route('/grey', function () {
    changeBgColor('grey')
})

Router.route('/yellow', function () {
    changeBgColor('yellow')
})

Router.route('/green', function () {
    changeBgColor('green')
})
