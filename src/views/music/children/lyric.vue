<template>
  <section id="lyric" ref="lyric">
    <div id="container">
      <p v-for="(item ,index) in lyricData " :key="index" :ref="index">{{item.text}}</p>
    </div>
  </section>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      lyricData: false,
      currLyric: false
    };
  },
  computed: {
    muiscId() {
      this.currLyric = false;
      return this.$store.state.playData.id;
    },
    progress() {
      return this.$store.state.audio.currentTime;
    }
  },
  methods: {
    selectLyric(id) {
      this.$http
        .get(`/lyric?id=${id}`)
        .then(response => {
          let text = response.data.lrc.lyric;
          let array = [];
          text.replace(/\[(.*):(.*)\](.*)/g, (match, minute, second, text) => {
            array.push({
              id: minute * 60 + Number(second),
              text
            });
          });
          this.lyricData = array;
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    changeLyric(time) {
      if (this.currLyric === false) {
        let prog = this.lyricData[0].id;
        if (time >= prog) {
          this.currLyric = 0;
        }
      } else {
        let index = this.currLyric,
          current = this.lyricData[this.currLyric].id;
        if (time > current) {
          // 跳转下一句歌词
          let next = this.lyricData[index++].id;
          while (time < next) {
            index++;
            next = this.lyricData[index].id;
          }
          this.currLyric = index;
        }
      }
    },
    scroll(num) {
      console.log("asd");
      let scroll = this.$refs.lyric.scrollTop,
        len = num - scroll;
      if (len) {
        for (let i = 0; len >= i; i++) {
          this.$refs.lyric.scrollTop = scroll + i;
        }
      } else {
        for (let i = 0; i <= len; i--) {
          this.$refs.lyric.scrollTop = scroll - i;
        }
      }
    }
  },
  watch: {
    muiscId(to) {
      this.selectLyric(to);
    },
    progress(to) {
      if (this.lyricData) {
        this.changeLyric(to);
      }
    },
    currLyric(index) {
      if (index !== false) {
        this.scroll(this.$refs[index][0].offsetTop);
      }
    }
  },
  mounted() {
    console.log("dwwd");
    this.selectLyric(this.muiscId);
  }
};
</script>

<style scoped>
#lyric {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
}
#container {
  padding: 40vh 0;
  font-size: 0.4rem;
  text-align: center;
}
#container p {
  padding: 0.25rem 0;
}
</style>