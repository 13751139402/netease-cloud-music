<template>
<section id="hotComm">
  <head>
    <van-nav-bar left-arrow>
      <van-icon name="fail" slot="right" />
      <van-icon name="arrow-left" slot="left" @click="back" />
      <div class="musicTitle_1" slot="title">
        <div>精彩评论({{total}})</div>
      </div>
    </van-nav-bar>
  </head>
  <main>
    <comments :data="hotComments" @commLoad="selectHotComm" :total="total" ref="hotComm"></comments>
  </main>
</section>
</template>

<script>
import { NavBar, Icon } from "vant";
import comments from "../../components/comment";
export default {
  data() {
    return {
      hotComments: [],
      commPage: 0,
      total: 0
    };
  },
  computed: {
    playData() {
      return this.$store.state.playData;
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    comments
  },
  methods: {
    back() {
      this.$router.push("/songComment");
    },
    selectHotComm() {
      this.$http
        .get(`comment/hot?id=${this.playData.id}&type=0&limit=15&before=0&offset=${this.commPage * 15}`)
        .then(response => {
          if (!this.total) {
            this.total = response.data.total;
          }
          this.hotComments.push(...response.data.hotComments);
          this.commPage++;
          this.$refs.hotComm.loading = false;
          console.log(`总数:${this.total}  现有数:${this.hotComments.length}`);
          if (this.hotComments.length >= this.total) {
            console.log("完成")
              this.$refs.hotComm.finished = true;
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
</script>

<style scoped>
#hotComm {
  height: 100%;
}
head {
  position: fixed;
  width: 100%;
  top: 0;
  background: #fff;
  z-index: 199;
}
main {
  padding-top: 8vh;
  height: 100%;
  box-sizing: border-box;
}
head .van-icon {
  opacity: 0.9;
  font-size: 0.7rem;
  color: #3e3e3e;
}
.musicTitle_1 {
  margin-left: 0.5rem;
}
.titleImg {
  display: flex;
  height: 2.5rem;
  border-radius: 5px;
}
.titileMain {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 0.1rem;
  justify-content: center;
  font-size: 0.5rem;
}
.titileMain span,
.titileMain a {
  padding: 3px;
}
a {
  color: #67809e;
  font-size: 0.4rem;
}
.title {
  display: flex;
  padding: 5px 0.4rem 10px;
  border-bottom: 8px solid #f6f6f6;
}
.hotComm {
  width: 2.5rem;
  height: 0.4rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #bbbbbb;
  border-radius: 30px;
  padding: 5px 10px;
  font-size: 0.5px;
  color: #6a6a6a;
}
.hotComm:hover {
  background: #bbbbbb;
  color: #fff !important;
}
</style>
<style>
#hotComm .van-nav-bar__title {
  margin: 0 1rem;
  display: flex;
  background: initial;
}
#hotComm .van-nav-bar {
  background: transparent;
}
#hotComm .van-nav-bar__left,
#hotComm .van-nav-bar__right {
  font-size: 0.5rem;
}
#hotComm [class*="van-hairline"]::after {
  border: 0;
}
</style>