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
      <van-icon name="like-o" />
      <van-icon name="upgrade" />
      <van-icon name="close" />
      <van-icon name="chat-o" @click="linkComment" :info="totalNum" />
      <van-icon name="more-o" />
    </article>
  </section>
</template>

<script>
import { Icon } from "vant";
export default {
  data() {
    return {
      total: 999
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
    }
  },
  created() {
    this.selectTotal();
  }
};
</script>

<style scoped>
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
  right: -6px;
}
</style>