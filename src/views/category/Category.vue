<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <side-bar :titles="titles"/>
    <!-- <tab-control class="tab-control" :titles="['正在流行','上衣','裤子','裙子','裤子','裤子','裤子','裤子','裤子','裤子']" 
      @tabClick="tabClick" ref="tabControl1" 
      v-show="isTabFixed"/>

    <scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll" :pull-up-load="true"
    @pullingUp="loadMore"> -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import SideBar from 'components/common/sidebar/SideBar.vue'


import {getCategory} from 'network/category'

export default {
  name:'Category',
  components:{
    NavBar,
    SideBar
  },
  data(){
    return {
      categoryList: [],
      titles: []
    }
  },
  created(){
    this.getCategory()
  },
  methods:{
    btnClick(){
      console.log('按钮被点击了');
    },
    getCategory(){
      getCategory().then(res=>{
        console.log(res);
        // 保存请求到的数据，箭头函数使用上下文的this
        this.categoryList = res.data.data.category.list
        res.data.data.category.list.forEach(item => this.titles.push(item.title));
        console.log(this.titles);
      })
    }
  }
}
</script>

<style scoped>
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
}

</style>