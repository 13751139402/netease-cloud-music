<template>
  <div id="app">
    <transition name="shade-hide">
      <section id="shade" v-if="showShade">
        <title class="title">音乐的力量</title>
        <footer class="footer">
          <i class="iconfont icon-wangyiyunyinle"></i>
          网易云音乐
        </footer>
      </section>
    </transition>
    <transition name="transitionName">
      <router-view />
    </transition>
  </div>
</template>
<script>
import { setTimeout } from "timers";
import storage from "./assets/common";
export default {
  data() {
    return {
      showShade: true,
      transitionName:'hideDown'
    };
  },
  mounted() {
    setTimeout(() => {
      this.showShade = false;
    }, 1000);
    if (storage.get("userId")) {
      console.log('44')
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
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
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
.title {
  display: block;
  font-size: 2rem;
  margin-top: 10rem;
  letter-spacing: 8px;
}
.footer {
  font-size: 1rem;
}
</style>
