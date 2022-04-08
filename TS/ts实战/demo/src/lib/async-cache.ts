

//缓存map
const cacheMap = new Map()

/**
 *
 *
 * @export
 * @param {*} target
 * @param {*} name
 * @param {*} descriptor
 * @return {*} 
 */
export function EnableCache(target: any, name: any, descriptor: any) {
    const oldValue = descriptor.value;
    descriptor.value = async function (...args: any) {
        const cacheKey = name + JSON.stringify(args);
        if (!cacheMap.get(cacheKey)) {
            //oldValue 可能不是promise, 强转成promise
            const res = Promise.resolve(oldValue.apply(this, args)).catch(_ => {
                //接口报错，清空缓存
                cacheMap.set(cacheKey, null);
            });
            cacheMap.set(cacheKey,res);
        }
        //返回结果
        return cacheMap.get(cacheKey);
    }

    return descriptor;
}


