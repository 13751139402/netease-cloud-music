<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-30 14:54:19
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-08 12:36:55
 -->
<template>
  <section id="lyric">
    <div class="top">
      <div style="margin-right: .3rem;">
        <van-icon class-prefix="icon" name="laba1"></van-icon>
      </div>
      <div style="flex: 1;">
        <van-slider
          v-model="volumeProg"
          @change="onChange"
          inactive-color="rgb(255, 255, 255,0.3)"
          active-color="#fff"
        >
          <div slot="button" class="custom-button"></div>
        </van-slider>
      </div>
    </div>
    <div id="lyricMain" ref="lyric" @click="linkRouter">
      <div id="container">
        <p
          v-for="(item ,index) in lyricData "
          :key="index"
          :ref="index"
          :class="{currLyric:index===currLyric}"
        >{{item.text}}</p>
      </div>
    </div>
    <van-icon class-prefix="icon" name="xinxipt"></van-icon>
  </section>
</template>

<script>
import { Icon, Slider } from "vant";
export default {
  data() {
    return {
      lyricData: false,
      currLyric: 0,
      volumeProg: this.$store.state.audio.volume * 100
    };
  },
  components: {
    [Icon.name]: Icon,
    [Slider.name]: Slider
  },
  computed: {
    muiscId() {
      return this.$store.state.playData.id;
    },
    progress() {
      return this.$store.state.audio.currentTime;
    },
    scrollDist() {
      return (
        document.body.clientHeight * 0.4 - this.$refs[0][0].offsetHeight * 0.5
      );
    },
    volume() {
      return this.$store.state.audio.volume;
    }
  },
  methods: {
    selectLyric(id) {
      this.$http
        .get(`/lyric?id=${id}`)
        .then(response => {
          let lrc = response.data.lrc;
          let data = lrc ? lrc.lyric : "";
          if (data === "") {
            this.lyricData = [
              {
                id: 1,
                text: "暂无歌词"
              }
            ];
            return;
          }
          let array = [];
          data.replace(/\[(.*)\](.*)/g, (match, time, text) => {
            let timeArr = time.split("][");
            timeArr.forEach(item => {
              let time1 = item.split(":"),
                tiemId = time1[0] * 60 + Number(time1[1]);
              if (tiemId) {
                array.push({
                  id: tiemId,
                  text
                });
              }
            });
          });
          this.lyricData = array.sort((a, b) => {
            return a.id - b.id;
          });
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    changeLyric(time) {
      let index = this.currLyric,
        current = this.lyricData[this.currLyric].id;
      if (time > current) {
        // 跳转下一句歌词
        index++;
        for (let len = this.lyricData.length; index < len; index++) {
          let next = this.lyricData[index] && this.lyricData[index].id, //获取下一行歌词的开始时间
            after = this.lyricData[index + 1]
              ? time < this.lyricData[index + 1].id
              : true; //获取下下一行歌词的开始时间
          // 判断在哪个时间区间
          if (this.lyricData[index + 1] && time > next && after) {
            this.currLyric = index;
            return;
          }
        }
      } else {
        // 跳转上一句歌词
        index--;
        for (; index >= 0; index--) {
          let befor = this.lyricData[index] && this.lyricData[index].id; //获取上一行歌词的开始时间
          // 判断在哪个时间区间
          if (time > befor) {
            this.currLyric = index;
            return;
          }
        }
      }
    },
    linkRouter() {
      this.$parent.open = true;
    },
    onChange(value) {
      this.$store.commit("volume", value * 0.01);
    }
  },
  watch: {
    muiscId(to) {
      this.currLyric = 0;
      this.selectLyric(to);
    },
    progress(to) {
      if (this.lyricData) {
        this.changeLyric(to);
      }
    },
    currLyric(index) {
      let distance = this.$refs[index][0].offsetTop - this.scrollDist;
      if (distance) {
        this.$route.meta.scrollTop = distance;
        this.$refs.lyric.scrollTo({
          top: distance,
          behavior: "smooth"
        });
      }
    },
    volume(to) {
      this.volumeProg = to * 100;
    }
  }
};
</script>

<style scoped>
#lyric {
  height: 100%;
  font-size: 0.7rem;
}
#lyricMain {
  width: 100%;
  height: 95%;
  overflow-y: auto;
  box-sizing: border-box;
  position: relative;
}
#container {
  padding: 40vh 0.5rem;
  font-size: 0.4rem;
  text-align: center;
}
#container > p {
  padding: 0.25rem 0;
  opacity: 0.5;
}
.currLyric {
  opacity: 1 !important;
}
.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5%;
  margin: 0 1.5rem;
}
.top {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.4rem;
  margin: 0 0.7rem;
}
.custom-button {
  width: 0.3rem;
  height: 0.3rem;
  background: #fff;
  border-radius: 50%;
}
.icon-xinxipt {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  font-size: 0.65rem;
}
</style>