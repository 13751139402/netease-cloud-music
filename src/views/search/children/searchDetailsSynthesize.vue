<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-09-24 08:43:02
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-08 17:47:55
 -->
<template>
  <section class="synthesize">
    <Cell :data="songData" type="songs" @submit="submitSongs"></Cell>
    <Cell :data="video" type="videos"></Cell>
    <Cell :data="artist" type="artists"></Cell>
    <Cell :data="playListData" type="playlists" @submit="linkPlayList" v-if="playListData"></Cell>
  </section>
</template>

<script>
import Cell from "./searchCell";
export default {
  props: ["initLoad"],
  data() {
    return {
      songData: false,
      playListData: false,
      video: false,
      artist: false
    };
  },
  computed: {
    keywords() {
      return this.$store.state.keywords;
    }
  },
  components: {
    Cell
  },
  methods: {
    linkPlayList(id) {
      this.$store.commit("playListId", id);
      this.$router.push("/playList");
    },
    submitSongs(id) {
      this.$store.dispatch("selectMusic", id);
      this.$router.push("/music");
    },
    selectData(keywords) {
      this.$http
        .get(`/search?keywords=${keywords}&type=1018`)
        .then(({ data }) => {
          // 音乐
          this.$emit("update:initLoad", true);
          let songData = data.result.song.songs;
          songData.forEach(item => {
            let title = item.name;
            if (item.alia[0]) {
              title += `(${item.alia[0]})`;
            }

            let label = item.ar
              .reduce((target, item) => {
                target.push(item.name);
                return target;
              }, [])
              .join("/");

            if (item.al.name) {
              label += ` - ${item.al.name}`;
            }

            Object.assign(item, { title, label });
          });

          this.songData = data.result.song;
          // 歌单
          this.playListData = data.result.playList || {};

          this.playListData.playlists = this.playListData.playLists || false;

          // 视频
          this.video = data.result.video;

          // 歌手
          this.artist = data.result.artist;
          this.$emit("update:initLoad", false);
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  },
  watch: {
    keywords: {
      handler(to) {
        Object.assign(this.$data, this.$options.data());
        this.selectData(to);
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
</style>