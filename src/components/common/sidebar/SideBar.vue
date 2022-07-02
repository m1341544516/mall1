<template>
  <div class="side-bar">
    <div v-for="(item,index) in titles" 
    class="side-bar-item" 
    :class="{active: index === currentIndex}" 
    @click="itemClick(index)">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.side-bar {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 44px;
  bottom: 0;
  left: 0;
  text-align: center;
  line-height: 44px;
  font-size: 14px;
}
.side-bar-item {
  width: 100px;
  height: 44px;
  background-color: #f6f6f6;
}
.active {
  background-color: #fff;
  color: var(--color-high-text);
  border-left: 4px solid var(--color-high-text);
}
</style>