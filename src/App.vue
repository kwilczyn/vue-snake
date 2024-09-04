<template>
  <header>
    <div id="score">Score: {{ score }}</div>
    <h1>Vue.js Snake!</h1>
    <div id="speed">Speed: {{ speed }}%</div>
  </header>
  <main>
    <game-board />
  </main>
</template>

<script>
export default {
  data() {
    return {
      score: 1,
      speed: 100
    }
  },
  methods: {
    setScore(score) {
      this.score = score
    },
    setSpeed(speed) {
      this.speed = speed
    }
  },
  provide() {
    return {
      setScore: this.setScore,
      setSpeed: this.setSpeed
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  margin: 0 auto;
  align-items: center;
  height: 100vh;
}

header {
  padding: 0 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: var(--color-background);
  width: 100%;
  color: #41b883;
  z-index: 10;
  text-align: center;
  box-shadow: 0px 1px 1px 1px black;
  font-size: 1rem;
  h1 {
    font-size: large;
  }
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

#score,
#speed {
  color: #41b883;
  font-weight: bold;
  min-width: 7rem;
}

#score {
  text-align: left;
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
