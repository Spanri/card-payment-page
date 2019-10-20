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
::selection {
  background: $color-selection;
  color: white;
}

#app {
  display: flex;
  align-items: stretch;
  flex-direction: row;
  justify-content: center;
  
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 0;
  font: 16px 'OpenSans-Bold', Arial, Helvetica, sans-serif;

  /* оно было изначально, я не знаю, можно ли удалить это */
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
