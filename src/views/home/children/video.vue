<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-26 13:13:24
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-09 11:41:20
 -->
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
      <transition-group appear name="van-fade">
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
          <footer class="info">
            <div>
              <div style="font-size: 0.4rem;">{{item.artistName}}</div>
            </div>
            <div class="btnContainer">
              <div>
                <van-icon name="good-job-o" />
                <span class="commit">500</span>
              </div>
              <div>
                <van-icon class-prefix="icon" name="pinglunpt1" />
                <span class="commit">20</span>
              </div>
              <div>
                <van-icon class-prefix="icon" name="caidan-dian" />
              </div>
            </div>
          </footer>
        </figure>
      </transition-group>
    </van-list>
  </div>
</template>

<script>
import video from "@/components/video";
import { Icon } from "vant";
import mixins from "@/assets/mixins.js";
import { List } from "vant";
export default {
  components: {
    "video-components": video,
    [List.name]: List,
    [Icon.name]: Icon
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
          this.loading = false;
          this.error = false;
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
</script>

<style scoped>
.btnContainer {
  justify-content: inherit;
  padding-left: 35%;
}
.info > div {
  flex: 1;
}
.commit {
  position: absolute;
  top: -0.13333rem;
  left: 74%;
  font-size: 0.2rem !important;
}
.list_item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-bottom: 0.2rem solid #e6e6e6;
  padding: 0.3rem;
  height: 7rem;
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
.info {
  display: flex;
  justify-content: space-between;
  font-size: 0.5rem;
  align-items: center;
  color: #666666;
  margin-top: 0.3rem;
}
.info_1 {
  display: flex;
  width: 60%;
  justify-content: inherit;
}
.info_1 span {
  color: #999999;
  font-size: 0.4rem;
}
.info div {
  display: flex;
  align-items: center;
  position: relative;
}
</style>