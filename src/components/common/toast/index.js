import Toast from './Toast'

const obj = {}

// 默认传入一个参数Vue
obj.install = function(Vue) {
    // 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    // 2.new的方式，通过组件构造器，可以创建一个组件对象
    const toast = new toastConstructor()

    // 3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj