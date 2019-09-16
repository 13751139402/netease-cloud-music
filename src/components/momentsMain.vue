<script>
export default {
  props: ["data"],
  render: function(createElement) {
    let container = false,
      data = this.data,
      children = [],
      picLen = false;
    if (data.pics.length) {
      container = `containerPic`;
      picLen = `pic_${data.pics.length}`;
      children = data.pics.map(item => {
        return createElement("img", {
          attrs: {
            src: `${item.rectangleUrl}?param=100y100`
          }
        });
      });
    }
    return createElement(
      "figure",
      {
        class: {
          [container]: container,
          [picLen]: picLen
        }
      },
      children
    );
  },
  mounted() {
    console.log(this.data);
  }
};
</script>

<style scoped>
.containerPic {
  display: grid;
  grid-gap: 5px;
  justify-items: center;
  align-items: center;
  width: 100%;
}
.containerPic > img {
  border-radius: 5px;
  width: 100%;
}
.pic_1,
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
</style>