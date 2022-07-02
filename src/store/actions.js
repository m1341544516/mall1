import { ADD_COUNTER, ADD_PRODUCT } from './mutation.types'

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 让repeatProduct指向已存在的那个商品项
            let repeatProduct = context.state.cartList.find((item) => item.iid === payload.iid)

            // 如果已存在，存在的那个商品数量+1
            if (repeatProduct) {
                context.commit(ADD_COUNTER, repeatProduct)
                resolve('当前商品数量+1')
            } else {
                // 如果不存在，将商品加入到数组中，并且设置数量为1
                payload.count = 1
                context.commit(ADD_PRODUCT, payload)
                resolve('添加了新的商品')
            }
        })
    }
}