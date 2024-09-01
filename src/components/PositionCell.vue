<template>
  <div class="cell" :class="cellType" ref="cell"></div>
</template>

<script>
export default {
  props: {
    cellType: {
      type: Object,
      default: {}
    }
  },
  emits: ['collision-event', 'apple-event', 'belly-empty'],
  data() {
    return {}
  },
  methods: {
    checkWallColision() {
      if (this.cellType.snake && this.cellType.wall) this.$emit('collision-event')
    },
    checkApple() {
      if (this.cellType.snake && this.cellType.apple) {
        this.$emit('apple-event', this.$refs.cell)
      }
    },
    checkBelly() {
      if (!this.cellType.snake && this.cellType.belly) {
        this.$emit('belly-empty', this.$refs.cell)
      }
    }
  },
  beforeUpdate() {
    this.checkWallColision()
    this.checkApple()
    this.checkBelly()
  }
}
</script>

<style>
.cell {
  border: 1px solid rgba(0, 0, 0, 0.05);
  aspect-ratio: 1;
}

.wall {
  background-image: radial-gradient(black 1px, transparent 0);
}

.snake {
  background: rgba(0, 0, 0, 0.7);
}

.apple {
  width: 100%;
  border-radius: 50%;
  border-color: black;
}

.belly {
  border-color: rgb(150, 245, 171);
  border-width: 1px;
}
</style>
