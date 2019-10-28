const { NODE_ENV, VUE_APP_SERVIEC_URL, VUE_APP_BASE_API } = process.env;

module.exports = {
    devServer: {
        port: 8888,
        host: "localhost",
        https: false,
        open: true,
        proxy: {
            //开发环境配置代理
            [process.env.VUE_APP_BASE_API]: {
                //跨域 目标服务器地址，代理访问
                target: "http://mengxuegu.com:7300/mock/5d7887a6facc296cd6835410",
                changeOrigin: true, //开启服务器
                pathRewrite: {
                    //地址前缀替换为空
                    ["^" + process.env.VUE_APP_BASE_API]: ""
                    
                }
            }
        }
    },

    lintOnSave: false, //关闭格式检查
    productionSourceMap: false //打包不生成.map文件
};