<template>
  <section id="player" v-show="playData&&isRouteHome">
    <figure id="musicData" @click="linkMusic">
      <div class="player_round">
        <van-image round width="1rem" height="1rem" :src="`${playData.pic}?param=50y50`" />
      </div>
      <div class="player_1">
        <span>{{playData.name}}</span>
        <span style="font-size: 0.05rem;color: #9e9e9e;">横滑可以切换上下首哦</span>
      </div>
    </figure>
    <figure id="musicBtn">
      <van-circle
        v-model="currentRate"
        layer-color="#4d4d4d"
        size="1rem"
        color="#ff3a3a"
        text="颜色定制"
      >
        <div class="playBtn" @click="control">
          <van-icon name="success" v-show="palyBtn" />
          <van-icon name="cross" v-show="!palyBtn" />
        </div>
      </van-circle>
      <van-icon name="apps-o" style="margin: 0 0.2rem;" @click="changeRecord" />
    </figure>
    <audio
      id="audio"
      autoplay
      :src="playData.music"
      @timeupdate="timeupData"
      ref="audio"
      @canplay="canplay"
      @ended="ended"
    >播放器失败</audio>
  </section>
</template>

<script scoped>
import { Icon, Image, Circle } from "vant";
import palyRecord from "./playerRecord";
import { referee } from "../assets/common";
export default {
  data() {
    return {
      currentRate: 0,
      myAudio: {}
    };
  },
  computed: {
    playData() {
      this.$store.commit("changePlayType", true);
      return this.$store.state.playData;
    },
    palyBtn() {
      return this.$store.state.audio.type;
    },
    playSkip() {
      return this.$store.state.audio.skip;
    },
    isRouteHome() {
      return this.$route.matched[0].path == "/home";
    }
  },
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Circle.name]: Circle,
    palyRecord
  },
  methods: {
    changeRecord(){
      this.$store.commit('showRecord');
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
      this.$store.commit("duration", this.myAudio.duration);
    },
    ended(){
      this.$store.commit("changePlayType", false);
    }
  },
  watch: {
    palyBtn(to) {
      if (to) {
        this.myAudio.play();
      } else {
        this.myAudio.pause();
      }
    },
    playSkip(to) {
      this.myAudio.currentTime = to;
      this.$store.commit("currentTime", to);
    }
  },
  mounted() {
    //this.timeupData = referee.throttle(this.timeupData, 500);
    this.myAudio = this.$refs.audio;
  }
};
</script>

<style scoped>
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
  height: 7%;
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
  background: red;
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
  align-content: center;
  justify-content: space-evenly;
  height: 100%;
  width: 5rem;
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