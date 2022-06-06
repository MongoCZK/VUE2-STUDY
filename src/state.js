export function initState(vm){
  // 获取所有的选项
  const opts = vm.$options;  

  if(opts.data){
    initData(vm)
  }
}

function initData(vm){
  let data = vm.$options.data  // data可能是函数和对象

  data = typeof data === 'function' ? data.call(vm) : data;
}