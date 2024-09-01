<template>
  <div class="cell" :class="cellType" ref="cell"></div>
</template>

<script>
export default {
  props: {
    cellType: {
      type: String,
      default: ''
    }
  },
  emits: ['collision-event', 'apple-event', 'belly-empty'],
  data() {
    return {}
  },
  methods: {
    checkWallColision() {
      if (this.cellType === 'snake' && this.$refs.cell.classList.contains('wall'))
        this.$emit('collision-event')
    },
    checkApple() {
      if (this.cellType === 'snake' && this.$refs.cell.classList.contains('apple')) {
        this.$emit('apple-event', this.$refs.cell)
      }
    },
    checkBelly() {
      if (this.cellType !== 'snake' && this.$refs.cell.classList.contains('belly')) {
        this.$emit('belly-empty', this.$refs.cell)
      }
    }
  },
  beforeUpdate() {
    this.checkWallColision()
    this.checkApple()
  },
  updated() {
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
  background: red;
}

.belly {
  background: darkred!;
}
</style>
