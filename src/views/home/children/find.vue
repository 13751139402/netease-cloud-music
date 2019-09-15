<template>
  <section id="find">
    <div id="banner" @touchstart.stop @touchend.stop @touchmove.stop>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img v-lazy="item.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div id="navBar">
      <van-grid class="vanGrid" :border="false" :column-num="5">
        <van-grid-item
          v-for="(item,index) of navBar"
          :key="index"
          :icon="item.icon"
          :text="item.text"
        />
      </van-grid>
    </div>
    <van-divider style="margin:0" />
    <article style="padding:0 .3rem" id="content">
      <section id="recommendMusicList">
        <title>
          <h1>推荐歌单</h1>
          <van-button round type="default" size="small" >歌单广场</van-button>
        </title>
        <article>
          <musicContainer>
            <musicCover
              v-for="item in recommend"
              :key="item.id"
              :id="item.id"
              :pic="item.picUrl"
              :lookNum="item[countType]"
              :title="item.name"
              @click="linkPlayList(item.id)"
            ></musicCover>
          </musicContainer>
        </article>
      </section>
      <section id="newMusic">
        <van-tabs v-model="active" animated>
          <van-tab title="新碟">
            <musicContainer>
              <musicCover
                v-for="item in newdisk"
                :key="item.id"
                :id="item.id"
                :pic="item.blurPicUrl"
                :title="item.name"
              ></musicCover>
            </musicContainer>
          </van-tab>
          <van-tab title="新歌">
            <musicContainer>
              <musicCover
                v-for="(item) in newMusic"
                :key="item.id"
                :id="item.id"
                :pic="item.pic"
                :title="item.name"
                @click="playMusic(item.id)"
              >
                <van-icon name="play-circle-o" class="playMusic" />
              </musicCover>
            </musicContainer>
          </van-tab>
        </van-tabs>
        <!-- <van-button round type="default" size="small" class="newMusicBtn">更多新碟</van-button> -->
      </section>
    </article>
  </section>
</template>

<script>
import {
  Notify,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Divider,
  Button,
  Tab,
  Tabs,
  Icon
} from "vant";
import musicCover from "../../../components/musicCover";
import musicContainer from "../../../components/musicContainer";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Divider.name]: Divider,
    [Button.name]: Button,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    musicCover,
    musicContainer,
    [Icon.name]: Icon
  },
  data() {
    return {
      active: "",
      images: [],
      navBar: [
        { icon: "chat-o", text: "每日推荐" },
        { icon: "user-o", text: "歌单" },
        { icon: "photo-o", text: "排行榜" },
        { icon: "bullhorn-o", text: "电台" },
        { icon: "bullhorn-o", text: "直播" }
      ],
      recommend: [],
      newdisk: [],
      newMusic: []
    };
  },
  computed: {
    countType() {
      return this.recommend[0].playCount ? "playCount" : "playcount";
    }
  },
  methods: {
    selectBanner() {
      this.$http
        .get("/banner?type=2")
        .then(response => {
          this.images = response.data.banners;
        })
        .catch(error => {
          Notify({ type: "danger", message: `banner数据获取失败${error}` });
        });
    },
    selectRecommendMusicList() {
      let user = this.$store.state.userData;
      let url = user ? "/recommend/resource" : "/personalized?limit=6";
      this.$http
        .get(url)
        .then(response => {
          let temp = response.data;
          let data = temp.result ? temp.result : temp.recommend;
          data = data.slice(0, 6);
          this.recommend = data;
        })
        .catch(error => {
          Notify({
            type: "danger",
            message: `《推荐歌单》数据获取失败${error.response.data.msg}`
          });
        });
    },
    selectNewDisk() {
      this.$http.get("/top/album?offset=0&limit=3").then(response => {
        this.newdisk = response.data.albums;
      });
    },
    selectNewsong() {
      this.$http.get("/personalized/newsong").then(response => {
        let temp = response.data.result.slice(0, 3);
        temp.reduce((target, item) => {
          let { id, name, song } = item;
          let artists = song.artists.reduce((target, item) => {
            target.push({
              id: item.id,
              name: item.name
            });
            return target;
          }, []);
          target.push({
            id: id,
            name: name,
            pic: song.album.blurPicUrl,
            artists: artists
          });
          return target;
        }, this.newMusic);
      });
    },
    linkPlayList(id) {
      this.$store.commit("playListId", id);
      this.$router.push("/playList");
    },
    playMusic(id) {
      this.$store.dispatch("selectMusic", id);
    }
  },
  created() {
    this.selectBanner();
    this.selectRecommendMusicList();
    this.selectNewDisk();
    this.selectNewsong();
  }
};
</script>

<style scoped>
#find {
  width: 100%;
  height: 100%;
  background: #fff;
  padding-bottom: 2rem;
}
#banner {
  padding: 0.3rem 0.3rem 0;
}
.vanGrid {
  color: #ff4747;
}
h1 {
  font-size: 0.45rem;
  font-weight: bold;
}
title {
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  position: relative;
  display: block;
  display: flex;
}
</style>
<style>
#banner .van-swipe img {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 3.5rem;
  border-radius: 5px;
  background-color: #fff;
  pointer-events: none;
}
.van-grid-item__text {
  color: #777777;
}
.van-swipe {
  border-radius: 5px;
}
.newMusicBtn {
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 0.586665rem;
  transform: translateY(-50%);
}
#recommendMusicList {
  margin-bottom: 0.5rem;
}
.playMusic {
  position: absolute;
  right: 0.25rem;
  font-size: 0.7rem;
  top: 22vw;
  color: #fff;
}
</style>
<style>
#newMusic .van-tab {
  font-size: 0.4rem;
}
</style>