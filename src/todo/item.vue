<template>
  <div :class="['todo-item', todo.completed ? 'completed' : '']">
    <input 
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
    >
    <label>{{todo.content}}</label>
    <button class="destory" @click="deleteTodo"></button>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    }
  },
  methods: {
    deleteTodo() {
      this.$emit('del', this.todo.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.todo-item{
  position relative
  background-color #fff
  font-size 20px
  font-weight 200
  border-bottom 1px solid rgba(0,0,0,0.06)
  &:hover{
    .destory:after{
      content: 'x'
    }
  }
  label{
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 6%;
    display: block;
    line-height: 1.2;
    transition: color 0.5s;
  }
  &.completed{
    label{
      color: #ccc;
      text-decoration line-through
    }
  }
}
.toggle{
  text-align: center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin-left:15px;
  margin-top:10px;
  border: none;
  appearance: none;
  outline none
  &:after{
    content url('../assets/images/round.svg')
  }
  &:checked:after{
    content url('../assets/images/done.svg')
  }
}
.destory{
  position: absolute;
  top: 0;
  right: 5%;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  background-color transparent
  appearance none
  border-width 0
  cursor pointer
  outline none
}
</style>
