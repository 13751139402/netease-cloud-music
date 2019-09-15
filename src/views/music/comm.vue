<template>
  <section id="songComment">
    <modHead @left="back" :title="title"></modHead>
    <div id="loading" v-show="loadType">
      <van-loading color="rgb(255, 68, 68)" v-if="!isError">
        <span>努力加载中...</span>
      </van-loading>
      <div v-else style="display: flex;font-size: .5rem;color: red;">
        <van-icon name="cross" />
        <span>加载失败</span>
      </div>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
import { NavBar, Icon, Loading } from "vant";
import modHead from "../../components/head";
export default {
  data() {
    return {
      title: "",
      loadType: true,
      isError: false,
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Loading.name]: Loading,
    modHead
  },
  computed: {
    commentData() {
      return this.$store.state.commentData;
    }
  },
  methods: {
    back() {
      this.isError = false;
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
#songComment {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
head {
  width: 100%;
  top: 0;
  background: #fff;
  z-index: 199;
}
head .van-icon {
  opacity: 0.9;
  font-size: 0.7rem;
  color: #3e3e3e;
}
.musicTitle_1 {
  margin-left: 0.5rem;
}
#loading {
  position: absolute;
  width: 100%;
  height: calc(100% - 8vh);
  background: #fff;
  z-index: 999;
  margin-top: 8vh;
  display: flex;
  padding-top: 2rem;
  justify-content: center;
  box-sizing: border-box;
}

</style>