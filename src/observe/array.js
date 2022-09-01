// 对数组进行部分重写



let oldArrayProto = Array.prototype;



// newArrayProto.__proto__ = oldArrayProto = Array.prototype
// 新创建一个对象，并将对象的原型绑定到oldArrayProto上（也就是Array.protptype上），这样修改这个newArrayProto身上的方法就不会影响到Array身上原先的方法了
let newArrayProto = Object.create(oldArrayProto)

let methods = [
    //找到所有的变异方法（可以修改原数组的方法）
    'push',
    'pop',
    'shift',
    'unshift',
    'reversel',
    'sort',
    'splice'

    // 除这7个之外，其他数组都不会改变原数组
    // 比如concat、slice等
]


methods.forEach(method => {
    newArrayProto[method] = function () {
        
    }
})