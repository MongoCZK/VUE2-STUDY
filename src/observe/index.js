class Observer{
  constructor(data){
    this.walk(data)
  }

  // 对属性依次进行劫持
  walk(data){ 

    // "重新定义"属性为响应式属性
    Object.keys(data).forEach((key)=>defineReactive(data,key,data[key]))   
  }
}

export function defineReactive(target, key, value){  // 闭包保存value值
  // 对所有对象进行属性劫持（深度劫持）
  observe(value)

  // 属性劫持
  Object.defineProperty(target, key, {
    // get 和 set 中不能使用 target[key]来获取value, 否则会进入无限嵌套调用get，最后导致堆栈溢出
    get(){
      console.log("获取属性！")
      return value
    },
    set(newVal){
      console.log("设置属性！")
      if(newVal === value) return
      value = newVal
    }
  })
}


export function observe(data){
  // 对这个对象进行劫持

  if( typeof data !== 'object' || data == null ){   // 非对象类型数据不作劫持处理
     return; 
   }

  // 如果一个对象被劫持过了, 那就不需要再劫持了(要判断亿个对象是否被劫持过，可以增添一个实例，来判断是否被劫持过)

  // 劫持对象
   return new Observer(data)
}