<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props:{
    message:{
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default:false
    }
  },
  // methods:{
  //   // es6给函数的形参设置默认参数
  //   show(message, duration=1500){
  //     // 非es6的默认参数
  //     // duration = duration || 1500

  //     this.isShow = true
  //     this.message = message

  //     setTimeout(()=>{
  //       this.isShow = false
  //       this.message = ''
  //     }, duration)
  //   }
  // }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 10px;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
}
</style>