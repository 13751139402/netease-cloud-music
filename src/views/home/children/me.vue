<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-26 13:12:55
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-11 12:04:22
 -->
<template>
  <section id="me">
    <figure id="module" @touchstart.stop @touchend.stop @touchmove.stop>
      <ul>
        <li v-for="(item,index) of navBar" :key="index">
          <van-icon class-prefix="icon" :name="item.icon" class="van-grid-item__icon" />
          <span>{{item.text}}</span>
        </li>
      </ul>
    </figure>
    <figure id="column">
      <van-cell-group :border="false">
        <van-cell>
          <van-icon class-prefix="icon" name="bendiyinle" slot="icon" class="iconStyle"></van-icon>
          <p>
            <span>本地音乐</span>
            <span class="cellNum">(331)</span>
          </p>
        </van-cell>
        <van-cell>
          <van-icon class-prefix="icon" name="zuijinbofang" slot="icon" class="iconStyle"></van-icon>
          <p>
            <span>最近播放</span>
            <span class="cellNum">(143)</span>
          </p>
        </van-cell>
        <van-cell>
          <van-icon class-prefix="icon" name="xiazaipt" slot="icon" class="iconStyle"></van-icon>
          <p>
            <span>下载管理</span>
            <span class="cellNum">(331)</span>
          </p>
        </van-cell>
        <van-cell>
          <van-icon class-prefix="icon" name="wodediantai" slot="icon" class="iconStyle"></van-icon>
          <p>
            <span>我的电台</span>
            <span class="cellNum">(0)</span>
          </p>
        </van-cell>
        <van-cell>
          <van-icon class-prefix="icon" name="wodeshoucang" slot="icon" class="iconStyle"></van-icon>
          <p>
            <span>我的收藏</span>
            <span class="cellNum">(14)</span>
          </p>
        </van-cell>
      </van-cell-group>
    </figure>
    <figure id="list">
      <transition appear name="fade">
        <van-collapse v-model="activeNames">
          <van-collapse-item name="1">
            <p slot="title" class="listTitle">
              <span class="bold">创建的歌单</span>
              <span class="cellNum">({{subCount.createdPlaylistCount}})</span>
            </p>
            <div slot="value" class="listValue">
              <van-icon name="plus" style="margin-right:5px" />
              <van-icon class-prefix="icon" name="caidan-dian" color="#323233" />
            </div>
            <van-cell
              icon="shop-o"
              v-for="{id,coverImgUrl,name,trackCount} in createdPlaylist"
              :key="id"
              :border="false"
              @click="linkPlayList(id)"
            >
              <img :src="`${coverImgUrl}?param=100y100`" slot="icon" class="listImg" />
              <p slot="title" class="iconTitle">
                <span class="iconTitleName">{{name}}</span>
                <span class="iconDes">{{trackCount}}首</span>
              </p>
              <template #right-icon>
                <van-icon class-prefix="icon" name="caidan-dian" />
              </template>
            </van-cell>
          </van-collapse-item>
          <van-collapse-item name="2">
            <p slot="title" class="listTitle">
              <span class="bold">收藏的歌单</span>
              <span class="cellNum">({{subCount.subPlaylistCount}})</span>
            </p>
            <div slot="value" class="listValue">
              <van-icon class-prefix="icon" name="caidan-dian" color="#323233" />
            </div>
            <van-cell
              icon="shop-o"
              v-for="{id,coverImgUrl,name,trackCount} in subPlaylist"
              :key="id"
              :border="false"
              @click="linkPlayList(id)"
            >
              <img :src="`${coverImgUrl}?param=100y100`" slot="icon" class="listImg" />
              <p slot="title" class="iconTitle">
                <span class="iconTitleName">{{name}}</span>
                <span class="iconDes">{{trackCount}}首</span>
              </p>
              <template #right-icon>
                <van-icon class-prefix="icon" name="caidan-dian" />
              </template>
            </van-cell>
          </van-collapse-item>
        </van-collapse>
      </transition>
    </figure>
  </section>
</template>

<script>
import {
  Icon,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Grid,
  GridItem
} from "vant";
export default {
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  data() {
    return {
      activeNames: ["1", "2"],
      createdPlaylist: [],
      subPlaylist: [],
      subCount: {
        createdPlaylistCount: 0,
        subPlaylistCount: 0
      },
      navBar: [
        { icon: "bijiben", text: "云村正能量" },
        { icon: "paobu", text: "跑步FM" },
        { icon: "jiashi", text: "驾驶模式" },
        { icon: "yejianmoshi", text: "Sati空间" },
        { icon: "zhibo", text: "私人FM" },
        { icon: "-rili", text: "私藏推荐" },
        { icon: "gedan", text: "最新电音" }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.userData;
    }
  },
  methods: {
    selectPlayList() {
      this.$http
        .get(`/user/playlist?uid=${this.user.userId}`)
        .then(response => {
          let listData = response.data.playlist;
          listData[0].name = listData[0].name.replace(this.user.nickname, "我");
          listData[1].name = listData[1].name.replace(this.user.nickname, "我");
          this.createdPlaylist = listData.splice(0, 4);
          this.subPlaylist = listData;
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    selectSubCount() {
      this.$http
        .get(`user/subcount`)
        .then(response => {
          this.subCount.createdPlaylistCount =
            response.data.createdPlaylistCount;
          this.subCount.subPlaylistCount = response.data.subPlaylistCount;
          this.selectPlayList();
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    linkPlayList(id) {
      this.$store.commit("playListId", id);
      this.$router.push("/playList");
    }
  },
  watch: {
    user: {
      handler() {
        this.user && this.selectSubCount();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.icon-caidan-dian {
  font-size: 0.4rem;
  color: #999;
}
.iconStyle {
  font-size: 0.6rem;
  margin-right: 10px;
}
.vanGrid {
  color: #ff4747;
}
.van-grid-item__icon {
  font-size: 0.74667rem;
  padding: 10px;
  border-radius: 50%;
  background: linear-gradient(to left, #ff1d12, #ff5a4c);
  font-size: 0.5rem;
  color: #fff;
  margin-bottom: 2px;
}
#me {
  padding-bottom: 7vh;
}
figure {
  display: flex;
  width: 100%;
}
#module {
  overflow-x: auto;
  padding: 0.3rem 0;
  border-bottom: 1px solid #f3f3f3;
}
ul {
  display: flex;
  font-size: 0.8rem;
  padding: 0 5px;
}
ul > li {
  display: flex;
  flex-direction: column;
  padding: 0.1rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
}
li > span {
  font-size: 0.3rem;
  margin-top: 0.1rem;
  color: #999;
}
figure > div {
  flex: 1;
}
.cellNum {
  margin-left: 0.1rem;
  font-size: 0.3rem;
  color: #999999;
}
#column {
  border-bottom: 0.25rem solid #f5f5f5;
}
.bold {
  font-weight: bold;
  font-size: 0.4rem;
}
.listTitle {
  margin-left: 25px;
}
.listValue {
  font-size: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  color: #323233;
}
.listImg {
  height: 1.2rem;
  border-radius: 5px;
}
.iconTitle {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  font-size: 0.4rem;
}
.iconDes {
  font-size: 0.3rem;
  color: #808080;
}
.iconTitleName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 7rem;
}
</style>
<style>
#column .van-cell__left-icon {
  margin-right: 0.3rem;
  font-size: 0.7rem;
}
#list .van-cell__right-icon {
  position: absolute;
}
#list .van-collapse-item__wrapper .van-cell {
  padding: 0.15rem 0;
  display: flex;
  align-items: center;
  font-size: 0.5rem;
}
</style>