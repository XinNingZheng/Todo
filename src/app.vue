<template>
    <div class="test">{{text}}</div>
</template>
<script>
export default {
    //初始化数据
    data(){
        return{
            text:'我是一个webpack打包的vue组件 热加载'
        }
    }
}
</script>

<style>
.test{
    color:red;
}
</style>