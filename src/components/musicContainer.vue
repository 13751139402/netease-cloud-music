<template>
  <section class="musicContainer">
    <slot></slot>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.musicContainer {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  width: 100%;
}
</style>