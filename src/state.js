// 此文件专门用于状态初始化

import { observe } from "./observe/index";


export function initState(vm) {
    const opts = vm.$options //获取所有的选项

    if (opts.data) {
        initData(vm)
    }

    // if(opts.props){
    //     initProps()
    // }


}



function initData(vm) {
    let data = vm.$options.data; //data可能是函数，也可能是对象

    data = typeof data === 'function' ? data.call(vm) : data


    console.log(data);

    //    对数据进行劫持
    // Vue2里面采用了一个 API Object.defineProperty
    observe(data)


}