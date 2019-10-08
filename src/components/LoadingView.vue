<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-10-08 08:19:51
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-08 08:19:51
 -->
<template>
  <section class="initLoading" v-show="load">
    <transition name="van-fade" v-if="!error">
      <van-loading color="rgb(255, 68, 68)" style="margin-top: 10%;">
        <span>努力加载中...</span>
      </van-loading>
    </transition>
    <van-loading size="24px" vertical v-else>加载失败，请稍后再试</van-loading>
  </section>
</template>

<script>
import { Loading } from "vant";
export default {
  props: {
    load: {
      type: Boolean,
      default: true,
      required: true
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [Loading.name]: Loading
  }
};
</script>

<style scoped>
.initLoading {
  display: flex;
  justify-content: center;
  width: 100%;
  background: #fff;
  position: absolute;
  z-index: 999;
  height: 100%;
  width: 100%;
}
</style>