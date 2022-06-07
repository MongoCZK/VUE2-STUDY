import { observe } from "./observe/index";

export function initState (vm) {
  // 获取所有的选项
  const opts = vm.$options;

  if (opts.data) {
    initData(vm)
  }
}

function proxy (vm, target, key) {
  Object.defineProperty(vm, key, {
    get () {
      return vm[target][key]
    },
    set (newVal) {
      // if (newVal === vm[target][key]) return   // 思考不加这一行的原因（仅作代理）
      vm[target][key] = newVal
    }
  })
}

function initData (vm) {
  let data = vm.$options.data  // data可能是函数和对象

  data = typeof data === 'function' ? data.call(vm) : data;

  vm._data = data

  // 使用defineProperty对数据进行劫持
  observe(data)

  // 将vm._data用vm来代理
  for (let key in data) {
    // 将vm下的属性代理到_data下的同名属性
    proxy(vm, '_data', key)
  }
}