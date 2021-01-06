import './styles/main.scss'
import { render } from 'react-dom'
import React from 'react'

const TestComponent = () => <div>test</div>
const App = () => <TestComponent />
class Game {
  constructor() {
    this.game = 'Violin Charades'
  }
}

const myGame = new Game()

// создаем параграф
const p = document.createElement('p')
p.textContent = `I like ${myGame.game}.`

// создаем элемент заголовка
const heading = document.createElement('h1')
heading.textContent = 'Как интересно!'

// добавляем параграф и заголовок в DOM
const root = document.querySelector('#root')
root.append(heading, p)

render(<App />, document.getElementById('reactRoot'))
