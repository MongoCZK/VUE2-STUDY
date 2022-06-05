import babel from 'rollup-plugin-babel'
export default {
  // 入口
  input: './src/index.js',
  // 出口
  output: {
    file: './dist/vue.js',
    name: 'Vue',  // global.Vue
    format: 'esm',  // esm es6模块  commonjs模块  iife自执行函数 umd(兼容commonjs amd)
    sourcemap: true  // 调试源代码
  },
  plugins:[
    babel({
      exclude: 'node_modules/**', // 排除node_modules所有文件
    })
  ]
}