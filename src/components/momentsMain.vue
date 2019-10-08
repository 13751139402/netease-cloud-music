<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-09-16 17:11:33
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-08 16:15:44
 -->
<script>
import Vue from "vue";
import { ImagePreview } from "vant";
import video from "../components/video";
Vue.use(ImagePreview);
export default {
  props: ["data"],
  render: function(h) {
    let container = false,
      data = this.data,
      children = [],
      picLen = false;
    // 有图片则首先添加图片
    if (data.pics.length) {
      container = `containerPic`;
      picLen = `pic_${data.pics.length}`;

      let imgChildren = data.pics.map((item, index) => {
        return h("img", {
          attrs: {
            src: `${item.rectangleUrl}?param=100y100`
          },
          on: {
            click: this.openImagePreview(index)
          }
        });
      });

      children.push(
        h(
          "div",
          {
            class: {
              [container]: container,
              [picLen]: picLen
            }
          },
          imgChildren
        )
      );
    }
    switch (Object.keys(data.moments)[1]) {
      case "video": //视频
        (() => {
          const musicData = JSON.parse(this.data.json).video;
          children.push(
            h(video, {
              // 组件 prop
              props: {
                videoId: musicData.videoId,
                duration: musicData.durationms,
                coverUrl: musicData.coverUrl,
                playCount: musicData.playTime
              }
            })
          );
        })();
        break;
      case "song": // 音乐
        (() => {
          let { id, artists, alias, album, name } = data.moments.song,
            picUrl = `${album.blurPicUrl}?param=100y100`;
          artists = artists
            .reduce((target, { name }) => {
              target.push(name);
              return target;
            }, [])
            .join("/");
          alias = alias[0] ? alias[0] : name;
          children.push(
            <figure class="song" onclick={this.playMusic(id)}>
              <div class="song_img">
                <img src={picUrl}></img>
              </div>
              <p class="song_1">
                <span class="song_name">{alias}</span>
                <span class="song_artist">{artists}</span>
              </p>
            </figure>
          );
        })();
        break;
      case "playlist": // 歌单
        (() => {
          let { id, creator, name, coverImgUrl } = data.moments.playlist;
          coverImgUrl = `${coverImgUrl}?param=100y100`;
          creator = `by ${creator.nickname}`;
          children.push(
            <figure class="song" onclick={this.linkPlayList(id)}>
              <div class="song_img">
                <img src={coverImgUrl}></img>
              </div>
              <p class="song_1">
                <span class="song_name">{name}</span>
                <span class="song_artist">{creator}</span>
              </p>
            </figure>
          );
        })();
        break;
      default:
        break;
    }

    // 返回 虚拟dom
    return h(
      "figure",
      {
        class: "momentsItem"
      },
      children
    );
  },
  methods: {
    openImagePreview(index) {
      return () => {
        let images = this.data.pics.map(item => {
          return item.originUrl;
        });
        ImagePreview({
          images,
          loop: false,
          lazyLoad: true,
          startPosition: index
        });
      };
    },
    playMusic(id) {
      return () => {
        this.$store.dispatch("selectMusic", id);
        this.$router.push("music");
      };
    },
    linkPlayList(id) {
      return () => {
        this.$store.commit("playListId", id);
        this.$router.push("playList");
      };
    }
  },
  mounted() {}
};
</script>

<style scoped>
.song img {
  height: 100%;
  width: auto;
}
figure img {
  border-radius: 5px;
  width: 100%;
}
.containerPic {
  display: grid;
  grid-gap: 0.13333rem;
  justify-items: center;
  align-items: center;
  margin-bottom: 0.3rem;
}

.pic_1 {
  grid-template-columns: auto;
  height: 7rem;
}
.pic_2,
.pic_4 {
  grid-template-columns: auto auto;
}
.pic_8 {
  grid-template-columns: auto auto auto auto;
}
.pic_3,
.pic_6,
.pic_9 {
  grid-template-columns: auto auto auto;
  height: 8rem;
}
.pic_3 {
  height: 4rem !important;
}
.pic_5 {
  grid-template-columns: repeat(6, auto);
  grid-template-rows: repeat(2, auto);
  grid-template-areas:
    "a a a b b b"
    "c c d d e e";
}
.pic_7 {
  grid-template-columns: repeat(12, auto);
  grid-template-rows: repeat(2, auto);
  grid-template-areas:
    "a a a a b b b b c c c c"
    "d d d e e e f f f g g g";
}
.pic_5 > img:nth-child(1),
.pic_7 > img:nth-child(1) {
  grid-area: a;
}

.pic_5 > img:nth-child(2),
.pic_7 > img:nth-child(2) {
  grid-area: b;
}

.pic_5 > img:nth-child(3),
.pic_7 > img:nth-child(3) {
  grid-area: c;
}

.pic_5 > img:nth-child(4),
.pic_7 > img:nth-child(4) {
  grid-area: d;
}

.pic_5 > img:nth-child(5),
.pic_7 > img:nth-child(5) {
  grid-area: e;
}

.pic_5 > img:nth-child(6),
.pic_7 > img:nth-child(6) {
  grid-area: f;
}

.pic_5 > img:nth-child(7),
.pic_7 > img:nth-child(7) {
  grid-area: g;
}
.videoCover {
  width: 100%;
  height: 100%;
}
.momentsItem {
  display: flex;
  flex-direction: column;
}
.song {
  display: flex;
  height: 1.3rem;
  box-sizing: border-box;
  padding: 6px;
  background: #f3f3f3;
  border-radius: 5px;
}
.song_1 {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  justify-content: space-evenly;
}
.song_img {
  height: 100%;
  padding-right: 0.1rem;
}
.song_name {
  width: 6rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.song_artist {
  color: #898989;
  font-size: 0.2rem;
  width: 4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>