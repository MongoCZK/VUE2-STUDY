import { initState } from "./state"

// 给Vue增加init方法
export function initMixin(Vue){
  // 用于初始化
  Vue.prototype._init = function(options){
    
    const vm = this

    // 将用户的选项挂在到实例上
    vm.$options = options 

    // 初始化状态
    initState(vm)
  }
}
