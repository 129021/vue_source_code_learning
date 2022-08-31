import { initState } from "./state";

// 此函数用于Vue的初始化操作
// 专门用于初始化


// 这是用于给Vue增加init方法
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {



        // vue 的实例 vm身上有一个 vm.$options 就是获取用户的配置
        // this.$options=options
        // 这里不用this，而是用vm
        const vm = this;
        vm.$options = options; //将用户的选项挂载到实例上


        // 初始化状态（包括props，data，computed，watch等）
        initState(vm)

    }
}



// function initState(vm) {
//     const opts = vm.$options //获取所有的选项

//     if (opts.data) {
//         initData(vm)
//     }

//     // if(opts.props){
//     //     initProps()
//     // }


// }



// function initData(vm) {
//     let data = vm.$options.data; //data可能是函数，也可能是对象

//    data= typeof data === 'function' ? data.call(vm) : data 


//    console.log(data);


// }