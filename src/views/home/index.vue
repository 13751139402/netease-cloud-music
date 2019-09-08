<template>
  <section id="home">
    <van-icon name="setting-o" @click="showPopup" class="left" />
    <van-tabs swipeable v-model="active">
      <van-tab title="我的" name="me">我的</van-tab>
      <van-tab title="发现" name="find">
        <find></find>
      </van-tab>
      <van-tab title="云村" name="burg">云村</van-tab>
      <van-tab title="视频" name="video">视频</van-tab>
    </van-tabs>
    <van-icon name="search" class="rigth" />
    <nav>
      <navbar :isShowPopup="isShowPopup"></navbar>
    </nav>
    <!-- <main style="padding: 7vh 0 10vh  0;">
      <router-view></router-view>
    </main>-->
  </section>
</template>
<script>
import { Icon, Tab, Tabs } from "vant";
import navbar from "../../components/navBar";
import find from "./children/find";
export default {
  data() {
    return {
      isShowPopup: false,
      showRecord: false,
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
    find
  },
  methods: {
    showPopup() {
      this.isShowPopup = true;
    }
  }
};
</script>
<style scoped>
#home {
  width: 100%;
  height: 100%;
}
.left {
  position: absolute;
  top: 0.25rem;
  left: 0.3rem;
  z-index: 99;
  font-size: 0.7rem;
}
.rigth {
  position: absolute;
  top: 0.25rem;
  right: 0.3rem;
  z-index: 99;
  font-size: 0.7rem;
}
</style>
<style>
#home .van-tabs--line > .van-tabs__wrap {
  padding: 0rem 1rem;
}
</style>