import { newArrayProto } from "./array"

class Observer {
  constructor(data) {

    // 存储当前Obsever实例，同事给数据加了一个标识，表明这个属性被观测过了
    // 但是，指向实例本身，会导致在观测对象时，发生死循环，不断嵌套观测实例对象
    // data.__ob__ = this;

    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false  // 将__ob__变成不可枚举 （循环的时候无法获取到）
    })

    if (Array.isArray(data)) {
      // 重写数组中的7个可以修改数组本身的变异方法

      // 保留数组原有的特性，并且可以重写部分方法
      data.__proto__ = newArrayProto 
      // 如果数组中放的是对象，可以监控到对象的变化
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }

  // 对属性依次进行劫持
  walk (data) {

    // "重新定义"属性为响应式属性
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]))
  }

  // 观测数组
  observeArray (data) {
    data.forEach(item => observe(item))
  }
}

export function defineReactive (target, key, value) {  // 闭包保存value值
  // 对所有对象进行属性劫持（深度劫持）
  observe(value)

  // 属性劫持
  Object.defineProperty(target, key, {
    // get 和 set 中不能使用 target[key]来获取value, 否则会进入无限嵌套调用get，最后导致堆栈溢出
    get () {
      console.log("获取属性！")
      return value
    },
    set (newVal) {
      console.log("设置属性！")
      if (newVal === value) return
      // 当设置的是个新对象时，需要重新观测该对象
      observe(newVal)
      value = newVal
    }
  })
}


export function observe (data) {
  // 对这个对象进行劫持

  if (typeof data !== 'object' || data == null) {   // 非对象类型数据不作劫持处理
    return;
  }

  // 如果一个对象被劫持过了, 那就不需要再劫持了(要判断一个对象是否被劫持过，可以增添一个实例，来判断是否被劫持过)
  if(data.__ob__ instanceof Observer){ // 表明这个对象已经被代理了
    return data.__ob__ 
  }

  // 劫持对象
  return new Observer(data)
}