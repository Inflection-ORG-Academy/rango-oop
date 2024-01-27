import { Character } from "./character.mjs"
import { Game } from "./game.mjs"

const gameConfig = {
  canavsSize: 600,
  canvasId: "canvas",

  playerSize: 50,
  playerColor: "red",
  playerSpeed: 10,
  playerHealth: 100,

  kilbishSize: 30,
  kilbishColor: "green",
  kilbishSpeed: 2,
  kilbishHealth: 50,

  shakaSize: 15,
  shakaColor: "blue",
  shakaSpeed: 10,
  shakaHealth: 10,
}

const rango = new Character(gameConfig.playerSize, gameConfig.playerSpeed, gameConfig.playerColor, gameConfig.playerHealth, false, gameConfig.canavsSize)

const enemyArray = [
  new Character(gameConfig.playerSize, gameConfig.playerSpeed, gameConfig.playerColor, gameConfig.playerHealth, true),
  new Character(gameConfig.playerSize, gameConfig.playerSpeed, gameConfig.playerColor, gameConfig.playerHealth, true),
  new Character(gameConfig.playerSize, gameConfig.playerSpeed, gameConfig.playerColor, gameConfig.playerHealth, true),
  new Character(gameConfig.playerSize, gameConfig.playerSpeed, gameConfig.playerColor, gameConfig.playerHealth, true),
  new Character(gameConfig.playerSize, gameConfig.playerSpeed, gameConfig.playerColor, gameConfig.playerHealth, true),
]

const rangoGame = new Game(gameConfig, rango)
rangoGame.run()

export { rangoGame }