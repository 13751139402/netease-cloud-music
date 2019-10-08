<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-09-24 08:43:02
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-08 16:18:01
 -->
<template>
  <section class="searchCell" v-if="cellData">
    <van-cell-group :title="typeName" :border="false">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :immediate-check="false"
        error-text="请求失败，点击重新加载"
      >
        <template v-if="type==='songs'">
          <van-cell
            :title="item.title"
            v-for="item in cellData"
            :key="item.id"
            @click="submit(item.id)"
          >
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
        <template v-else-if="type==='playlists'">
          <ul>
            <li
              v-for="item in cellData"
              :key="item.id"
              class="playList_item"
              @click="submit(item.id)"
            >
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
        <template v-else-if="type==='videos'" @click="submit(item.id)">
          <ul>
            <li v-for="item in cellData" :key="item.vid" class="playList_item">
              <div class="imgContainer">
                <img :src="item.coverUrl" class="playList_img" style="width:3.5rem" />
                <p class="videos_playTime">
                  <van-icon name="play-circle-o" />
                  <span>{{item.playTime|lookNumAbbr}}</span>
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
        <div class="moreText" v-if="finished&&moreText" @click="moreSubmit">
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
  playlists: "歌单",
  videos: "视频",
  artists: "歌手"
};
import mixins from "@/assets/mixins.js";
import { Cell, CellGroup, Icon, List } from "vant";
export default {
  mixins: [mixins],
  props: {
    data: {
      default: false
    },
    type: {
      type: String
    },
    error: {
      type: Boolean
    },
    dataLen: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      pageNum: 1,
      limit: 30
    };
  },
  methods: {
    onLoad() {
      this.$emit("load", {
        type: this.type,
        pageNum: ++this.pageNum,
        limit: this.limit
      });
      if (this.data[this.type].length >= this.dataLen) {
        this.finished = true;
      }
    },
    submit(id) {
      this.$emit("submit", id);
    },
    moreSubmit(id) {
      this.$emit("moreSubmit", id);
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
    },
    ifSynthesize() {
      return this.moreText ? false : "没有更多了";
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [List.name]: List
  },
  watch: {
    cellData() {
      this.loading = false;
    }
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
  height: 2rem;
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
  top: 4px;
  right: 4px;
  font-size: 0.3rem;
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
  width: 2rem;
  height: 2rem;
}
.artist_name {
  border-radius: 50px;
  margin-right: 10px;
}
</style>