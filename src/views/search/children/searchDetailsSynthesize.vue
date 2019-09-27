<template>
  <section class="synthesize">
    <Cell :data="songData" type="songs"></Cell>
    <Cell :data="playListData" type="playLists"></Cell>
    <Cell :data="video" type="videos"></Cell>
    <Cell :data="artist" type="artists"></Cell>
  </section>
</template>

<script>
import Cell from "./searchCell";
export default {
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
    selectData(keywords) {
      this.$http
        .get(`/search?keywords=${keywords}&type=1018`)
        .then(({ data }) => {
          // 音乐
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
          this.playListData = data.result.playList;

          // 视频
          this.video = data.result.video;

          // 歌手
          this.artist = data.result.artist;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  watch: {
    keywords(to) {
      this.selectData(to);
    }
  }
};
</script>

<style scoped>
</style>