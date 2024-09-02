<template>
  <div id="board">
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
      }
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
    }
  },

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
    },

    eatApple(ref) {
      this.belly.unshift(this.apple)
      this.setApple()
    },

    gameOver() {
      this.snake = [this.getStartingPosition()]
      this.moveBuffer = ['left']
      this.belly = []
      this.setApple()
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
    }
  },

  created() {
    if (!this.apple) {
      this.setApple()
    }
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeyDown)
    setInterval(() => {
      this.moveSnake()
      this.checkSelfBiting()
    }, 200)
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

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

#controls {
  text-align: center;
  margin: 12rem auto auto auto;
  width: 12rem;
  position: relative;
}

button {
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
  position: absolute;
  top: -2.58rem;
  left: 4.7rem;
}

#buttonDown {
  position: absolute;
  top: 4.2rem;
  left: 4.8rem;
}

#buttonLeft {
  position: absolute;
  top: -0.1rem;
  left: -1rem;
  transform: rotateZ(16deg);
}

#buttonRight {
  position: absolute;
  right: -1.8rem;
  transform: rotateZ(-15deg);
}
</style>
