<template>
  <button class="round" @click="submit">
    <slot name="icon"></slot>
  </button>
</template>

<script>
export default {
  name: "btnRound",
  props: {
    icon: String
  },
  methods:{
    submit(){
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.round {
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  justify-content: center;
  align-content: center;
  background: bottom;
  border-radius: 10rem;
  border: 1px solid #fff;
}
i {
  font-size: 1rem;
  color: #fff;
}
</style>
