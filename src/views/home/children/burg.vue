<template>
  <section id="burg">
    <moments v-for="(item) in event" :key="item.id" :data="item"></moments>
  </section>
</template>

<script>
import moments from "../../../components/moments";
export default {
  components: { moments },
  data() {
    return { event: [] };
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    }
  },
  methods: {
    //event?pagesize=20&lasttime=-1
    selectData() {
      this.$http
        .get(`/user/event?uid=${this.userData.userId}`)
        .then(response => {
          this.event = response.data.events;
        });
    }
  },
  created() {
    this.selectData();
  }
};
</script>

<style scoped>
#burg {
  width: 100%;
  height: 100%;
}
</style>