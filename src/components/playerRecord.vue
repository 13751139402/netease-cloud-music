<template>
<section id="Record">
  <van-popup v-model="show" round position="bottom" class="container" @close="closePopup">
    <head id="header">
      <div @click="changePlayType">
        <van-icon :name="currentPlay.icon" class-prefix="icon" style="margin-right: 2px;" />
        <span>{{currentPlay.name}}({{playList.length}})</span>
      </div>
      <div>
        <van-icon name="close" />收藏全部
        <van-icon name="close" />
      </div>
    </head>
    <van-list :finished="true" finished-text="没有更多了" style="margin-top:1rem">
      <van-cell
        v-for="(item,index) in playList"
        :key="item.id"
        :title="item.name"
        :class="{currentMusic:currentMusic===item.id}"
        @click="changePlayIndex(index)"
      >
        <span slot="label">{{item.details}}</span>
        <van-icon name="volume-o" v-show="currentMusic===item.id" slot="icon" />
        <van-icon slot="right-icon" name="cross" style="line-height: inherit;" />
      </van-cell>
    </van-list>
  </van-popup>
</section>
</template>

<script>
import { Popup, Icon, List, Cell } from "vant";

const playType = new Map([
  [0, { name: "列表循环", icon: "xunhuanbofang" }],
  [1, { name: "随机播放", icon: "suijibofang-wangyiicon" }],
  [2, { name: "单曲循环", icon: "danquxunhuan" }]
]);

function shuffle(arr) {
  let i = arr.length;
  arr = JSON.parse(JSON.stringify(arr));
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

export default {
  data() {
    return {
      show: this.isShow,
      currentPlay: {
        //0:列表循环 1:随机播放 2:单曲循环
        name: "列表循环",
        icon: "close"
      },
      randomMap: [] //随机播放的映射列表
    };
  },
  computed: {
    currentMusic() {
      let playData = this.$store.state.playData;
      return playData ? playData.id : false;
    },
    userData() {
      return this.$store.state.userData.userId;
    },
    isShow() {
      return this.$store.state.showRecord;
    },
    playList() {
      return this.$store.state.playList;
    },
    playIndex() {
      return this.$store.state.playIndex;
    },
    playTypeIndex() {
      return this.$store.state.playTypeIndex;
    }
  },
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [List.name]: List,
    [Cell.name]: Cell
  },
  methods: {
    changePlayIndex(index) {
      if (this.playTypeIndex === 1) {
        let musicId = this.playList[index].id;
        index = this.randomMap.findIndex(item => {
          return item.id === musicId;
        });
        this.$store.commit("playIndex", index);
      }
      this.$store.commit("playIndex", index);
    },
    selectList() {
      this.$http
        .get(`/user/record?uid=${this.userData}&type=1`)
        .then(response => {
          let temp = response.data.weekData;
          let list = temp.reduce((target, item) => {
            let song = item.song,
              details = [];
            let artists = song.ar.reduce((target, item) => {
              target.push({
                id: item.id,
                name: item.name
              });
              details.push(item.name);
              return target;
            }, []);
            details = details.join("/");
            target.push({
              id: song.id,
              name: song.name,
              pic: song.al.picUrl,
              artists,
              details
            });
            return target;
          }, []);
          this.$store.commit("playList", list);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    closePopup() {
      this.$store.commit("showRecord");
    },
    changePlayType() {
      this.$store.commit("changePlayTypeIndex");
    }
  },
  watch: {
    playIndex(to) {
      this.$store.dispatch(
        "selectMusic",
        this.playTypeIndex === 1 ? this.randomMap[to].id : this.playList[to].id
      );
    },
    isShow(to) {
      this.show = to;
    },
    userData() {
      this.userData && this.selectList();
    },
    playTypeIndex(to) {
      if (to === 1) {
        this.randomMap = shuffle(this.playList);
        let index = this.randomMap.findIndex(item => {
          return item.id === this.currentMusic;
        });
        this.$store.commit("playIndex", index);
      }
      this.currentPlay = playType.get(to);
    }
  },
  playList() {
    if (this.playTypeIndex === 1) {
      this.randomMap = shuffle(this.playList);
      let index = this.randomMap.findIndex(item => {
        return item.id === this.currentMusic;
      });
      this.$store.commit("playIndex", index);
    }
  }
};
</script>

<style scoped>
#Record {
  font-size: 0.4rem;
}
.container {
  height: 50%;
}
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.3rem;
  border-bottom: 0.02667rem solid #f5f6f7;
  position: fixed;
  width: 100%;
  height: 6vh;
  border-radius: 5px 5px 0 0px;
  z-index: 99;
  box-sizing: border-box;
  background: #fff;
}
#header > div {
  display: flex;
  align-items: center;
  height: 100%;
}
.currentMusic {
  color: #ff4747;
  display: flex;
  justify-content: center;
  align-items: center;
}
.currentMusic :first-child {
  margin-right: 0.1rem;
}
</style>
<style>
#Record .van-cell__title {
  display: flex;
  white-space: nowrap;
  width: 100%;
  width: 8rem;
  overflow: hidden;
  box-sizing: border-box;
  padding-right: 10px;
}
#Record .van-cell__title > span {
  margin-right: 5px;
  /* overflow: hidden; */
  white-space: nowrap;
  text-overflow: ellipsis;
}
#Record .van-cell__label {
  overflow: hidden;
}
#Record .van-cell__label > div {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>