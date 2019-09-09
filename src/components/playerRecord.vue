<template>
<section id="Record">
  <van-popup v-model="show" round position="bottom" class="container" @close="closePopup">
    <head id="header">
      <div>
        <van-icon name="close" />列表循环(31)
      </div>
      <div>
        <van-icon name="close" />收藏全部
        <van-icon name="close" />
      </div>
    </head>
    <van-list :finished="true" finished-text="没有更多了" style="margin-top:1rem">
      <van-cell
        v-for="(item,index) in list"
        :key="item.id"
        :title="item.name"
        :class="{currentMusic:currentMusic===item.id}"
        @click="playMusic(index)"
      >
        <van-icon name="volume-o" v-show="currentMusic===item.id" slot="icon" />
        <van-icon slot="right-icon" name="cross" style="line-height: inherit;" />
      </van-cell>
    </van-list>
  </van-popup>
</section>
</template>

<script>
import { Popup, Icon, List, Cell } from "vant";
export default {
  data() {
    return {
      show: this.isShow,
      list: []
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
    }
  },
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [List.name]: List,
    [Cell.name]: Cell
  },
  methods: {
    selectList() {
      this.$http
        .get(`/user/record?uid=${this.userData}&type=1`)
        .then(response => {
          let temp = response.data.weekData;
          this.list = temp.reduce((target, item) => {
            let song = item.song;
            let artists = song.ar.reduce((target, item) => {
              target.push({
                id: item.id,
                name: item.name
              });
              return target;
            }, []);
            target.push({
              id: song.id,
              name: song.name,
              pic: song.al.picUrl,
              artists: artists
            });
            return target;
          }, []);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    closePopup() {
      this.$store.commit("showRecord");
    },
    playMusic(index) {
      this.$store.dispatch("selectMusic", this.list[index]);
    }
  },
  watch: {
    isShow(to) {
      this.show = to;
    },
    userData() {
      this.selectList();
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
  padding: 0.3rem;
  border-bottom: 0.02667rem solid #f5f6f7;
  position: fixed;
  width: 100%;
  border-radius: 5px 5px 0 0px;
  z-index: 99;
  box-sizing: border-box;
  background: #fff;
}
#header > div {
  display: flex;
  align-items: center;
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