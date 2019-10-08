<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-30 14:51:51
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-08 16:18:18
 -->
<template>
  <section id="cover" @click="linkRouter">
    <figure id="stylus" :class="{ stylusOn: play}">
      <div id="stylus_1"></div>
      <div id="stylus_2"></div>
    </figure>
    <div id="coverContent">
      <figure id="coverContainer" :class="{coverOn : play}">
        <img :src="`${pic}?param=150y150`" id="coverPic" v-if="pic" />
        <div id="CD"></div>
      </figure>
    </div>
    <article @click.stop>
      <van-icon
        class-prefix="icon"
        :name="playData.isLike?'xihuan-wangyiicon':'xihuan'"
        @click="switchLike"
      ></van-icon>
      <van-icon class-prefix="icon" name="xiazaipt"></van-icon>
      <van-icon class-prefix="icon" name="jingyunyinxiaopt-wangyiicon"></van-icon>
      <van-icon
        class-prefix="icon"
        name="pinglunpt1"
        @click="linkComment"
        :info="totalNum"
        class="comment"
      />
      <van-icon class-prefix="icon" name="xinxipt"></van-icon>
    </article>
  </section>
</template>

<script>
import { Icon } from "vant";
export default {
  data() {
    return {
      total: 999,
      isLike: false
    };
  },
  computed: {
    play() {
      return this.$store.state.audio.type;
    },
    pic() {
      return this.$store.state.playData.pic;
    },
    playData() {
      return this.$store.state.playData;
    },
    pid() {
      return this.$store.state.playData.id;
    },
    totalNum() {
      let total = this.total;
      if (total <= 999) {
        return total;
      } else if (total > 999 && total < 10000) {
        return `999+`;
      } else if (total > 10000 && total < 100000) {
        return "1w+";
      } else {
        return "10w+";
      }
    }
  },
  methods: {
    switchLike() {
      let type = !this.playData.isLike;
      this.$http
        .get(`/like?id=${this.pid}&like=${type}`)
        .then(() => {
          this.playData.isLike = type;
          this.$store.commit("changeLikeArr", this.pid, type);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    linkRouter() {
      this.$parent.open = false;
    },
    linkComment() {
      let data = {
        id: this.pid, //评论id
        name: this.playData.name, //评论名称
        artists: this.playData.artists, //作者
        type: 0, //类型 歌曲
        pic: this.playData.pic
      };
      this.$store.commit("commentData", data);
      this.$router.push("/comment");
    },
    selectTotal() {
      if (!this.pid) {
        return;
      }
      this.$http
        .get(`/comment/music?id=${this.pid}&limit=0&before=0`)
        .then(response => {
          this.total = response.data.total;
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  },
  components: {
    [Icon.name]: Icon
  },
  watch: {
    pid() {
      this.selectTotal();
    },
    playData: {
      handler(to) {
        this.isLike = to.isLike;
      },
      immediate: true
    }
  },
  created() {
    this.selectTotal();
  }
};
</script>

<style scoped>
.icon {
  font-size: 0.65rem;
}
.icon-xihuan-wangyiicon {
  color: red;
}
.likeTrue {
  color: red;
}
.likeAnimat-enter-active,
.likeAnimat-leave-active {
  transition: opacity 0.5s;
}
.likeAnimat-enter, .likeAnimat-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* .likeAnimat {
  animation: likeAnimat-in 0.5s reverse;
}
@keyframes likeAnimat-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
} */
.comment {
  position: relative;
}
#cover {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
#coverContent {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
#coverContainer {
  width: 8.5rem;
  height: 8.5rem;
  position: relative;
  animation: cover 8s linear infinite;
  animation-play-state: paused;
}
.coverOn {
  animation-play-state: running !important;
}
@keyframes cover {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes cover /*Safari and Chrome*/ {
  from {
    transform: rotate(0deg);
    color: white;
  }
  to {
    transform: rotate(360deg);
  }
}

article {
  height: 10%;
  display: flex;
  margin: 0 1.5rem;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
}
#CD {
  background: url("~imgs/coverall.png") no-repeat center / 100%;
  width: 8.5rem;
  height: 8.5rem;
  position: absolute;
}
#coverPic {
  height: 5.5rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

#stylus {
  position: absolute;
  width: 7.5rem;
  height: 7.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  margin: -30% auto;
  z-index: 99;
  transition: all 0.3s linear;
  transform: rotate(-15deg);
}
.stylusOn {
  transform: rotate(13deg) !important;
}
#stylus_1 {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  border: 8px solid #fff;
  background: #e8e6e7;
  position: absolute;
  box-sizing: border-box;
  z-index: 9;
}
#stylus_2 {
  background: url("~imgs/stylus.png") no-repeat;
  background-size: 100%;
  width: 4.5rem;
  height: 4.5rem;
  position: absolute;
  margin-top: 26%;
  margin-left: 26%;
}
</style>
<style>
#cover .van-info {
  background: transparent;
  border: 0;
  right: -0.1rem;
  top: -0.15rem;
}
</style>