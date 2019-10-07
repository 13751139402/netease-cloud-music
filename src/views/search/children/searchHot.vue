<template>
<section id="searchHot">
  <figure id="history">
    <head class="history_head">
      <span class="history_title">历史记录</span>
      <van-icon name="delete" color="#999999" style="font-size:.5rem" />
    </head>
    <main>
      <ul class="history_main">
        <li v-for="(item,index) in history" :key="index" @click="searchKeyWord(item)">
          <div>{{item}}</div>
        </li>
      </ul>
    </main>
  </figure>
  <figure id="hot">
    <head class="history_head">
      <span class="history_title">热搜榜</span>
    </head>
    <main>
      <van-cell
        v-for="(item,index) in hotList"
        :key="item.id"
        @click="searchKeyWord(item.searchWord)"
      >
        <div slot="icon" class="listNum">{{index+1}}</div>
        <div slot="title" class="listTtitle">{{item.content}}</div>
        <div slot="label" class="listLabel">{{item.searchWord}}</div>
        <div slot="default" class="listValue">{{item.score}}</div>
      </van-cell>
    </main>
  </figure>
</section>
</template>

<script>
import { cookie } from "@/assets/common";
import { Icon, Cell } from "vant";
export default {
  data() {
    return {
      hotList: [],
      history: []
    };
  },
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell
  },
  methods: {
    searchHot() {
      this.$http
        .get(`/search/hot/detail`)
        .then(({ data }) => {
          this.hotList = data.data;
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    searchKeyWord(keyWord) {
      this.$store.commit("keywords", keyWord);
      this.$router.push("details");
    }
  },
  mounted() {
    this.searchHot();
    let cookieHistory = cookie.getCookie("keywordsHistory");
    this.history = cookieHistory ? JSON.parse(cookieHistory) : [];
  }
};
</script>

<style scoped>
#searchHot {
  font-size: 0.4rem;
  padding: 5px 10px;
}
#history {
  margin: 20px 0px 30px 0;
}
.history_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.history_title {
  font-weight: 600;
}
.history_main {
  display: flex;
  overflow-x: auto;
  margin: 10px 0 15px;
  font-size: 0.4rem;
}
.history_main li {
  padding: 8px;
  margin: 0 5px;
  background: #f3f3f3;
  color: #313131;
  border-radius: 50px;
  white-space: nowrap;
}
#list {
  background: #fff;
  border-radius: 20px 20px 0 0;
  font-size: 0.5rem;
  background: #d6d6d5;
  display: flex;
  flex-direction: column;
}
.listNum {
  display: flex;
  align-items: center;
  width: 1.2rem;
  font-size: 0.5rem;
  justify-content: center;
}
.listTtitle {
  font-size: 0.45rem;
  width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.listLabel {
  width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.listValue {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.2rem;
  height: 100%;
}
#searchHot >>> .van-cell {
  padding: 0.26667rem 0.42667rem 0.26667rem 0;
}
main .van-cell:nth-child(1) .listNum,
main .van-cell:nth-child(2) .listNum,
main .van-cell:nth-child(3) .listNum {
  color: #ff3a3a;
}
</style>