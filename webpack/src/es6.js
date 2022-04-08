const decorator = (target, key, descriptor) => {
  console.log(target, key, descriptor)
  target[key] = function (...args) {
    console.log('a');
    return descriptor.value.apply(this, args);
  };
  return target[key];
}


export default class CountChange {
  count = 1

  @decorator
  increment() {
    console.log('b')
    this.count++
  }

  decrease() {
    this.count--;
  }
}