<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-30 14:50:44
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-09 19:06:56
 -->
<template>
  <section id="music">
    <img :src="`${playData.pic}?param=10y10`" id="background" />
    <modHead>
      <div class="musicTitle_1" slot="title">
        <div class="musicName">{{playData.name}}</div>
        <div class="author">{{artists}}</div>
      </div>
      <template #right>
        <van-icon class-prefix="icon" name="fenxiangpt" />
      </template>
    </modHead>
    <main>
      <cover v-show="open"></cover>
      <lyric v-show="!open"></lyric>
    </main>
    <footer>
      <div id="progressNode">
        <span id="progressLeft">{{currentTime}}</span>
        <figure id="progressContainer">
          <van-slider
            v-model="progress"
            bar-height="2px"
            active-color="#f44"
            @change="progressChange"
            @drag-start="isDrag=true"
            @drag-end="isDrag=false"
          >
            <div slot="button" class="custom-button"></div>
          </van-slider>
        </figure>
        <span id="progressRight">{{duration}}</span>
      </div>
      <div id="control">
        <van-icon :name="playTypeIcon" class-prefix="icon" @click="changePlayType" />
        <van-icon name="shangyiqu" class-prefix="icon" @click="last" />
        <van-icon
          :name="play?'bofang1':'zanting'"
          class-prefix="icon"
          @click="control"
          class="palyer"
        />
        <van-icon name="xiayiqu" class-prefix="icon" @click="next" />
        <van-icon name="caidan" class-prefix="icon" @click="changeRecord" />
      </div>
    </footer>
  </section>
</template>

<script>
const playType = new Map([
  [0, { name: "列表循环", icon: "xunhuanbofang" }],
  [1, { name: "随机播放", icon: "suijibofang-wangyiicon" }],
  [2, { name: "单曲循环", icon: "danquxunhuan" }]
]);
import { NavBar, Icon, Slider, Toast } from "vant";
import cover from "./children/cover";
import lyric from "./children/lyric";
import modHead from "../../components/head";
export default {
  data() {
    return {
      progress: 0,
      isDrag: false,
      open: true,
      playTypeIcon: "xunhuanbofang"
    };
  },
  computed: {
    play() {
      return this.$store.state.audio.type;
    },
    playData() {
      return this.$store.state.playData;
    },
    playTime() {
      return this.$store.state.audio.time;
    },
    duration() {
      return this.$store.getters.duration;
    },
    currentTime() {
      return this.$store.getters.currentTime;
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
    },
    playTypeIndex() {
      return this.$store.state.playTypeIndex;
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Slider.name]: Slider,
    cover,
    lyric,
    modHead
  },
  methods: {
    control() {
      this.$store.commit("changePlayType", !this.play);
    },
    progressChange(value) {
      this.$store.commit(
        "changePlaySkip",
        this.$store.state.audio.duration * value * 0.01
      );
    },
    changeRecord() {
      this.$store.commit("showRecord");
    },
    next() {
      this.$store.commit("playIndexNext");
    },
    last() {
      this.$store.commit("playIndexLast");
    },
    changePlayType() {
      this.$store.commit("changePlayTypeIndex");
    }
  },
  watch: {
    playTime(to) {
      if (this.isDrag) {
        return;
      }
      this.progress = to;
    },
    playTypeIndex(to) {
      Toast({
        position: "bottom",
        message: playType.get(to).name,
        duration: 1000
      });
      this.playTypeIcon = playType.get(to).icon;
    }
  }
};
</script>

<style scoped>
/* #control .icon {
  font-size: 0.6rem;
} */
#music {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #fff;
  background: gray;
}
#background {
  filter: blur(2rem);
  height: 100%;
  width: 100%;
  background: url(https://p2.music.126.net/atLK4sprSmuk8EYpargkvA==/109951164305491244.jpg?param=100y100);
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
}
.musicTitle {
  height: 100%;
  display: flex;
  font-size: 0.5rem;
  align-items: center;
}
.musicTitle span {
  line-height: initial;
}
.musicTitle_1 {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  line-height: initial;
  color: #fff;
  width: 90%;
}
.author {
  font-size: 0.3rem;
  opacity: 0.8;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 5rem;
}
head {
  position: absolute;
  width: 100%;
  top: 0;
  height: 8vh;
}
main {
  position: absolute;
  width: 100%;
  top: 8%;
  height: 80%;
  overflow: hidden;
}
footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 12vh;
  box-sizing: border-box;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
}
#progressNode {
  font-size: 0.3rem;
  display: flex;
  align-items: center;
}
#progressContainer {
  flex: 1 1 0%;
  margin: 0px 0.2rem;
  position: relative;
}
#progressLine {
  flex: 1;
  height: 2px;
  background: #fff;
  opacity: 0.8;
  border-radius: 10px;
}
#progressTrue {
  background: #fff;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 100%;
  margin-top: -0.11rem;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
}
#progressRight {
  opacity: 0.8;
}
#control {
  margin: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-size: 0.9rem;
}
#control .van-icon {
  opacity: 0.8;
}
.palyer {
  font-size: 1.3rem !important;
  opacity: 1 !important;
}
head .van-icon {
  opacity: 0.9;
  font-size: 0.7rem;
  color: #fff;
}
.custom-button {
  width: 0.3rem;
  height: 0.3rem;
  background: #fff;
  border-radius: 50%;
}
.musicName {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
<style>
.van-nav-bar__title {
  margin: 0 1rem;
  display: flex;
  background: initial;
}
.van-nav-bar {
  background: transparent;
}
.van-nav-bar__left,
.van-nav-bar__right {
  font-size: 0.5rem;
}
[class*="van-hairline"]::after {
  border: 0;
}
.van-nav-bar__left {
  left: 0.4rem;
}
.van-nav-bar__right {
  right: 0.4rem;
}
</style>