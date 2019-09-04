<template>
  <section id="home">
    <header id="header">
      <van-icon name="setting-o" @click="showPopup" />
      <van-tabs swipeable v-model="active" @change="changeTabs">
        <van-tab title="我的" name="me"></van-tab>
        <van-tab title="发现" name="find"></van-tab>
        <van-tab title="云村" name="burg"></van-tab>
        <van-tab title="视频" name="video"></van-tab>
      </van-tabs>
      <van-icon name="search" />
    </header>
    <nav>
      <navbar :isShowPopup="isShowPopup"></navbar>
    </nav>
    <main style="padding: 7vh 0 10vh  0;">
      <router-view></router-view>
    </main>
  </section>
</template>
<script>
import { Icon, Tab, Tabs } from "vant";
import navbar from "../../components/navBar";
export default {
  data() {
    return {
      isShowPopup: false,
      showRecord:false,
      active: "find"
    };
  },
  computed: {
    tabId() {
      return this.$route.path.split("/")[2];
    }
  },
  components: {
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    navbar,
  },
  methods: {
    showPopup() {
      this.isShowPopup = true;
    },
    changeTabs(name) {
      this.$router.push(name);
    }
  }
};
</script>
<style scoped>
#home {
  width: 100%;
  height: 100%;
}
#header {
  height: 7vh;
  min-width: 0.93333rem;
  background: #fff;
  padding: 0 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  font-size: 0.7rem;
  box-sizing: border-box;
}
</style>
<style>
#header .van-tabs {
  position: relative;
  flex: 1;
  padding: 0 0.5rem;
}
</style>