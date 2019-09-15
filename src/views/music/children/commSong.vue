<template>
  <main id="scroll">
    <figure class="title" @click="back">
      <img :src="`${commentData.pic}?param=150y150`" class="titleImg" />
      <p class="titileMain">
        <span>{{commentData.name}}</span>
        <router-link to>{{artists}}</router-link>
      </p>
      <div style="display: flex;align-items: center;">
        <van-icon name="arrow" />
      </div>
    </figure>
    <comments :data="hotComments" title="精彩评论" v-if="hotComments.length">
      <span slot="foot" style="display: inline-block;">
        <div class="hotComm" @click="linkHotComm">
          <span>全部精彩评论</span>
          <van-icon name="arrow" />
        </div>
      </span>
    </comments>
    <comments :data="musicComment" title="最新评论" @commLoad="selectMusicComment" ref="musicComm" style="margin-bottom: 6.3vh;"></comments>
    <footer class="field">
      <van-field v-model="commValue" placeholder="这一次也许就是你上热评了" />
      <van-icon name="close" style="margin-right:5px" />
      <van-icon name="smile-o" />
      <div class="submit" @click="submitComm(1)" :class="{commFont:isCommFont}">发送</div>
    </footer>
  </main>
</template>

<script>
import comments from "../../../components/comment";
import { Icon, Field, Toast } from "vant";
let typeMap = {
  0: "music",
  2: "playlist"
};
export default {
  data() {
    return {
      hotComments: [],
      musicComment: [],
      commPage: 0,
      total: 0,
      commValue: ""
    };
  },
  components: {
    comments,
    [Icon.name]: Icon,
    [Field.name]: Field
  },
  computed: {
    commentData() {
      return this.$store.state.commentData;
    },
    isCommFont() {
      return this.commValue == "" ? false : true;
    },
    artists() {
      if (this.commentData && this.commentData.artists) {
        return this.commentData.artists
          .reduce((tag, item) => {
            tag.push(item.name);
            return tag;
          }, [])
          .join("/");
      } else {
        return false;
      }
    }
  },
  methods: {
    back() {
      this.$parent.isError = false;
      this.$router.push("/music");
    },
    hotComment() {
      return this.$http
        .get(
          `comment/hot?id=${this.commentData.id}&type=${this.commentData.type}&limit=15`
        )
        .then(response => {
          this.hotComments = response.data.hotComments;
        })
        .catch(error => {
          //this.$parent.isError = true;
          //throw new Error(error);
        });
    },
    selectMusicComment() {
      return this.$http
        .get(
          `/comment/${typeMap[this.commentData.type]}?id=${
            this.commentData.id
          }&limit=15&offset=${this.commPage * 15}&before=0`
        )
        .then(response => {
          this.musicComment.push(...response.data.comments);
          this.commPage++;
          this.$refs.musicComm.loading = false;
          if (this.hotComments.length >= this.total) {
            this.$refs.musicComm.finished = true;
          }
        })
        .catch(error => {
          this.$parent.isError = true;
          throw new Error(error);
        });
    },
    selectTotal() {
      return this.$http
        .get(
          `/comment/${typeMap[this.commentData.type]}?id=${
            this.commentData.id
          }&limit=0&before=0`
        )
        .then(response => {
          let total = response.data.total;
          this.total = total;
          this.$parent.title = `评论(${response.data.total})`;
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    linkHotComm() {
      this.$router.push("hot");
    },
    init() {
      const _this = this;
      this.$http
        .all([this.selectTotal(), this.hotComment(), this.selectMusicComment()])
        .then(() => {
          _this.$parent.loadType = false;
        });
    },
    submitComm(isT) {
      if (this.isCommFont) {
        this.$http
          .get(
            `/comment?t=${isT}&type=${this.commentData.type}&id=${this.commentData.id}&content=${this.commValue}`
          )
          .then(response => {
            this.musicComment.unshift(response.data.comment);
            this.commValue = "";
            Toast({
              type:'success',
              message:"评论成功",
              duration:1000
            });
          })
          .catch(error => {
            Toast({
              type:'faill',
              message:"评论失败",
              duration:1000
            });
            throw new Error(error);
          });
      }
    }
  },
  watch: {
    commentData() {
      this.$parent.loadType = true;
      Object.assign(this.$data, this.$options.data());
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
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
#scroll {
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
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
.field {
  bottom: 0;
  height: 6.3vh;
  width: 100%;
  position: fixed;
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