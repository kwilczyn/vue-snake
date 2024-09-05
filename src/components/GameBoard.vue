<template>
  <div id="board">
    <div id="gameOver" v-if="gameStopped">Game Over!</div>
    <position-cell
      v-for="num in numberOfCells"
      :key="num"
      :cell-type="setType(num)"
      @collision-event="gameOver"
      @apple-event="eatApple"
      @belly-empty="enlargeSnake"
    />
  </div>
  <div id="controls">
    <button @click="move('up')" id="buttonUp">Up</button>
    <button @click="move('down')" id="buttonDown">Down</button>
    <button @click="move('left')" id="buttonLeft">Left</button>
    <button @click="move('right')" id="buttonRight">Right</button>
    <button @click="resetGame" id="buttonReset">Reset</button>
    <button @click="speedUp()" id="buttonFaster">Faster</button>
    <button @click="speedDown()" id="buttonSlower">Slower</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snake: [this.getStartingPosition()],
      moveBuffer: ['left'],
      movingDirection: 'left',
      boardLength: 16,
      numberOfCells: 208,
      belly: [],
      apple: '',
      gameStopped: false,
      gameInterval: null,
      oppositeDirections: {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left'
      },
      moveInDirection: {
        left: (x) => x - 1,
        right: (x) => x + 1,
        up: (x) => x - this.boardLength,
        down: (x) => x + this.boardLength
      },
      delay: 300,
      maxDelay: 1100,
      minDelay: 100
    }
  },
  computed: {
    freeCells() {
      const max = this.numberOfCells - (this.boardLength + 1)
      const min = this.boardLength + 1
      const range = (start, stop) => Array.from({ length: stop - start }, (_, i) => start + i)
      const freeC = [...range(min, max)].filter(
        (x) => !((x % this.boardLength === 0) | (x % this.boardLength === 1))
      )
      return freeC.filter((x) => !this.snake.includes(x))
    },
    speedPercentage() {
      return 110 - (this.delay / (this.maxDelay - this.minDelay)) * 100
    }
  },

  inject: ['setScore', 'setSpeed'],

  methods: {
    setApple() {
      this.apple = this.freeCells[Math.floor(Math.random() * this.freeCells.length)]
    },

    getStartingPosition() {
      return 105
    },

    move(direction) {
      if (this.oppositeDirections[this.movingDirection] !== direction) {
        this.movingDirection = direction
      }
    },

    enlargeSnake(ref) {
      this.snake.push(this.belly.pop())
      this.moveBuffer.push(this.moveBuffer[-1])
      this.setScore(this.snake.length)
    },

    eatApple(ref) {
      this.belly.unshift(this.apple)
      this.setApple()
    },

    gameOver() {
      this.stopGame()
      this.snake = []
      this.moveBuffer = []
      this.belly = []
      this.apple = ''
    },

    setType(num) {
      return {
        snakeHead: this.setSnakeHeadClass(num),
        snake: this.setSnakeClass(num),
        wall: this.setWallClass(num),
        apple: this.setAppleClass(num),
        belly: this.setBellyClass(num)
      }
    },

    moveSnake() {
      this.moveBuffer.unshift(this.movingDirection)
      this.moveBuffer.pop()

      const moveInDirectionGetter = this.moveInDirection
      const tempBuffer = this.moveBuffer.slice()
      function applyBuffer(x) {
        const func = moveInDirectionGetter[tempBuffer.shift()]
        return func(x)
      }
      this.snake = this.snake.map(applyBuffer)
    },

    checkSelfBiting() {
      if (new Set(this.snake).size !== this.snake.length) {
        this.gameOver()
      }
    },

    setSnakeClass(num) {
      return this.snake.includes(num)
    },

    setSnakeHeadClass(num) {
      if (this.snake[0] === num) return 'snakeHead'
    },

    setWallClass(num) {
      const criteria = [
        num <= this.boardLength,
        num % this.boardLength === 0,
        num % this.boardLength === 1,
        num >= this.numberOfCells - this.boardLength
      ]
      return criteria.includes(true)
    },

    setAppleClass(num) {
      return num === this.apple
    },

    setBellyClass(num) {
      return this.belly.includes(num)
    },

    handleKeyDown(event) {
      const keyMapper = {
        ArrowUp: 'up',
        w: 'up',
        ArrowDown: 'down',
        s: 'down',
        ArrowLeft: 'left',
        a: 'left',
        ArrowRight: 'right',
        d: 'right'
      }
      this.move(keyMapper[event.key])
    },

    startGame() {
      this.gameStopped = false
      this.snake = [this.getStartingPosition()]
      this.moveBuffer = ['left']
      this.setApple()
      this.setScore(1)
      this.setSpeed(this.speedPercentage)
      this.updateInterval()
    },

    updateInterval() {
      clearInterval(this.gameInterval)
      this.gameInterval = setInterval(this.gameTick, this.delay)
    },

    gameTick() {
      this.moveSnake()
      this.checkSelfBiting()
    },

    stopGame() {
      clearInterval(this.gameInterval)
      this.gameStopped = true
    },

    resetGame() {
      if (!this.gameStopped) this.gameOver()
      this.startGame()
    },

    speedDown() {
      if (this.delay < this.maxDelay - this.minDelay) {
        this.delay = this.delay + 100
        this.updateInterval()
        this.setSpeed(this.speedPercentage)
      }
    },

    speedUp() {
      if (this.delay - 100 > 0) {
        this.delay = this.delay - 100
        this.updateInterval()
        this.setSpeed(this.speedPercentage)
      }
    }
  },

  created() {
    if (!this.apple) {
      this.setApple()
    }
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeyDown)
    this.startGame()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');

#board {
  margin: 11.1rem auto auto auto;
  display: grid;
  gap: 2.5px;
  width: 14.5rem;
  height: 13.5rem;
  border-radius: 13px;
  overflow: hidden;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  position: relative;
  left: 0.3rem;
  background-color: rgb(150, 245, 171);
}

#gameOver {
  position: absolute;
  top: 14%;
  left: 20%;
  font-family: 'Bungee', sans-serif;
  font-size: 3rem;
  font-weight: 400;
  font-style: normal;
  color: rgba(0, 0, 0, 0.7);
}

#controls {
  text-align: center;
  margin: 12rem auto auto auto;
  width: 12rem;
  position: relative;
}

button {
  position: absolute;
  border-radius: 50%;
  height: 2.5rem;
  width: 3.5rem;
  background-color: rgb(194, 237, 187);
  color: black;
  font-weight: bold;
}

button:focus,
button:active {
  box-shadow: 1px 1px 1px black inset;
  outline: none;
}

#buttonUp {
  top: -2.58rem;
  left: 4.7rem;
}

#buttonDown {
  top: 4.2rem;
  left: 4.8rem;
}

#buttonLeft {
  top: -0.1rem;
  left: -1rem;
  transform: rotateZ(16deg);
}

#buttonRight {
  right: -1.8rem;
  transform: rotateZ(-15deg);
}

#buttonReset {
  top: 0.8rem;
  left: 4.7rem;
}

#buttonFaster {
  top: -3.48rem;
  left: -1.2rem;
  transform: rotateZ(15deg);
}

#buttonSlower {
  top: -3.45rem;
  right: -2rem;
  transform: rotateZ(-25deg);
}
</style>
