<template>
<section id="playList">
  <img :src="playlist.pic" id="background" />
  <modHead title="歌单" style="color:#fff;position: fixed;z-index:999">
    <div slot="right">
      <van-icon name="search" style="margin-right:10px" />
      <van-icon name="more-o" />
    </div>
  </modHead>
  <main id="container" @scroll="scrollBottom" ref="container">
    <figure id="details" ref="details">
      <div id="details_img">
        <figure style="position: relative;">
          <img :src="playlist.pic" id="details_cover" />
          <div id="playCount">
            <van-icon name="play-circle-o" style="margin-right: 2px;" />
            <span>{{playlist.playCount}}</span>
          </div>
        </figure>
        <div id="details_title">
          <span style="font-weight: bold;">{{playlist.name}}</span>
          <figure id="details_title_1">
            <img :src="playlist.nickname&&playlist.nickname.pic" id="details_title_head" />
            <span>{{playlist.nickname&&playlist.nickname.name}}</span>
            <van-icon name="arrow" />
          </figure>
        </div>
      </div>
      <ul id="control">
        <li @click="linkComm">
          <van-icon name="close" />
          <span>评论</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>分享</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>下载</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>多选</span>
        </li>
      </ul>
    </figure>
    <figure id="list">
      <!-- <div id="vipWarn">
        <div id="vipWarn_display">
          <van-icon name="close" style="width: 0.7rem;" />
          <span>含7首VIP专享歌曲</span>
        </div>
        <div id="vipWarn_1">
          <span id="vipWarn_2">开通VIP畅想海量曲...</span>
          <van-icon name="close" />
        </div>
      </div>-->
      <div id="list_container">
        <head id="list_title">
          <div style="width:.7rem">
            <van-icon name="close" />
          </div>
          <span>播放全部</span>
          <span>(共{{playlist.trackCount}}首)</span>
        </head>
        <main id="list_main" ref="list" @scroll="scrollTop">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <van-cell v-for="(item,index) in list" :key="item.id" @click="linkMusic(item.id)">
              <div slot="icon" class="listNum">{{index+1}}</div>
              <div slot="title" class="listTtitle">{{item.name}}</div>
              <div slot="label" class="listLabel">{{item.details}}</div>
              <div slot="default" class="listValue">
                <van-icon name="close" style="margin-right:.1rem" />
                <van-icon name="close" />
              </div>
            </van-cell>
          </van-list>
        </main>
      </div>
    </figure>
  </main>
</section>
</template>

