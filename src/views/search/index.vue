<template>
<section id="search">
  <head>
    <div id="left" @click="left">
      <van-icon name="arrow-left" />
    </div>
    <div id="head_main">
      <form action="/">
        <van-search
          :placeholder="place"
          v-model="keywords"
          left-icon
          :learable="false"
          :clearable="false"
          @input="changeValue"
          @search="searchData"
        />
      </form>
    </div>
    <div id="right">
      <slot name="right">
        <van-icon name="more-o" />
      </slot>
    </div>
    <section class="suggest" v-show="showSuggest">
      <head class="searchBtn" @click="searchData(keywords)">搜索"{{keywords}}"</head>
      <ul>
        <li v-for="(item,index) in suggest" :key="index" @click="searchData(item.keyword)">
          <van-icon name="search" />
          <span>{{item.keyword}}</span>
        </li>
      </ul>
    </section>
  </head>
  <main>
    <router-view></router-view>
  </main>
</section>
</template>

<script>
import { Icon, Search } from "vant";
export default {
  data() {
    return {
      keywords: "",
      place: "",
      suggest: [],
      showSuggest: false
    };
  },
  props: ["title"],
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search
  },
  methods: {
    left() {
      if (this.$listeners.left) {
        this.$emit("left");
      } else {
        this.$router.go(-1);
      }
    },
    serachPlace() {
      this.$http
        .get("search/default")
        .then(response => {
          this.place = response.data.data.showKeyword;
        })
        .catch(error => {
          console.error(error);
        });
    },
    changeValue(value) {
      if (value === "") {
        this.showSuggest = false;
        this.suggest = [];
        return;
      }
      this.showSuggest = true;
      this.$http
        .get(`search/suggest?keywords= ${value}&type=mobile`)
        .then(response => {
          this.suggest = response.data.result.allMatch;
        })
        .catch(error => {
          console.error(error);
        });
    },
    searchData(value) {
      this.$store.commit("keywords", value);
      this.showSuggest = false;
    }
  },
  created() {
    this.serachPlace();
  }
};
</script>

<style scoped>
head {
  height: 1.2rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  padding: 0 0.2rem;
}
#head_main {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 0.45rem;
  position: relative;
}
.searchBtn {
  color: #507daf;
  height: 1.2rem;
  line-height: 1.2rem;
  padding: 0 0.4rem;
}
.suggest {
  width: 85%;
  left: 0.2rem;
  right: 0;
  position: absolute;
  top: 1.2rem;
  border: 0.02667rem solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0.26667rem 0.02667rem rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  font-size: 0.45rem;
  z-index: 99;
  background: #fff;
}
li {
  height: 1.2rem;
  display: flex;
  align-items: center;
  border-top: 1px solid;
  padding: 0 0.4rem;
  border-top: 1px solid #e6e6e6;
}
li > span {
  margin-left: 0.2rem;
}
form {
  width: 100%;
}
</style>
<style>
#search .van-search {
  width: 100%;
}
#search .van-search__content {
  border-bottom: 1px solid #c1c1c1;
  background-color: transparent;
}
</style>