<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-22 20:25:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-09 16:16:25
 -->
<template>
  <div id="app">
    <transition name="shade-hide" v-if="showShade">
      <section id="shade">
        <title class="titleD">音乐的力量</title>
        <footer class="footer">
          <i class="iconfont icon-wangyiyunyinle"></i>
          网易云音乐
        </footer>
      </section>
    </transition>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <footer>
      <player v-if="this.$store.state.playData"></player>
      <div class="footer_text">粤ICP备19034833号</div>
    </footer>
    <palyRecord ref="record"></palyRecord>
  </div>
</template>
<script>
import { setTimeout } from "timers";
import player from "./components/player";
import palyRecord from "./components/playerRecord";
export default {
  data() {
    return {
      showShade: true,
      transitionName: ""
    };
  },
  components: {
    player,
    palyRecord
  },
  mounted() {
    setTimeout(() => {
      this.showShade = false;
    }, 1000);
    let userData = this.storage.get("userData");
    if (userData) {
      if (userData === "experience") {
        this.$router.push("/home");
      } else {
        this.$http
          .get(`recommend/songs?timestamp=1503019930000`)
          .then(() => {
            this.$store.commit("upDateUser", userData);
            this.$store.dispatch("selectLikeMuisc");
            this.$router.push("/home");
          })
          .catch(() => {
            this.$router.push("/login");
          });
      }
    }
  },
  watch: {
    $route(to) {
      if (to.meta.transitionType === undefined) {
        this.transitionName = "van-fade";
        return;
      }
      this.transitionName = to.meta.transitionType;
    }
  }
};
</script>
<style>
.shade-hide-leave-active {
  transition: 0.8s ease;
}
.shade-hide-leave-to {
  opacity: 0;
}
.hideDown-enter-active {
  animation: bounce-in 0.3s reverse;
}
.hideDown-leave-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    opacity: 1;
    transform: translateY(0%);
  }
  50% {
    opacity: 0;
    transform: translateY(80%);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#shade {
  position: fixed;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  color: #ffffff;
  background: #db2c1f;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3000;
  align-items: center;
}
.titleD {
  display: block;
  font-size: 1rem;
  margin-top: 3rem;
  letter-spacing: 8px;
}
.footer {
  font-size: 0.5rem;
}
.figure {
  margin: 0;
}
.footer_text {
  width: 100%;
  height: 100%;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  bottom: 0;
}
</style>
