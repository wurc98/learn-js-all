Function.prototype.before = function (beforeFn) {
    const _self = this;
    console.log('before的this',this)
    return function () {
        console.log('返回函数的this',this)
        beforeFn.apply(this, arguments)
        return _self.apply(this, arguments)
    }
}


Function.prototype.after = function (afterFn) {
    console.log('链式调用')
    const _self = this;
    return function () {
        var ret = _self.apply(this, arguments)
        afterFn.apply(this, arguments)
        return ret
    }
}


var func = function () {
    console.log(2)
}

func = func.before(function () {
    console.log(1)
}).after(function () {
    console.log(3)
})
func()