<template>
  <section id="searchDetails">
    <van-tabs swipeable v-model="active" sticky @change="changeTabs">
      <van-tab title="综合" name="synthesize">
        <synthesize></synthesize>
      </van-tab>
      <van-tab title="单曲" name="songs">
        <cell :data="songData" type="songs"></cell>
      </van-tab>
      <van-tab title="视频" name="videos">
        <cell :data="videoData" type="videos"></cell>
      </van-tab>
      <van-tab title="歌手" name="artist"></van-tab>
      <van-tab title="专辑" name="album"></van-tab>
    </van-tabs>
  </section>
</template>

<script>
import { Tab, Tabs } from "vant";
import cell from "./searchCell";
import synthesize from "../children/searchDetailsSynthesize";

let typeMap = {
  songs: 1
};
export default {
  data() {
    return {
      active: "synthesize",
      songData: "",
      videos: "",
      videoData: {}
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    synthesize,
    cell
  },
  computed: {
    keywords() {
      return this.$store.state.keywords;
    }
  },
  methods: {
    selectData(type) {
      return this.$http
        .get(`/search?keywords=${this.keywords}&type=${type}`)
        .then(({ data }) => {
          return data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleSongs(data) {
      let songData = data.result.songs;
      songData.forEach(item => {
        let title = item.name;
        if (item.alias[0]) {
          title += `(${item.alias[0]})`;
        }
        let label = item.artists
          .reduce((target, item) => {
            target.push(item.name);
            return target;
          }, [])
          .join("/");
        if (item.album.name) {
          label += ` - ${item.album.name}`;
        }
        Object.assign(item, { title, label });
      });
      return data.result;
    },
    async changeTabs(name) {
      if (!this.keywords) {
        return;
      }
      let data = await this.selectData(typeMap[name]);
      let type = name.charAt(0).toUpperCase() + name.slice(1);
      this.songData = this[`handle${type}`](data);
    }
  },
  watch: {
    // async keywords() {
    //   let song = await this.selectData(1);
    // }
  }
};
</script>

<style>
</style>