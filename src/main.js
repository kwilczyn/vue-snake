import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import GameBoard from './components/GameBoard.vue'
import PositionCell from './components/PositionCell.vue'

const app = createApp(App)
app.component('game-board', GameBoard)
app.component('position-cell', PositionCell)
app.mount('#app')
