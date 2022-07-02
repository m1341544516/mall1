<template>
  <div class="bottom-bar">
    <div class="checkall" @click="checkClick">
      <check-button :is-checked="isSelectAll"/>
      <span>全选</span>
    </div>

    <div class="total-price">合计：{{totalPrice}}</div>

    <div class="checkout">去付款({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.cartList.filter(item=>item.checked)
      .reduce((sum, item) => {
        return sum + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item=>item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length===0) return false
      // return !this.cartList.some(item=>!item.checked)
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods:{
    checkClick(){
      // 全部选中
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }
      else{
        this.cartList.forEach(item => item.checked = true)
      }
      // 不能简化
      // this.cartList.forEach(item => item.checked = !this.isSelectAll);
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eeeeee;
  font-size: 14px;
}

.checkall {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.total-price {
  flex: 1;
  margin-left: 30px;
}

.checkout {
  /* align-self: self-end; */
  height: 100%;
  width: 120px;
  text-align: center;
  background-color: #ff5300;
  color: #fff;
}
</style>