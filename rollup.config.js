import babel from 'rollup-plugin-babel'


// rollup默认可以导出一个对象，作为打包的配置文件
export default {
    input: './src/index.js',
    output: {
        file: './dist/vue.js',
        name: 'Vue',
        format: 'umd', // esm es6 commonjs iife umd
        sourcemap: true, //希望可以调试源代码
    },
    plugins:[
        babel({
            exclude:'node_modules/**' //排除node_modules的第三方模块
        })
    ]
}