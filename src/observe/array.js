// 重写数组中的部分方法

let oldArrayProto = Array.prototype // 获取数组的原型

// 拷贝原型
export const newArrayProto = Object.create(oldArrayProto)

// 7个变异方法
let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
] // concat slice 不会改变原数组

methods.forEach(method => {
  newArrayProto[method] = function (...args) { // 这里重写了数组的方法
    const result = oldArrayProto[method].call(this, ...args) // 函数的劫持（切片编程） 

    // 对新增的数据进行劫持

    // 新增的数据
    let inserted
    // 获取Observe实例
    let ob = this.__ob__
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args; break;
      case 'splice':
        inserted = args.slice(2); break;
      default:
        break;
    }

    // 对新增的内容再次进行观测
    if(inserted){
      ob.observeArray(inserted)
    }

    return result
  }
})

