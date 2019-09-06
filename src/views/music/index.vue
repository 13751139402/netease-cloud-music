<template>
<section id="music">
  <img :src="`${playData.pic}?param=50y50`" id="background" />
  <head>
    <van-nav-bar left-arrow>
      <van-icon name="fail" slot="right" />
      <van-icon name="arrow-left" slot="left" @click="back" />
      <div class="musicTitle_1" slot="title">
        <div>{{playData.name}}</div>
        <div class="author">{{artists}}</div>
      </div>
    </van-nav-bar>
  </head>
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
      <van-icon name="close" />
      <van-icon name="arrow-left" />
      <van-icon name="pause-circle-o" v-show="play" @click="control" class="palyer" />
      <van-icon name="play-circle-o" v-show="!play" @click="control" class="palyer" />
      <van-icon name="arrow" />
      <van-icon name="todo-list-o" @click="changeRecord" />
    </div>
  </footer>
</section>
</template>

<script>
import { NavBar, Icon, Slider } from "vant";
import cover from './children/cover';
import lyric from './children/lyric';
export default {
  data() {
    return {
      progress: 0,
      isDrag: false,
      open:true,
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
      }
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Slider.name]: Slider,
    cover,
    lyric,
  },
  methods: {
    back() {
      this.$router.push('/home');
    },
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
    }
  },
  watch: {
    playTime(to) {
      if (this.isDrag) {
        return;
      }
      this.progress = to;
    }
  }
};
</script>

<style scoped>
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
  background: url(https://p2.music.126.net/atLK4sprSmuk8EYpargkvA==/109951164305491244.jpg?param=200y200);
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
  margin: 0.2rem 0 0 0.5rem;
  align-items: baseline;
  line-height: initial;
  color: #fff;
}
.author {
  font-size: 0.3rem;
  opacity: 0.8;
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
  font-size: 1.3rem;
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
</style>
<style>
#music .van-nav-bar__title {
  margin: 0 1rem;
  display: flex;
  background: initial;
}
#music .van-nav-bar {
  background: transparent;
}
#music .van-nav-bar__left,
#music .van-nav-bar__right {
  font-size: 0.5rem;
}
#music [class*="van-hairline"]::after {
  border: 0;
}
</style>