<template>
  <section id="searchDetails">
    <van-tabs swipeable v-model="active" sticky @change="changeTabs">
      <loading-view :load="initLoading"></loading-view>
      <van-tab title="综合" name="synthesize">
        <synthesize :initLoad.sync="initLoading"></synthesize>
      </van-tab>
      <van-tab title="单曲" name="songs">
        <cell
          :data="songsData"
          type="songs"
          :dataLen="songsData&&songsData.songCount"
          @load="searchData"
          @submit="submitSongs"
        ></cell>
      </van-tab>
      <van-tab title="视频" name="videos">
        <cell
          :data="videosData"
          type="videos"
          :dataLen="videosData&&videosData.videoCount"
          @load="searchData"
        ></cell>
      </van-tab>
      <van-tab title="歌手" name="artists">
        <cell
          :data="artistsData"
          type="artists"
          :dataLen="artistsData&&artistsData.artistCount"
          @load="searchData"
        ></cell>
      </van-tab>
      <van-tab title="歌单" name="playlists">
        <cell
          :data="playlistsData"
          type="playlists"
          :dataLen="playlistsData&&playlistsData.playlistCount"
          @load="searchData"
          @submit="linkPlayList"
        ></cell>
      </van-tab>
    </van-tabs>
  </section>
</template>

<script>
import { Tab, Tabs } from "vant";
import cell from "./searchCell";
import mixins from "@/assets/mixins.js";
import synthesize from "../children/searchDetailsSynthesize";
import LoadingView from "@/components/LoadingView";
let typeMap = {
  songs: 1,
  videos: 1014,
  artists: 100,
  playlists: 1000
};
export default {
  mixins: [mixins],
  data() {
    return {
      active: "synthesize",
      songsData: {},
      videosData: {},
      artistsData: {},
      playlistsData: {},
      initLoading: true
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    synthesize,
    cell,
    "loading-view": LoadingView
  },
  computed: {
    keywords() {
      console.log(this.$store.state.keywords);

      return this.$store.state.keywords;
    }
  },
  methods: {
    linkPlayList(id) {
      this.$store.commit("playListId", id);
      this.$router.push("/playList");
    },
    selectData(type, offset) {
      return this.$http
        .get(`/search?keywords=${this.keywords}&type=${type}&offset=${offset}`)
        .then(({ data }) => {
          return data.result;
        })
        .catch(error => {
          console.error(error);
        });
    },
    submitSongs(id) {
      this.$store.dispatch("selectMusic", id);
      this.$router.push("/music");
    },
    handleSongs(data) {
      let songsData = data.songs;
      songsData &&
        songsData.forEach(item => {
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
      return data;
    },
    handleVideos(data) {
      return data;
    },
    handleVideos(data) {
      return data;
    },
    handleArtists(data) {
      return data;
    },
    handlePlaylists(data) {
      return data;
    },
    async searchData({ type, pageNum }) {
      let data = await this.selectData(typeMap[type], (pageNum - 1) * 30);
      let name = type.charAt(0).toUpperCase() + type.slice(1);
      if (!data) {
        this[`${type}Data`][type].length = this[`${type}Data`][
          `${type.split(0, type.length - 1)}Count`
        ];
        return;
      }
      let newArr = this[`handle${name}`](data)[type];
      this[`${type}Data`][type].push(...newArr);
    },
    async changeTabs(name) {
      this.initLoading = true;
      if (!(this.keywords && typeMap[name] && this[`${name}Data`])) {
        this.initLoading = false;
        return;
      }
      let data = await this.selectData(typeMap[name], 0);
      let type = name.charAt(0).toUpperCase() + name.slice(1);
      this[`${name}Data`] = this[`handle${type}`](data);
      this.initLoading = false;
    }
  },
  watch: {
    keywords(to) {
      Object.assign(this.$data, this.$options.data());
    }
  }
};
</script>

<style scoped>
#searchDetails >>> .van-tab__pane {
  min-height: 86.5vh;
}
.custom {
  width: 100%;
  height: 100%;
}
</style>