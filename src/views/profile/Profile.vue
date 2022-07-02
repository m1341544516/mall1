<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center">个人中心</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name:'Profile',
  components:{
    NavBar
  },
  data(){
    return {

    }
  },
  methods:{

  }
}
</script>

<style scoped>
.profile-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>