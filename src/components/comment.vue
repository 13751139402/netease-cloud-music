<template>
<section>
  <head :class="{height:title1}">
    <slot name="title">
      <span>{{title1}}</span>
    </slot>
  </head>
  <main>
    <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
      <figure class="commItem" v-for="item in data1" :key="item.commentId">
        <head>
          <img :src="`${item.user.avatarUrl}?param=50y50`" class="commImg" />
        </head>
        <main class="commMain">
          <div class="commHead">
            <figcaption class="commTitle">
              <span class="commName">{{item.user.nickname}}</span>
              <span class="commTime" v-time="item.time"></span>
            </figcaption>
            <div class="commLike">
              <span class="commLikeNum" v-if="item.likedCount">{{item.likedCount}}</span>
              <van-icon name="good-job" v-if="item.liked" style="color:red" />
              <van-icon name="good-job-o" v-else />
            </div>
          </div>
          <div class="text">{{item.content}}</div>
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
  props: {
    data: Array,
    title: String,
    total: {type:Number,default:0}
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
            item.likedCount = fixed === "0" ? `${num}万` : `${num}.${fixed}万`;
          }
        });
      return this.data;
    }
  },
  mixins: [mixins],
  methods: {
    onLoad() {
      this.$emit("commLoad");
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
.height {
  height: 1.2rem;
}
figure > head {
  height: 1.2rem;
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
  font-size: 0.4rem;
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
  /* display: flex; */
  align-items: center;
  justify-content: center;
  font-size: 0.4rem;
  color: #9c9c9c;
}
.text {
  color: #3b3b3b;
  font-size: 0.42rem;
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