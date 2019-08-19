import Vue from 'vue'//引用vue类库
import App from './app.vue'

import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'
import './assets/images/1.jpg'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render:(h) => h(App)//通过createApp这个参数把app挂载到html中 app来源是vue文件（第二行）
}).$mount(root)//挂在到html的一个节点上面