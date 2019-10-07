<template>
  <div class="container">
    <div class="player">
      <video-player
        v-if="ifShowVideo"
        class="video-player vjs-custom-skin needsclick"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @ended="onPlayEnded"
        @pause="onPlayPause"
        @play="onPlay"
        @timeupdate="onPlayerTimeupDate"
      ></video-player>
      <img :src="coverUrl" style="width: 100%;" v-else />
      <figure @click="onPlayer" class="playbln">
        <div class="playBtn" v-show="!playBln">
          <van-icon :name="playBtnType" />
        </div>
      </figure>
      <figure class="control">
        <div class="control_left">
          <div v-show="!playBln" class="display: flex;" @click="onPlayer">
            <van-icon name="play-circle-o" />
            <span class="control_text">{{playCount}}</span>
          </div>
        </div>
        <div class="control_right">
          <van-icon name="bar-chart-o" />
          <span class="control_text">{{durationms|switchSec}}</span>
        </div>
      </figure>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
import { videoPlayer } from "vue-video-player";

export default {
  props: {
    videoId: {
      // id
      type: [String, Number]
    },
    duration: {
      // 时长
      type: Number
    },
    coverUrl: {
      // 封面url
      type: String
    },
    playCount: {
      // 播放数量
      type: Number
    },
    videoType: {
      type: String,
      default: "video"
    }
  },
  data() {
    return {
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true , //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src:
              "http://vodkgeyttp8.vod.126.net/cloudmusic/3ebd/mv/943d/4293c082c633f7b2f39cf0b5c2bba306.mp4?wsSecret=f77ebe1a9a6618bb0cc995616f734ed3&wsTime=1570026640"
          }
        ],
        poster: this.coverUrl, //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: false //全屏按钮
        }
      },
      playBln: false, //是否处于播放状态
      durationms: this.duration,
      playBtnType: "play-circle-o",
      ifPlayLoad:false
    };
  },
  components: {
    videoPlayer,
    [Icon.name]: Icon
  },
  computed: {
    currentVideoId() {
      return this.$store.state.videoId;
    },
    ifPause() {
      return this.currentVideoId !== this.videoId;
    },
    ifShowVideo() {
      return !!this.$refs.videoPlayer || this.currentVideoId === this.videoId;
    }
  },
  methods: {
    onPlayerTimeupDate(player) {
      this.durationms = player.remainingTime() * 1000;
    },
    onPlayEnded() {
      this.playBtnType = "replay";
      this.playBln = false;
      this.durationms = this.duration;
    },
    onPlayPause() {
      this.playBtnType = "play-circle-o";
      this.playBln = !this.playBln;
    },
    onPlay() {
      this.$store.commit("videoId", this.videoId);
      this.playBln = !this.playBln;
    },
    selectVideoUrl(id) {
      this.$http
        .get(`${this.videoType}/url?id=${id}`)
        .then(({ data }) => {
          this.playerOptions.sources[0].src =
            this.videoType == "mv" ? data.data.url : data.urls[0].url;
        })
        .catch(error => {
          // console.error(error);
        });
    },
    onPlayer() {
      this.$store.commit("videoId", this.videoId);
      this.$nextTick(() => {
        if (this.playBln) {
          this.$refs.videoPlayer.player.pause();
        } else {
          this.$refs.videoPlayer.player.play();
        }
      });
    },
  },
  watch: {
    ifPause(to) {
      if (this.playBln) {
        this.$refs.videoPlayer.player.pause();
      }
    }
  },
  filters: {
    switchSec(sec) {
      sec = sec / 1000;
      return `${String(Math.round(sec / 60)).padStart(2, 0)}:${String(
        Math.floor(sec % 60)
      ).padStart(2, 0)}`;
    }
  },
  mounted() {
    this.selectVideoUrl(this.videoId);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background-color: #efefef;
  min-height: 100%;
}
.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
  display: none !important;
}
.video-js .vjs-big-play-button {
  /*
      播放按钮换成圆形
     */
  height: 2em;
  width: 2em;
  line-height: 2em;
  border-radius: 1em;
}
.player {
  position: relative;
}
.control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 15%;
  padding: 0 0.1rem;
  box-sizing: border-box;
  font-size: 0.1rem;
  color: #fbfcfe;
}
.control_left,
.control_right {
  display: flex;
  align-items: center;
}
.control_text {
  margin-left: 0.1rem;
}
.playbln {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  top: 0;
  color: #fbfcfe;
  font-size: 0.8rem;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
}
*{
  line-height: 0;
}
</style>