// 此文件专门用于状态初始化

import {
    observe
} from "./observe/index";


export function initState(vm) {
    const opts = vm.$options //获取所有的选项

    if (opts.data) {
        initData(vm)
    }

    // if(opts.props){
    //     initProps()
    // }


}


function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[target][key] //例如返回vm._data.name
        },

        set(newValue) {
            vm[target][key] = newValue
        }
    })


}


function initData(vm) {
    let data = vm.$options.data; //data可能是函数，也可能是对象

    data = typeof data === 'function' ? data.call(vm) : data //data是用户返回的对象


    console.log(data);


    vm._data = data //我将返回的对象放在了_data上

    //    对数据进行劫持
    // Vue2里面采用了一个 API Object.defineProperty
    observe(data)

    // 将vm._data用vm来代理了
    for (let key in data) {
        proxy(vm, '_data', key)

    }

}