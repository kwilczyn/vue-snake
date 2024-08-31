<template>
  <header>
    <h1>Vue Snake!</h1>
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
main {
  position: relative;
  height: 50rem;
  width: 50rem;
  background-image: url('./assets/background.webp');
  background-position-x: center;
  background-position-y: 50%;
  object-fit: none;
}
</style>
