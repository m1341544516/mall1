import { request } from "./request";

export function getCategory() {
    return request({
        url: '/category'
    })
}

// export function getCategoryGoods(type, page) {
//     return request({
//         url: 'category/data',
//         params: {
//             type,
//             page
//         }
//     })
// }