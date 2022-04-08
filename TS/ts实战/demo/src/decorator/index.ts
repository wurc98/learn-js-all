
/**
 *
 * 装饰函数的装饰器
 * 大概率是用来基于原有的函数，在不修改使用的时候，通过装饰器的写法，去修改原有函数逻辑
 * @export
 * @param {*} target
 * @param {*} name
 * @param {*} descriptor
 */
export function measure(target: any, name: any, descriptor: any){
    const oldValue = descriptor.value;
    descriptor.value = async function () {
        const startTime = Date.now()
        const res = await oldValue.apply(this,arguments);
        console.log(`${name}执行耗时${Date.now()-startTime}ms`)
        return res;
    }
    return descriptor;
}