import axios from "axios"

export function request(config) {
    // 1.创建对应的axios实例http://152.136.185.210:7878/api/m5
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    // 2.axios拦截器
    // 拦截全局
    // axios.interceptors
    // 拦截实例
    instance.interceptors.request.use(config => {
        // console.log(config);
        return config
    }, err => {
        console.log(err);
    })

    // 发送真正的网络请求
    return instance(config)
}