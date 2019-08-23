<template>
  <div id="app">
    <section id="shade">
      <title>音乐的力量</title>
      <footer>
        <i class="iconfont icon-wangyiyunyinle"></i>
        网易云音乐</footer>
    </section>
    <router-view />
  </div>
</template>
<style>
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#shade {
  position: absolute;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  color: #ffffff;
  background: #db2c1f;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: space-between;
}
title {
  display: block;
  font-size: 2rem;
  margin-top: 40%;
  letter-spacing: 8px;
}
footer {
  font-size: 0.5rem;
}
</style>
