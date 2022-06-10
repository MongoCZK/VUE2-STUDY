import { initState } from "./state"
import { compileToFunction } from './compiler'
// 给Vue增加init方法
export function initMixin(Vue){
  // 用于初始化
  Vue.prototype._init = function(options){
    
    const vm = this

    // 将用户的选项挂在到实例上
    vm.$options = options 

    // 初始化状态
    initState(vm)

    // 实现数据的挂载
    if(options.el){
      vm.$mount(options.el)
    }
  }

  Vue.prototype.$mount = function(el){
    const vm = this
    el = document.querySelector(el)
    let ops = vm.$options
    if(!ops.render){  // 查找有没有render函数
      let template
      if(!ops.template && el){   // 没有模板 但是有el
        template = el.outerHTML  
      }else{
        if(el){
          template = ops.template   // 如果有el 采用模板的内容
        }
      }

      // 写了template就用template
      if(template){
        const render = compileToFunction(template)
        ops.render = render
      }
    }

    ops.render 

    // 使用vue.global.js时模板编译过程是在浏览器运行的
    // runtime是不包含模板编译的，整个编译时打包的时候通过loader来转义.vue文件的，用runtime的时候不能使用template
  }
}
