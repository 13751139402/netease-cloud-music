<template>
  <section id="home">
    <van-icon name="setting-o" @click="showPopup" class="left" />
    <van-tabs swipeable v-model="active" sticky>
      <van-tab title="我的" name="me">
        <me></me>
      </van-tab>
      <van-tab title="发现" name="find">
        <find></find>
      </van-tab>
      <van-tab title="云村" name="burg">
        <burg></burg>
      </van-tab>
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
import me from "./children/me";
import burg from "./children/burg";
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
    find,
    me,
    burg
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
  position: fixed;
  top: 0.25rem;
  left: 0.3rem;
  z-index: 999;
  font-size: 0.7rem;
}
.rigth {
  position: fixed;
  top: 0.25rem;
  right: 0.3rem;
  z-index: 999;
  font-size: 0.7rem;
}
</style>
<style>
#home .van-tabs__nav--line {
  padding: 0rem 1rem 0.4rem 1rem;
}
</style>