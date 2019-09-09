<template>
  <main id="scroll">
    <figure class="title" @click="back">
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
</template>

<script>
import comments from "../../../components/comment";
import { Icon } from "vant";
import { Promise } from "q";
export default {
  data() {
    return {
      hotComments: [],
      musicComment: [],
      commPage: 0,
      total: 0
    };
  },
  components: {
    comments,
    [Icon.name]: Icon
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
      return this.$http
        .get(`comment/hot?id=${this.playData.id}&type=0&limit=15`)
        .then(response => {
          this.hotComments = response.data.hotComments;
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    selectMusicComment() {
      return this.$http
        .get(
          `/comment/music?id=${this.playData.id}&limit=15&offset=${this
            .commPage * 15}&before=0`
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
          throw new Error(error);
        });
    },
    selectTotal() {
      return this.$http
        .get(`/comment/music?id=${this.playData.id}&limit=0&before=0`)
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
    }
  },
  watch: {
    playData(to) {
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
  padding-top: 8vh;
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
</style>