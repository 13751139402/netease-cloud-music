<template>
  <section class="searchCell" v-if="cellData">
    <van-cell-group :title="typeName" :border="false">
      <van-list v-model="loading" :finished="finished" @load="onLoad1" :immediate-check="false">
        <template v-if="type==='songs'">
          <van-cell :title="item.title" v-for="item in cellData" :key="item.id">
            <span slot="label">
              <p>{{item.label}}</p>
              <p v-for="(al,index) in item.alia" :key="index">{{al}}</p>
            </span>
            <figure class="rightIcon" slot="right-icon">
              <!-- <van-icon name="video-o" style="margin-right:10px" /> -->
              <van-icon name="more-o" />
            </figure>
          </van-cell>
        </template>
        <template v-else-if="type==='playLists'">
          <ul>
            <li v-for="item in cellData" :key="item.id" class="playList_item">
              <div class="imgContainer">
                <img :src="`${item.coverImgUrl}?param=100y100`" class="playList_img" />
              </div>
              <div class="playList_detail">
                <p>{{item.name}}</p>
                <p
                  class="label"
                >{{`${item.trackCount}首 by ${item.creator.nickname}, 播放${item.playCount}`}}</p>
              </div>
            </li>
          </ul>
        </template>
        <template v-else-if="type==='videos'">
          <ul>
            <li v-for="item in cellData" :key="item.vid" class="playList_item">
              <div class="imgContainer">
                <img :src="item.coverUrl" class="playList_img" style="width:3.5rem" />
                <p class="videos_playTime">
                  <van-icon name="play-circle-o" />
                  <span>{{item.playTime}}</span>
                </p>
              </div>
              <div class="playList_detail">
                <p>{{item.title}}</p>
                <p class="label">{{`${item.durationms} by ${item.creator[0].userName}`}}</p>
              </div>
            </li>
          </ul>
        </template>
        <template v-else-if="type==='artists'">
          <ul>
            <li v-for="item in cellData" :key="item.id" class="playList_item">
              <div class="artist_container">
                <img
                  :src="`${item.picUrl?item.picUrl:item.img1v1Url}?param=70y70`"
                  class="artist_img"
                />
                <span class="artist_name">{{item.name}}</span>
                <span
                  class="artist_name"
                  style="color:#a7a7a7"
                  v-if="item.alias[0]"
                >({{item.alias[0]}})</span>
              </div>
              <div v-if="item.accountId" style="display: flex;">
                <van-icon name="user-circle-o" color="#f24a49" />
                <span style="color: #a3a3a3;margin-left:5px">已入驻</span>
              </div>
            </li>
          </ul>
        </template>
        <div class="moreText">
          <span>{{moreText}}</span>
          <van-icon name="arrow" />
        </div>
      </van-list>
    </van-cell-group>
  </section>
</template>

<script>
const typeMap = {
  songs: "单曲",
  playLists: "歌单",
  videos: "视频",
  artists: "歌手"
};
import { Cell, CellGroup, Icon, List } from "vant";
export default {
  props: {
    data: {
      default: false
    },
    type: {
      type: String
    },
    dataLen: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    onLoad1() {
      console.log(this.data[this.type].length >= this.dataLen);

      console.log("d我打的");
    }
  },
  computed: {
    finished() {
      return this.type ? this.data[this.type].length >= this.dataLen : false;
    },
    typeName() {
      return typeMap[this.type];
    },

    cellData() {
      return this.data[this.type];
    },
    moreText() {
      return this.data.moreText;
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [List.name]: List
  }
};
</script>

<style scoped>
.rightIcon {
  display: flex;
  align-items: center;
  font-size: 0.5rem;
  color: #b8b8b8;
}
.moreText {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.3rem;
  height: 1rem;
  color: #a0a0a0;
}
.playList_item {
  display: flex;
  align-items: center;
  font-size: 0.4rem;
  padding: 0.2rem 0.4rem;
}
.playList_img {
  border-radius: 5px;
  width: 2.5rem;
}
.imgContainer {
  margin-right: 10px;
  position: relative;
}
.playList_detail > p {
  margin: 10px 0;
}
.videos_playTime {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  color: #fff;
}
.label {
  color: #868686;
  font-size: 0.3rem;
}
.artist_container {
  flex: 1;
  display: flex;
  align-items: center;
}
.artist_img {
  border-radius: 50px;
  margin-right: 10px;
}
.artist_name {
  border-radius: 50px;
  margin-right: 10px;
}
</style>