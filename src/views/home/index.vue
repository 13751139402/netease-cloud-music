<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-22 20:27:27
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-09 20:22:32
 -->
<template>
  <section id="home">
    <van-icon class-prefix="icon" name="MENU" class="left" @click="showPopup"></van-icon>
    <van-tabs swipeable v-model="active" sticky>
      <van-tab title="我的" name="me" ref="me">
        <transition appear name="van-fade">
          <me></me>
        </transition>
      </van-tab>
      <van-tab title="发现" name="find" ref="find">
        <transition appear name="van-fade">
          <find></find>
        </transition>
      </van-tab>
      <van-tab title="云村" name="burg" v-if="userData" ref="burg">
        <transition appear name="van-fade">
          <burg></burg>
        </transition>
      </van-tab>
      <van-tab title="视频" name="video" ref="video">
        <transition appear name="van-fade">
          <view-video></view-video>
        </transition>
      </van-tab>
    </van-tabs>
    <van-icon name="search" class="rigth" @click="linkSearch" />
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
import video from "./children/video";
import { mapState } from "vuex";
import burg from "./children/burg";
export default {
  data() {
    return {
      isShowPopup: false,
      showRecord: false,
      active: "find"
    };
  },
  watch: {
    active(to, from) {
      Object.assign(this.$refs[from].$data, this.$refs[from].$options.data());
    }
  },
  computed: {
    tabId() {
      return this.$route.path.split("/")[2];
    },
    ...mapState(["userData"])
  },
  components: {
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    navbar,
    find,
    me,
    burg,
    "view-video": video
  },
  methods: {
    showPopup() {
      this.isShowPopup = true;
    },
    linkSearch() {
      this.$router.push("/search");
    }
  }
};
</script>
<style scoped>
#home >>> .van-tabs__content {
  min-height: calc(100vh - 1.17333rem);
}
#home >>> .van-sticky--fixed {
  background: #fff;
}
#home {
  width: 100%;
  height: 100%;
}
.left {
  position: fixed;
  top: 0.25rem;
  left: 0.3rem;
  z-index: 999;
  font-size: 0.6rem;
}
.rigth {
  position: fixed;
  top: 0.25rem;
  right: 0.3rem;
  z-index: 999;
  font-size: 0.6rem;
}
#home >>> .van-tabs {
  overflow: hidden;
}
</style>
<style>
#home .van-tabs__nav--line {
  margin: 0rem 1.2rem 0.4rem 1.2rem;
}
</style>