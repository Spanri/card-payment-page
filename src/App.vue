<template>
  <div id="background">
    <div id="app">
      <Nav></Nav>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav' 

export default {
  name: 'App',
  components: { Nav }
}
</script>

<style lang="scss">
@font-face {
  font-family: OpenSans-Bold;
  src: url(assets/fonts/OpenSans-Bold.ttf);
  src: url(assets/fonts/OpenSans-Bold.woff);
}

#background{
  background: #101114;
  min-height: 100vh;
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

  @media (max-width: 1000px) {
    max-width: auto;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    min-height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
  }

  @media (max-width: 400px) {
    font-size: 12px;
  }
}
</style>
