const path = require('path');//绝对路径 path是一个处理路径的基本包
const HTMLPlugin = require('html-webpack-plugin')//一个生成HTML的插件
const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target:'web',
    //入口
    entry:path.join(__dirname,'src/index.js'),//根目录，拼接出绝对路径
    //出口
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            //css预处理器
            {
                test:/\.styl/,
                use:[
                'style-loader',
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true  //可以直接使用前面的sourceMap
                    }
                },
                'stylus-loader'//一层一层往上扔
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                 //use不仅是读取，还包括做的一些处理。
                use:[
                    {
                        loader:'url-loader', //如果图片小于1024 把图片转译为代码保存在js中
                        //url-loader是建立在file-loader基础上的，base64,。
                        options:{
                            limit:1024, //limit对文件大小做限制。
                            name:'[name]-zz.[ext]'//[name]原文件名，[ext]扩展名
                        }
                    }
                    
                ]
            }
        ]
    },
    plugins:[
        //用vue react框架时要用这个
        new webpack.DefinePlugin({
           'process.env':{
               NODE_ENV : isDev ? '"development"' : '"production"'//使用插件，在js中可以直接引用环境判断，vue可以根据不同环境打包，开发环境会有很多错误提示，但是正式环境不需要
           } 
        }),
        new HTMLPlugin()
    ]
}

//设置一个变量标识是开发环境还是正式环境
if(isDev){
    config.devtool = '#cheap-module-eval-source-map'//在页面调试代码
    config.devServer = {
        port:'8000',
        host:'127.0.0.1', //0.0.0.0 可以用localhost:127.0.0.1访问也可以用本机内网IP访问（好处：可以用别人的电脑访问 或者手机链接电脑）
        overlay:{
            errors:true  //把错误显示到网页上
        },
        hot:true,//热更新 页面刷新导致数据丢失 只重新渲染单个组件  不重新加载整个页面
        //单页应用会有许多前端路由 把不理解的没有做映射的地址映射到index.html
        // historyFallback:{

        // },
        open:true//编译自动打开

    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config
//webpack是打包前端资源的(sss 图片 字体等) 开发webapp的时候是一整个js加载到浏览器然后渲染出来 所以入口文件js