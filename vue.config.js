module.exports = {
    configureWebpack: {
        resolve: {
            // 省略后缀
            extensions: [],
            // 配置别名
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views'
            }
        }
    }
}