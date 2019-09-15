<template>
  <section id="me">
    <figure id="module" @touchstart.stop @touchend.stop @touchmove.stop>
      <ul>
        <li>
          <van-icon name="close" />
          <span>跑步FM</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>最新电音</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>驾驶模式</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>Sati空间</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>私人FM</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>私藏推荐</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>因乐交友</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>亲子频道</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>古典专区</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>爵士音乐</span>
        </li>
        <li>
          <van-icon name="close" />
          <span>编辑</span>
        </li>
      </ul>
    </figure>
    <figure id="column">
      <van-cell-group :border="false">
        <van-cell icon="location-o">
          <p>
            <span>本地音乐</span>
            <span class="cellNum">(331)</span>
          </p>
        </van-cell>
        <van-cell icon="location-o">
          <p>
            <span>最近播放</span>
            <span class="cellNum">(143)</span>
          </p>
        </van-cell>
        <van-cell icon="location-o">
          <p>
            <span>下载管理</span>
            <span class="cellNum">(331)</span>
          </p>
        </van-cell>
        <van-cell icon="location-o">
          <p>
            <span>我的电台</span>
            <span class="cellNum">(0)</span>
          </p>
        </van-cell>
        <van-cell icon="location-o">
          <p>
            <span>我的收藏</span>
            <span class="cellNum">(14)</span>
          </p>
        </van-cell>
      </van-cell-group>
    </figure>
    <figure id="list">
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <p slot="title" class="listTitle">
            <span class="bold">创建的歌单</span>
            <span class="cellNum">({{subCount.createdPlaylistCount}})</span>
          </p>
          <div slot="value" class="listValue">
            <van-icon name="plus" style="margin-right:5px" />
            <van-icon name="more-o" />
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
            <van-icon slot="right-icon" name="more-o" />
          </van-cell>
        </van-collapse-item>
        <van-collapse-item name="2">
          <p slot="title" class="listTitle">
            <span class="bold">收藏的歌单</span>
            <span class="cellNum">({{subCount.subPlaylistCount}})</span>
          </p>
          <div slot="value" class="listValue">
            <van-icon name="more-o" />
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
            <van-icon slot="right-icon" name="more-o" />
          </van-cell>
        </van-collapse-item>
      </van-collapse>
    </figure>
  </section>
</template>

<script>
import { Icon, Cell, CellGroup, Collapse, CollapseItem } from "vant";
export default {
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  data() {
    return {
      activeNames: ["1", "2"],
      createdPlaylist: [],
      subPlaylist: [],
      subCount: {
        createdPlaylistCount: 0,
        subPlaylistCount: 0
      }
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
        .get(`http://hsid.top:4000/user/subcount`)
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
  mounted() {
    this.user && this.selectSubCount();
  }
};
</script>

<style scoped>
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
  margin: 0.3rem 0;
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
  font-size: 0.2rem;
  margin-top: 0.1rem;
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
  font-size: 0.2rem;
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