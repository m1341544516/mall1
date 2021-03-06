// 防抖函数封装
export function debounce(func, delay) {
    // 用于记录有无定时器
    let timer = null

    return function(...args) {
        // 如果有定时器，将之前的定时器清除
        if (timer) clearTimeout(timer)

        // 重新计时
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

// 时间格式化
export function formatDate(date, fmt) {
    // 1.正则表达式获取年份
    // 匹配fmt中的y
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};