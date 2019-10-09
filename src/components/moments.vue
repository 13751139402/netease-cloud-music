<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-09-16 10:20:55
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-09 09:01:32
 -->
<template>
<section class="moments">
  <figure class="authorImg">
    <img :src="`${event.user.avatarUrl}?param=50y50`" class="authorImg_img" />
  </figure>
  <head class="author">
    <p>
      <span class="author_name">{{event.user.nickname}}</span>
      <span v-if="event.type" class="author_type">{{event.type}}:</span>
    </p>
    <p v-time="event.eventTime" class="author_time"></p>
  </head>
  <article class="article">
    <div class="msg" v-if="moments.msg">{{moments.msg}}</div>
    <momentsMain :data="event"></momentsMain>
  </article>
  <footer class="info">
    <div class="info_1">
      <div>
        <van-icon class-prefix="icon" name="zhuanfa" />
        <span>{{info.shareCount}}</span>
      </div>
      <div>
        <van-icon class-prefix="icon" name="pinglunpt" />
        <span>{{info.commentCount}}</span>
      </div>
      <div>
        <van-icon name="good-job-o" />
        <span>{{info.likedCount}}</span>
      </div>
    </div>
    <div>
      <van-icon class-prefix="icon" name="caidan-dian" />
    </div>
  </footer>
</section>
</template>

<script>
import mixins from "../assets/mixins";
import momentsMain from "./momentsMain";
import { Icon, ImagePreview } from "vant";
const momentsType = {
  22: "转发",
  39: "发布视频",
  18: "分享单曲",
  31: "分享评论",
  13: "分享歌单"
};
export default {
  components: {
    [Icon.name]: Icon,
    [ImagePreview.name]: ImagePreview,
    momentsMain
  },
  mixins: [mixins],
  props: ["data"],
  data() {
    return {
      event: this.data,
      moments: {},
      info: this.data.info
    };
  },
  created() {
    this.event.moments = this.moments = JSON.parse(this.event.json);
    this.event.type = momentsType[this.event.type];
  }
};
</script>

<style scoped>
.moments {
  border-top: 0.02667rem solid #e6e6e6;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.3rem;
  display: grid;
  grid-template-columns: 1rem auto;
  grid-template-rows: auto auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 0.2rem;
  grid-template-areas:
    "authorImg . "
    "authorImg . "
    "authorImg . ";
}
.authorImg {
  grid-area: authorImg;
}
.authorImg_img {
  width: 100%;
  border-radius: 50%;
}
.author {
  display: flex;
  flex-direction: column;
  height: 1.2rem;
  justify-content: space-evenly;
  font-size: 0.4rem;
}
.author_name {
  margin-right: 0.1rem;
  color: #507daf;
}
.author_type {
  color: #666666;
}
.author_time {
  color: #999999;
}
.article {
  color: #333333;
  font-size: 0.45rem;
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
}
.msg {
  margin-bottom: 0.26667rem;
  line-height: 0.64rem;
  width: 8rem;
}
</style>