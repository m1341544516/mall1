<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" 
      @tabClick="tabClick" ref="tabControl1" 
      v-show="isTabFixed"/>

    <scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll" :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" 
      @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
// 子组件
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

// 公共组件
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name:'Home',
  mixins: [itemListenerMixin, backTopMixin],
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]}, 
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener:null
    }
  },
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
      // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){

  },
  activited(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    // 防止路由切换时无法滚动
    this.$refs.scroll.refresh()
  },
  deactivited(){
    // 1.保存浏览位置
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消对某个全局函数的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  destroyed(){
    console.log('home destroyed');
  },
  methods:{
    /**
     * 事件监听相关的方法
     */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position){
      // 1.判断backTop何时显示
      this.isShowBackTop = (-position.y)>1000

      // 2.判断tabControl何时吸顶（position:fixed）
      this.isTabFixed = (-position.y)>this.tabOffsetTop
    },
    loadMore(){
      // console.log('加载更多');
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      // 获取tanControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata(){
    getHomeMultidata().then(res=>{
      // console.log(res);
      // 保存请求到的数据，箭头函数使用上下文的this
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1

      // 完成一次上拉加载
      this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    position: relative;
    /* padding-top: 44px; */
    /* 给home确定的高度，防止被内容撑开 */
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>