<script>
import { NavBar, Icon, Cell, CellGroup, List } from "vant";
import modHead from "../../components/head";
import { referee } from "../../assets/common";
export default {
  data() {
    return {
      data: [],
      list: [],
      loading: false,
      finished: false,
      dataLen: 0,
      playlist: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.userData;
    },
    playListId() {
      return this.$store.state.playListId;
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [List.name]: List,
    modHead
  },
  methods: {
    selectPlayList() {
      let num = num => {
        if (num < 100000) {
          return num;
        } else if (100000 < num && num < 100000000) {
          return `${Math.floor(num / 100000)}万`;
        } else {
          return `${(num / 100000000).toFixed(1)}亿`;
        }
      };
      this.list = [];
      this.$http
        .get(`/playlist/detail?id=${this.playListId}`)
        .then(response => {
          let playlist = response.data.playlist;
          this.playlist = {
            nickname: {
              id: playlist.creator.userId,
              name: playlist.creator.nickname,
              pic: playlist.creator.avatarUrl
            },
            name: playlist.name.replace(this.user.nickname, "我"),
            playCount: num(playlist.playCount),
            trackCount: playlist.trackCount,
            pic: playlist.coverImgUrl
          };
          this.data = response.data.privileges;
          this.dataLen = this.data.length;
          this.onLoad();
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    scrollBottom(event) {
      let el = event.target;
      let percent = el.scrollTop / (el.scrollHeight - el.clientHeight);
      if (percent > 0.7) {
        this.$refs.details.style.opacity = 1 - percent;
      } else {
        this.$refs.details.style.opacity = 1;
      }
      if (percent >= 0.99) {
        this.$refs.list.style.overflowY = "auto";
        this.$refs.container.style.overflowY = "hidden";
      }
    },
    scrollTop(event) {
      let el = event.target;
      if (el.scrollTop === 0) {
        this.$refs.list.style.overflowY = "hidden";
        this.$refs.container.style.overflowY = "auto";
      }
    },
    onLoad() {
      let item = this.data;
      let params = item
        .reduce((target, item) => {
          target.push(item.id);
          return target;
        }, [])
        .join(",");

      this.$http
        .get(`/song/detail?ids=${params}`)
        .then(response => {
          let data = response.data.songs;
          let list = data.reduce((target, item) => {
            // 处理作者
            let autors = item.ar;
            let details = autors
              .reduce((target, item) => {
                target.push(item.name);
                return target;
              }, [])
              .join("/");
            // 处理专辑
            if (item.al) {
              details += ` - ${item.al.name}`;
            }
            // 整合歌曲数据
            target.push({
              id: item.id,
              name: item.name,
              author: item.ar,
              details
            });
            return target;
          }, []);
          this.list.push(...list);
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= this.dataLen) {
            this.finished = true;
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    linkComm() {
      let data = {
        id: this.playListId, //评论id
        name: this.playlist.name, //评论名称
        artists: [this.playlist.nickname], //作者
        type: 2, //类型 歌单
        pic: this.playlist.pic
      };
      this.$store.commit("commentData", data);
      this.$router.push("comment");
    },
    linkMusic(id) {
      this.$store.commit("playList", this.list);
      this.$store.dispatch("selectMusic", id);
      //this.$router.push("/music");
    }
  },
  created() {
    this.scrollTop = referee.debounce(this.scrollTop, 100);
    this.selectPlayList();
  },
  watch: {
    playListId() {
      this.selectPlayList();
    }
  },
  activated() {
    let container = this.$refs.container,
      detail = this.$refs.details;
    //list = this.$refs.list;
    if (container.style.overflowY === "hidden") {
      container.scrollTop = container.scrollHeight - container.clientHeight;
    } else {
      detail.style.opacity = 1;
    }
  }
};
</script>

<style scoped>
#playList {
  height: 100%;
  background: gray;
}
#background {
  background: no-repeat center/100% 100%;
  filter: blur(50px);
  position: fixed;
}
#container {
  position: fixed;
  width: 100;
  height: 100%;
  width: 100%;
  padding-top: 1.2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
#details {
  height: 30%;
  display: flex;
  flex-direction: column;
  font-size: 0.5rem;
  color: #fff;
  padding: 0.3rem 0.5rem;
  transition: all 0.1s;
}
#details_img {
  display: flex;
}
#details_cover {
  height: 3rem;
  border-radius: 5px;
}
#details_title {
  padding-left: 0.3rem;
  flex: 1;
}
#details_title_1 {
  font-size: 0.2rem;
  display: flex;
  color: #d7d6d4;
  align-items: center;
  margin-top: 0.3rem;
}
#details_title_head {
  height: 0.8rem;
  border-radius: 50%;
  margin-right: 5px;
}
#control {
  font-size: 0.7rem;
  display: flex;
  margin-top: 0.2rem;
  justify-content: space-around;
}
#control > li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#control > li > span {
  font-size: 0.4rem;
  padding-top: 0.2rem;
  color: #bcbbba;
}
#list {
  background: #fff;
  border-radius: 20px 20px 0 0;
  font-size: 0.5rem;
  background: #d6d6d5;
  display: flex;
  flex-direction: column;
}
.listNum {
  display: flex;
  align-items: center;
  width: 1.2rem;
  font-size: 0.4rem;
  justify-content: center;
}
.listTtitle {
  font-size: 0.45rem;
  width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.listLabel {
  font-size: 0.3rem;
  width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.listValue {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.6rem;
  height: 100%;
}
#vipWarn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.42667rem;
  color: #2a2a2a;
  background: #d6d6d5;
  border-radius: 0.53333rem 0.53333rem 0 0;
  font-size: 0.5rem;
}
#vipWarn_1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#vipWarn_2 {
  font-size: 0.3rem;
  overflow: hidden;
  width: 3rem;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#list_title {
  border-radius: 0.53333rem 0.53333rem 0 0;
  padding: 0.3rem 0.42667rem;
  display: flex;
  align-items: center;
  background: #fff;
  height: 1rem;
  box-sizing: border-box;
}
#list_container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
#vipWarn_display {
  display: flex;
}
#list_main {
  background: #fff;
  height: calc(100vh - 2.2rem);
  overflow-y: hidden;
}
#playCount {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;
  font-size: 10px;
}
</style>
<style>
#playList .van-cell {
  padding: 0.26667rem 0.42667rem 0.26667rem 0;
}
</style>