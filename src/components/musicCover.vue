<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-28 08:51:26
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-09 09:54:36
 -->
<template>
  <figure @click="submit">
    <img :src="`${vpic}?param=100y100`" />
    <div class="lookNum" v-if="lookNum">
      <van-icon class-prefix="icon" name="yousanjiao" class="vanClass" />
      <span>{{vlookNum}}</span>
    </div>
    <slot></slot>
    <div class="fontContainer">
      <span>{{vtitle}}</span>
    </div>
    <p id="author" v-if="vauthor">{{vauthor}}</p>
  </figure>
</template>

<script>
import { Icon } from "vant";
export default {
  components: {
    [Icon.name]: Icon
  },
  props: ["id", "pic", "lookNum", "title", "author"],
  data() {
    return {
      vid: this.id,
      vpic: this.pic,
      vtitle: this.title,
      vauthor: this.author
    };
  },
  computed: {
    vlookNum() {
      let num = this.lookNum;
      if (num < 100000) {
        return num;
      } else if (100000 < num && num < 100000000) {
        return `${Math.floor(num / 100000)}万`;
      } else {
        return `${(num / 100000000).toFixed(1)}亿`;
      }
    }
  },
  methods: {
    submit() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.vanClass {
  font-size: 0.2rem;
  margin-right: 1px;
}
.lookNum {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  color: #fff;
  display: flex;
  align-content: center;
}
figure {
  flex-basis: 33%;
  font-size: 0.3rem;
  box-sizing: border-box;
  padding: 0.1rem;
  position: relative;
}
img {
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 0.1rem;
}
.fontContainer {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 2.9rem;
}
</style>