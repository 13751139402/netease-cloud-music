<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="selectVideo"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <figure v-for="item in videoList" :key="item.id" class="list_item">
        <div class="list_item_main">
          <video-components
            :videoId="item.id"
            :duration="item.duration"
            :coverUrl="item.cover"
            :playCount="item.playCount"
            videoType="mv"
            class="video-components"
          ></video-components>
        </div>
        <div class="list_item_titleContainer">
          <span class="list_item_titleContainer_title">{{item.name}}</span>
        </div>
      </figure>
    </van-list>
  </div>
</template>

<script>
import video from "@/components/video";
import mixins from "@/assets/mixins.js";
import { List } from "vant";
export default {
  components: {
    "video-components": video,
    [List.name]: List
  },
  mixins: [mixins],
  data() {
    return {
      videoList: [],
      pageNum: 1,
      limit: 5,
      loading: false, //是否正在加载
      finished: false, //是否加载完成
      error: false
    };
  },
  methods: {
    selectVideo() {
      this.$http
        .get(
          `/mv/all?offset=${(this.pageNum++ - 1) * this.limit}&limit=${
            this.limit
          }`
        )
        .then(({ data }) => {
          this.videoList.push(...data.data);
          console.log(this.videoList[0]);

          this.loading = false;
          this.error = false;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.list_item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-bottom: 0.2rem solid #e6e6e6;
  padding: 0.2rem;
}
.list_item_main {
  display: flex;
  justify-content: center;
  align-items: center;
}
.list_item_titleContainer {
  font-size: 15px;
  height: 0.8rem;
  width: 100%;
  display: flex;
  overflow: hidden;
  border-bottom: 0.02667rem solid #f5e3e3;
}
.list_item_titleContainer_title {
  text-overflow: ellipsis;
  align-items: center;
  white-space: nowrap;
  display: flex;
}
.video-components {
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
}
</style>