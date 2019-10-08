<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-22 20:25:05
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-08 17:48:50
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
      showShade: false,
      transitionName: ""
    };
  },
  components: {
    player,
    palyRecord
  },
  mounted() {
    setTimeout(() => {
      //this.showShade = false;
    }, 1000);
    let userData = this.storage.get("userData");

    //let cookie =this.storage.getCookie("MUSIC_U");
    if (userData !== "undefined") {
      if (userData === "experience") {
        //this.$router.push("/home");
      } else {
        this.$store.commit("upDateUser", userData);
        this.$store.dispatch("selectLikeMuisc");
        //this.$router.push("/home");
      }
    }
  },
  watch: {
    $route(to) {
      if (!to.meta.transitionType) {
        this.transitionName = "";
        return;
      }
      let type = to.meta.transitionType == "hideDown";
      this.transitionName = type && "hideDown";
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
  height: 100%;
}
#shade {
  position: absolute;
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
</style>
