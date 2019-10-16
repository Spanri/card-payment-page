<template>
  <div id="app-wrapper">
    <div id="app">
      <Nav></Nav>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: { 
    Nav: () => import("@/components/Nav"),
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: OpenSans-Bold;
  src: url(assets/fonts/OpenSans-Bold.ttf);
  src: url(assets/fonts/OpenSans-Bold.woff);
}

#app {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  font-size: 16px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 0;
  font-family: 'OpenSans-Bold', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &-wrapper {
    background: #101114;
    min-height: 100vh;
  }
}

@media (max-width: 1000px) {
  #app {
    max-width: auto;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  #app {
    min-height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
  }
}

@media (max-width: 400px) {
  #app {
    font-size: 12px;
  }
}
</style>
