import { ADD_COUNTER, ADD_PRODUCT } from './mutation.types'

export default {
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_PRODUCT](state, payload) {
        payload.checked = false
        state.cartList.push(payload)
    }
}