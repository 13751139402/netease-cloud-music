<template>
<section id="songComment">
  <head>
    <van-nav-bar left-arrow>
      <van-icon name="fail" slot="right" />
      <van-icon name="arrow-left" slot="left" @click="back" />
      <div class="musicTitle_1" slot="title">
        <div>{{title}}</div>
      </div>
    </van-nav-bar>
  </head>
  <div id="loading" v-show="loadType">
    <van-loading color="rgb(255, 68, 68)">
      <span>努力加载中...</span>
    </van-loading>
  </div>
  <router-view></router-view>
</section>
</template>

<script>
import { NavBar, Icon, Loading } from "vant";
export default {
  data() {
    return {
      title: "",
      loadType: true
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Loading.name]: Loading
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
#songComment {
  height: 100%;
}
head {
  position: fixed;
  width: 100%;
  top: 0;
  background: #fff;
  z-index: 199;
}
head .van-icon {
  opacity: 0.9;
  font-size: 0.7rem;
  color: #3e3e3e;
}
.musicTitle_1 {
  margin-left: 0.5rem;
}
#loading {
  position: absolute;
  width: 100%;
  height: calc(100% - 8vh);
  background: #fff;
  z-index: 999;
  margin-top: 8vh;
  display: flex;
  padding-top: 2rem;
  justify-content: center;
  box-sizing: border-box;
}
</style>
<style>
#songComment .van-nav-bar__title {
  margin: 0 1rem;
  display: flex;
  background: initial;
}
#songComment .van-nav-bar {
  background: transparent;
}
#songComment .van-nav-bar__left,
#songComment .van-nav-bar__right {
  font-size: 0.5rem;
}
#songComment [class*="van-hairline"]::after {
  border: 0;
}
</style>