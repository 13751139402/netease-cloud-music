<template>
  <section id="hotComm">
    <main>
      <comments :data="hotComments" @commLoad="selectHotComm" :total="total" ref="hotComm"></comments>
    </main>
  </section>
</template>

<script>
import { NavBar, Icon } from "vant";
import comments from "../../../components/comment";
export default {
  data() {
    return {
      hotComments: [],
      commPage: 0,
      total: 0
    };
  },
  computed: {
    commentData() {
      return this.$store.state.commentData;
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    comments
  },
  methods: {
    back() {
      this.$parent.isError=false;
      this.$router.push("/songComment");
    },
    selectHotComm() {
      return this.$http
        .get(
          `comment/hot?id=${
            this.commentData.id
          }&type=${this.commentData.type}&limit=15&before=0&offset=${this.commPage * 15}`
        )
        .then(response => {
          this.hotComments.push(...response.data.hotComments);
          this.commPage++;
          this.$refs.hotComm.loading = false;
          if (this.hotComments.length >= this.total-1) {
            this.$refs.hotComm.finished = true;
          }
        })
        .catch(error => {
          this.$parent.isError=true;
          throw new Error(error);
        });
    },
    selectTotal() {
      return this.$http
        .get(`/comment/hot?id=${this.commentData.id}&type=${this.commentData.type}&limit=0&before=0`)
        .then(response => {
          let total = response.data.total;
          this.total = total;
          this.$parent.title = `精彩评论(${total})`;
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  },
  mounted() {
    this.$parent.loadType = true;
    const _this = this;
    this.$http.all([this.selectTotal(), this.selectHotComm()]).then(() => {
      _this.$parent.loadType = false;
    });
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
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
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