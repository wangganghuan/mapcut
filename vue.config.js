module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "static",
    devServer: {
        proxy: {
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                target: 'http://128.10.22.1:8091',
                // 允许跨域
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}