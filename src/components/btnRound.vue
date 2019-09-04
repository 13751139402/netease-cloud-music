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
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-content: center;
  background: bottom;
  border-radius: 10rem;
  border: 1px solid #fff;
}
i {
  font-size: .7rem;
  color: #fff;
}
</style>
