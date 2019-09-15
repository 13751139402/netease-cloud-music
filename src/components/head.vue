<template>
<head id="head">
  <div id="left" @click="left">
    <van-icon name="arrow-left" />
  </div>
  <div id="main">
    <slot name="title">
      <span>{{title}}</span>
    </slot>
  </div>
  <div id="right">
    <slot name="right">
      <van-icon name="more-o" />
    </slot>
  </div>
</head>
</template>

<script>
import { Icon } from "vant";
export default {
  data() {
    return {};
  },
  props: ["title"],
  components: {
    [Icon.name]: Icon
  },
  methods: {
    left() {
      if (this.$listeners.left) {
        this.$emit("left");
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
#head {
  height: 1.2rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  padding: 0 0.2rem;
}
#main {
  flex: 1;
  margin-left: 0.2rem;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 0.5rem;
  overflow: hidden;
}
</style>