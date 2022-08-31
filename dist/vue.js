(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    // 此文件专门用于状态初始化
    function initState(vm) {
      var opts = vm.$options; //获取所有的选项

      if (opts.data) {
        initData(vm);
      } // if(opts.props){
      //     initProps()
      // }

    }

    function initData(vm) {
      var data = vm.$options.data; //data可能是函数，也可能是对象

      data = typeof data === 'function' ? data.call(vm) : data;
      console.log(data); //    对数据进行劫持
    }

    // 专门用于初始化
    // 这是用于给Vue增加init方法

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        // vue 的实例 vm身上有一个 vm.$options 就是获取用户的配置
        // this.$options=options
        // 这里不用this，而是用vm
        var vm = this;
        vm.$options = options; //将用户的选项挂载到实例上
        // 初始化状态（包括props，data，computed，watch等）

        initState(vm);
      };
    } // function initState(vm) {
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

    function Vue(options) {
      this._init(options);
    }

    initMixin(Vue); //扩展了Init方法

    return Vue;

}));
//# sourceMappingURL=vue.js.map
