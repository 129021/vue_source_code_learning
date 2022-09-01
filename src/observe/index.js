class Observer {
    constructor(data) {
        // 要把data中的每个属性都劫持，但是Object.defineProperty只能劫持已经存在的属性，后增的或者删除的，不知道（vue会为此单独写一些API，比如$set,$delete)


        if (Array.isArray(data)) { // 如果属性是数组的话，就不要循环遍历来劫持了
            // 要监控用户有没有调数组的方法，要重写数组的方法 要修改数组的7个变异方法（变异方法即可以修改数组本身）

            // 我们希望保留数组原有的特性，并且重写部分方法
            data.__proto__ = {
                push() {
                    console.log('重写了push方法');
                },

            }




            this.observeArray(data) //如果数组中有属性值为对象，则对象可以监控到
        } else {
            // 如果不是数组的话，就循环遍历来劫持
            this.walk(data)
        }

    }

    walk(data) {
        // 循环对象，对属性依次劫持

        // 重新定义属性
        Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
    }


    observeArray(data) { //观测数组，看看数组内有没有对象

        data.forEach(item => observe(item))

    }
}

export function defineReactive(target, key, value) { //defineReactive是一个闭包，get和set方法都能拿到value，value不会被销毁

    observe(value) //使用递归对所有的对象都进行属性劫持，不管你是嵌套几层的对象

    Object.defineProperty(target, key, {
        // 取值的时候，执行get
        get() {
            console.log('取值了');
            console.log('key:', key);
            return value
        },


        // 修改的时候，执行set
        set(newValue) {
            console.log('修改值了');
            if (newValue === value) return
            value = newValue
        }
    })
}

export function observe(data) {


    // 对这个对象进行劫持
    if (typeof data !== 'object' || data == null) {
        return //只对对象进行劫持
    }


    // 如果一个对象被劫持过了，那就不需要再被劫持了（要判断一个对象是否被劫持过，可以增添一个实例，用实例来判断是否被劫持过
    return new Observer(data)

}