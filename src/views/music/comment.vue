<template>
<section id="songComment">
  <head>
    <van-nav-bar left-arrow>
      <van-icon name="fail" slot="right" />
      <van-icon name="arrow-left" slot="left" @click="back" />
      <div class="musicTitle_1" slot="title">
        <div>评论(1263)</div>
      </div>
    </van-nav-bar>
  </head>
  <figure>
    <img :src="`${pic}?param=150y150`" alt />
    <p>
      <span>空空</span>
      <span>代诗琪</span>
    </p>
    <van-icon name="arrow" />
  </figure>
</section>
</template>

<script>
import { NavBar, Icon } from "vant";
export default {
  data() {
    return { progress: 0, isDrag: false, open: true };
  },
  computed: {
    pic() {
      return this.$store.state.playData.pic;
    }
  },
  methods: {
    back() {
      this.$router.push("/music");
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  }
};
</script>
<style scoped>
head {
  position: absolute;
  width: 100%;
  top: 0;
  height: 8vh;
}
head .van-icon {
  opacity: 0.9;
  font-size: 0.7rem;
  color: #3e3e3e;
}
.musicTitle_1 {
  margin-left: 0.5rem;
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