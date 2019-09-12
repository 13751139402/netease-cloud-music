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
    <footer class="field">
      <van-field v-model="commValue" placeholder="这一次也许就是你上热评了" />
      <van-icon name="close" style="margin-right:5px" />
      <van-icon name="smile-o" />
      <div class="submit" @click="submitComm(1)" :class="{commFont:isCommFont}">发送</div>
    </footer>
  </section>
</template>

<script>
import { NavBar, Icon, Loading, Field } from "vant";
import modHead from "../../components/head";
export default {
  data() {
    return {
      title: "",
      loadType: true,
      isError: false,
      commValue: ""
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Loading.name]: Loading,
    [Field.name]: Field,
    modHead
  },
  computed: {
    commentData() {
      return this.$store.state.commentData;
    },
    isCommFont() {
      return this.commValue == "" ? false : true;
    }
  },
  methods: {
    back() {
      this.isError = false;
      this.$router.go(-1);
    },
    submitComm(isT) {
      if (this.isCommFont) {
        this.$http
          .get(
            `/comment?t=${isT}&type=${this.commentData.type}&id=${this.commentData.id}&content=${this.commValue}`
          )
          .then(response => {})
          .catch(error => {
            throw new Error(error);
          });
      }
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
.field {
  bottom: 0;
  height: 6.3vh;
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  font-size: 0.4rem;
  z-index: 999;
  border-top: 1px solid #f6f6f6;
}
.field > i {
  font-size: 0.6rem;
}
.submit {
  width: 2rem;
  text-align: center;
  color: #a3a3a3;
}
.commFont {
  color: #3b3b3b;
}
</style>