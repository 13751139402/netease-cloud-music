<script>
export default {
  props: ["data"],
  render: function(createElement) {
    let container = "",
      data = this.data;
    if (data.pics.length) {
      container = "containerPic";
    }
    return createElement(
      "figure",
      {
        class: container
      },
      ["控制"]
    );
  },
  mounted() {
    console.log(this.data);
  }
};
</script>

<style scoped>
.containerPic {
  background: red;
}
</style>