<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-29 20:04:18
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-09 19:58:49
 -->
<template>
  <section id="player" v-show="playData&&isRouteHome">
    <figure id="musicData" @click="linkMusic">
      <div class="player_round">
        <van-image round width="1rem" height="1rem" :src="`${playData.pic}?param=50y50`" />
      </div>
      <div class="player_1">
        <div>{{playData.name}}</div>
        <div style="font-size: 0.05rem;color: #9e9e9e;">横滑可以切换上下首哦</div>
      </div>
    </figure>
    <figure id="musicBtn">
      <van-circle
        v-model="currentRate"
        :rate="circleRate"
        :layer-color="palyBtn?`#f5f5f5`:`#d4d4d4`"
        size=".8rem"
        color="#ff3a3a"
        @click.native="control"
      >
        <van-icon :name="palyBtn?`zanting2`:`yousanjiao`" class-prefix="icon" size=".45rem" />
      </van-circle>
      <van-icon class-prefix="icon" name="caidan" @click="changeRecord" class="iconList" />
    </figure>
    <audio
      id="audio"
      autoplay
      :src="playData.music"
      @timeupdate="timeupData"
      ref="audio"
      :loop="loopType"
      @canplay="canplay"
      @ended="ended"
    >播放器失败</audio>
  </section>
</template>

<script scoped>
import { Icon, Image, Circle } from "vant";
export default {
  data() {
    return {
      currentRate: 0,
      circleRate: 0,
      myAudio: {}
    };
  },
  computed: {
    videoId() {
      return this.$store.state.videoId;
    },
    loopType() {
      return this.playTypeIndex === 2;
    },
    playData() {
      return this.$store.state.playData;
    },
    palyBtn() {
      return this.$store.state.audio.type;
    },
    playSkip() {
      return this.$store.state.audio.skip;
    },
    isRouteHome() {
      let allow = "/home/playList";
      let reg = RegExp(this.$route.matched[0].path);
      return reg.test(allow);
    },
    volume() {
      return this.$store.state.audio.volume;
    },
    playTypeIndex() {
      return this.$store.state.playTypeIndex;
    }
  },
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Circle.name]: Circle
  },
  methods: {
    changeRecord() {
      this.$store.commit("showRecord");
    },
    control() {
      this.$store.commit("changePlayType", !this.palyBtn);
    },
    timeupData(event) {
      let target = event.target;
      this.currentRate = (target.currentTime / target.duration) * 100;

      this.$store.commit("currentTime", target.currentTime);
      this.$store.commit("changePlayTime", this.currentRate);
    },
    linkMusic() {
      this.$router.push("/music");
    },
    canplay() {
      this.$store.commit("changePlayType", true);
      this.$store.commit("volume", this.myAudio.volume);
      this.$store.commit("duration", this.myAudio.duration);
    },
    ended() {
      if (!this.loopType) {
        this.$store.commit("playIndexNext");
      }
      this.$store.commit("changePlayType", false);
    }
  },
  watch: {
    palyBtn(to) {
      if (to) {
        this.$store.commit("videoId", "");
        this.myAudio.play();
      } else {
        this.myAudio.pause();
      }
    },
    playSkip(to) {
      this.myAudio.currentTime = to;
      this.$store.commit("currentTime", to);
    },
    volume(to) {
      this.myAudio.volume = to;
    },
    videoId(to) {
      if (to === "") {
        return;
      }
      this.$store.commit("changePlayType", false);
    }
  },
  mounted() {
    this.myAudio = this.$refs.audio;
  }
};
</script>

<style scoped>
#musicBtn >>> .van-circle {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-yousanjiao {
  margin-left: 0.1rem;
  font-size: 0.4rem;
}
.icon-zanting2 {
  color: #ff3a3a;
}
.iconList {
  font-size: 1rem;
  margin-left: 0.5rem;
  font-size: 0.8rem;
}
.playBtn {
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
#player {
  background: #ffffff;
  border-top: 0.02667rem solid #e6e6e6;
  position: fixed;
  bottom: 0;
  height: 1.3rem;
  width: 100%;
  font-size: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 99;
}
.player_round {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  margin-right: 0.1rem;
}
#musicData {
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 0.2rem;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.player_1 {
  display: flex;
  flex-direction: column;
  width: 5rem;
}
.player_1 > div {
  margin: 2px 0;
}
#musicBtn {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0 0.3rem;
}
.playBtn {
  border-radius: 50%;
}
</style>