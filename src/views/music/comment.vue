<template>
<section id="songComment">
  <head>
    <van-nav-bar left-arrow>
      <van-icon name="fail" slot="right" />
      <van-icon name="arrow-left" slot="left" @click="back" />
      <div class="musicTitle_1" slot="title">
        <div>评论({{total}})</div>
      </div>
    </van-nav-bar>
  </head>
  <main id="scroll">
    <figure class="title">
      <img :src="`${playData.pic}?param=150y150`" class="titleImg" />
      <p class="titileMain">
        <span>{{playData.name}}</span>
        <router-link to>{{artists}}</router-link>
      </p>
      <div style="display: flex;align-items: center;">
        <van-icon name="arrow" />
      </div>
    </figure>
    <comments :data="hotComments" title="精彩评论">
      <span slot="foot" style="display: inline-block;">
        <div class="hotComm" @click="linkHotComm">
          <span>全部精彩评论</span>
          <van-icon name="arrow" />
        </div>
      </span>
    </comments>
    <comments :data="musicComment" title="最新评论" @commLoad="selectMusicComment" ref="musicComm"></comments>
  </main>
</section>
</template>

<script>
import { NavBar, Icon } from "vant";
import comments from "../../components/comment";
export default {
  data() {
    return {
      progress: 0,
      isDrag: false,
      open: true,
      hotComments: [],
      musicComment: [],
      commPage: 0,
      total: 0
    };
  },
  computed: {
    playData() {
      return this.$store.state.playData;
    },
    artists() {
      if (this.playData && this.playData.artists) {
        return this.playData.artists
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
      this.$router.push("/music");
    },
    hotComment() {
      this.$http
        .get(`comment/hot?id=${this.playData.id}&type=0&limit=15`)
        .then(response => {
          this.hotComments = response.data.hotComments;
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    selectMusicComment() {
      this.$http
        .get(
          `/comment/music?id=${this.playData.id}&limit=15&offset=${this
            .commPage * 15}&before=0`
        )
        .then(response => {
          if (!this.total) {
            this.total = response.data.total;
          }
          this.musicComment.push(...response.data.comments);
          this.commPage++;
          this.$refs.musicComm.loading = false;
          if (this.hotComments.length >= this.total) {
            this.$refs.musicComm.finished = true;
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    linkHotComm() {
      this.$router.push("/hotComm");
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    comments
  },
  mounted() {
    this.hotComment();
    //this.selectMusicComment();
  }
};
</script>
<style scoped>
#songComment {
  height: 100%;
}
head {
  position: fixed;
  width: 100%;
  top: 0;
  height: 8vh;
  background: #fff;
  z-index: 199;
}
#scroll {
  padding-top: 8vh;
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