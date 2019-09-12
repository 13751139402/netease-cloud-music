<template>
<section>
  <head :class="{height:title1}">
    <slot name="title">
      <span>{{title1}}</span>
    </slot>
  </head>
  <main>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      finished-text="没有更多了"
      :immediate-check="false"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <figure class="commItem" v-for="(item,index) in data1" :key="item.commentId">
        <head class="commImgContainer">
          <img :src="`${item.user.avatarUrl}?param=50y50`" class="commImg" />
        </head>
        <main class="commMain">
          <div class="commHead">
            <figcaption class="commTitle">
              <span class="commName">{{item.user.nickname}}</span>
              <span class="commTime" v-time="item.time"></span>
            </figcaption>
            <div class="commLike" @click="like(index)" :class="{color:item.liked}">
              <span class="commLikeNum" v-if="item.likedCountMap">{{item.likedCountMap}}</span>
              <van-icon name="good-job" v-if="item.liked" />
              <van-icon name="good-job-o" v-else />
            </div>
          </div>
          <div class="text" v-html="item.content"></div>
        </main>
      </figure>
      <slot name="foot" slot="loading"></slot>
    </van-list>
  </main>
</section>
</template>

<script>
import { Icon, List } from "vant";
import mixins from "../assets/mixins";
export default {
  //   0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
  props: {
    data: Array,
    title: String,
    total: { type: Number, default: 0 }
  },
  components: {
    [Icon.name]: Icon,
    [List.name]: List
  },
  data() {
    return {
      title1: this.title,
      loading: false, //是否正在加载
      finished: false, //是否加载完成
      error: false,
      total1: this.total // 总数
    };
  },
  computed: {
    playData() {
      return this.$store.state.playData;
    },
    data1() {
      this.data &&
        this.data.forEach(item => {
          let count = item.likedCount;
          if (count > 100000) {
            let num = Math.floor(count / 10000);
            let fixed = String(count % 10000).slice(0, 1);
            item.likedCountMap =
              fixed === "0" ? `${num}万` : `${num}.${fixed}万`;
          } else {
            item.likedCountMap = count;
          }
          item.content = item.content.split("\n").join("<br />");
        });
      return this.data;
    }
  },
  mixins: [mixins],
  methods: {
    onLoad() {
      this.error = false;
      this.$emit("commLoad");
    },
    like(index) {
      let item = this.data[index];
      let { commentId, liked } = item;
      let { id, type } = this.playData;
      this.$http
        .get(
          `/comment/like?id=${id}&cid=${commentId}&t=${
            liked ? 0 : 1
          }&type=${type}`
        )
        .then(() => {
          item.liked = !liked;
          this.likedCountMap = item.liked
            ? item.likedCount++
            : item.likedCount--;
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
</script>

<style scoped>
section {
  padding: 0 0.4rem;
}
head {
  font-size: 0.5rem;
  font-weight: bold;
  align-items: center;
  display: flex;
  padding-right: 0.3rem;
  z-index: 99;
}
.color {
  color: rgb(255, 68, 68);
}
.height {
  height: 1.2rem;
}
figure > head {
  height: 1.2rem;
}
.commImgContainer {
  width: 1.2rem;
}
.commItem {
  display: flex;
  padding: 0.1rem 0;
  margin: 0;
}
.commImg {
  height: 0.9rem;
  border-radius: 50%;
}
.commTitle {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.commName {
  font-size: 0.35rem;
  color: #717171;
  padding-bottom: 0.1rem;
}
.commTime {
  font-size: 0.3rem;
  color: #b3b3b3;
}
.commHead {
  display: flex;
  height: 1.3rem;
  color: #a3a3a3;
  justify-content: space-between;
  margin-bottom: 0.1rem;
}
.commLike {
  align-items: center;
  justify-content: center;
  font-size: 0.3rem;
}
.text {
  color: #3b3b3b;
  font-size: 0.4rem;
  line-height: 0.65rem;
}
.commLikeNum {
  margin-right: 0.1rem;
}
.commMain {
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #e8e8e8;
  width: 100%;
}
.footer {
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>