(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      // 要把data中的每个属性都劫持，但是Object.defineProperty只能劫持已经存在的属性，后增的或者删除的，不知道（vue会为此单独写一些API，比如$set,$delete)
      if (Array.isArray(data)) {
        // 如果属性是数组的话，就不要循环遍历来劫持了
        // 要监控用户有没有调数组的方法，要重写数组的方法 要修改数组的7个变异方法（变异方法即可以修改数组本身）
        // 我们希望保留数组原有的特性，并且重写部分方法
        data.__proto__ = {
          push: function push() {
            console.log('重写了push方法');
          }
        };
        this.observeArray(data); //如果数组中有属性值为对象，则对象可以监控到
      } else {
        // 如果不是数组的话，就循环遍历来劫持
        this.walk(data);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 循环对象，对属性依次劫持
        // 重新定义属性
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      }
    }, {
      key: "observeArray",
      value: function observeArray(data) {
        //观测数组，看看数组内有没有对象
        data.forEach(function (item) {
          return observe(item);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(target, key, value) {
    //defineReactive是一个闭包，get和set方法都能拿到value，value不会被销毁
    observe(value); //使用递归对所有的对象都进行属性劫持，不管你是嵌套几层的对象

    Object.defineProperty(target, key, {
      // 取值的时候，执行get
      get: function get() {
        console.log('取值了');
        console.log('key:', key);
        return value;
      },
      // 修改的时候，执行set
      set: function set(newValue) {
        console.log('修改值了');
        if (newValue === value) return;
        value = newValue;
      }
    });
  }
  function observe(data) {
    // 对这个对象进行劫持
    if (_typeof(data) !== 'object' || data == null) {
      return; //只对对象进行劫持
    } // 如果一个对象被劫持过了，那就不需要再被劫持了（要判断一个对象是否被劫持过，可以增添一个实例，用实例来判断是否被劫持过


    return new Observer(data);
  }

  // 此文件专门用于状态初始化
  function initState(vm) {
    var opts = vm.$options; //获取所有的选项

    if (opts.data) {
      initData(vm);
    } // if(opts.props){
    //     initProps()
    // }

  }

  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[target][key]; //例如返回vm._data.name
      },
      set: function set(newValue) {
        vm[target][key] = newValue;
      }
    });
  }

  function initData(vm) {
    var data = vm.$options.data; //data可能是函数，也可能是对象

    data = typeof data === 'function' ? data.call(vm) : data; //data是用户返回的对象

    console.log(data);
    vm._data = data; //我将返回的对象放在了_data上
    //    对数据进行劫持
    // Vue2里面采用了一个 API Object.defineProperty

    observe(data); // 将vm._data用vm来代理了

    for (var key in data) {
      proxy(vm, '_data', key);
    }
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
