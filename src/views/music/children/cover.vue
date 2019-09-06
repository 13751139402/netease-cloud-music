<template>
  <section id="cover" @click="linkRouter">
    <figure id="stylus" :class="{ stylusOn: play}">
      <div id="stylus_1"></div>
      <div id="stylus_2"></div>
    </figure>
    <div id="coverContent">
      <figure id="coverContainer" :class="{coverOn : play}">
        <img :src="`${pic}?param=150y150`" id="coverPic" />
        <div id="CD"></div>
      </figure>
    </div>
    <article>
      <van-icon name="like-o" />
      <van-icon name="upgrade" />
      <van-icon name="close" />
      <van-icon name="chat-o" @click="linkComment"/>
      <van-icon name="more-o" />
    </article>
  </section>
</template>

<script>
import { Icon } from "vant";
export default {
  data() {
    return {};
  },
  computed: {
    play() {
      return this.$store.state.audio.type;
    },
    pic() {
      return this.$store.state.playData.pic;
    }
  },
  methods: {
    linkRouter() {
     this.$parent.open=false;
    },
    linkComment(){
      this.$router.push("/songComment")
    }
  },
  components: {
    [Icon.name]: Icon
  }
};
</script>

<style scoped>
#cover {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
#coverContent {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
#coverContainer {
  width: 8.5rem;
  height: 8.5rem;
  position: relative;
  animation: cover 8s linear infinite;
  animation-play-state: paused;
}
.coverOn {
  animation-play-state: running !important;
}
@keyframes cover {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes cover /*Safari and Chrome*/ {
  from {
    transform: rotate(0deg);
    color: white;
  }
  to {
    transform: rotate(360deg);
  }
}

article {
  height: 10%;
  display: flex;
  margin: 0 1.5rem;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
}
#CD {
  background: url("~imgs/coverall.png") no-repeat center / 100%;
  width: 8.5rem;
  height: 8.5rem;
  position: absolute;
}
#coverPic {
  height: 5.5rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

#stylus {
  position: absolute;
  width: 7.5rem;
  height: 7.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  margin: -30% auto;
  z-index: 99;
  transition: all 0.3s linear;
  transform: rotate(-15deg);
}
.stylusOn {
  transform: rotate(13deg) !important;
}
#stylus_1 {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  border: 8px solid #fff;
  background: #e8e6e7;
  position: absolute;
  box-sizing: border-box;
  z-index: 9;
}
#stylus_2 {
  background: url("~imgs/stylus.png") no-repeat;
  background-size: 100%;
  width: 4.5rem;
  height: 4.5rem;
  position: absolute;
  margin-top: 26%;
  margin-left: 26%;
}
</style>