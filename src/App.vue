<template>
  <header>
    <h1>Vue.js Snake!</h1>
  </header>
  <main>
    <game-board />
  </main>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
#app {
  margin: 0 auto;
  align-items: center;
  height: 100vh;
}

header {
  color: #41b883;
  z-index: 10;
}

main {
  position: relative;
  min-height: 50rem;
  width: 100vw;
  background-image: url('./assets/background.webp');
  background-position-x: center;
  background-position-y: 55%;
  object-fit: none;
  box-shadow: 0 0 8px 8px var(--color-background) inset;
}

@media (min-width: 1024px) {
  main {
    position: relative;
    height: 50rem;
    width: 50rem;
    background-position-x: center;
    object-fit: none;
  }
}
</style>
