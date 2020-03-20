<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}

html, body {
  .size;
  overflow: hidden;
  margin: 0;
  paddig: 0;
}

#app {
  .size;
}
</style>
