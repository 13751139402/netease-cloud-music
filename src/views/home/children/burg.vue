<template>
  <section id="burg">
    <van-list
      v-model="loading"
      :finished="finished"
      @load="selectData"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <moments v-for="item in event" :key="item.id" :data="item"></moments>
    </van-list>
  </section>
</template>

<script>
import { List } from "vant";
import moments from "../../../components/moments";
export default {
  components: {
    moments,
    [List.name]: List
  },
  data() {
    return {
      event: [],
      lasttime: "-1",
      loading: false, //是否正在加载
      finished: false, //是否加载完成
      error: false
    };
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    }
  },
  methods: {
    selectData() {
      this.$http
        .get(`event?pagesize=2&lasttime=${this.lasttime}`)
        .then(response => {
          let event = response.data.event;
          this.event.push(...event);
          this.lasttime = this.event[this.event.length - 1].eventTime;
          this.loading = false;
          this.error = false;
        });
    }
  }
};
</script>

<style scoped>
#burg {
  width: 100%;
  height: 100%;
}
</style>