import { Character } from "./character.mjs"
import { Game } from "./game.mjs"

const gameConfig = {
  canavsSize: 600,
  canvasId: "canvas",

  playerSize: 50,
  playerColor: "red",
  playerSpeed: 10,
  playerHealth: 100,
  playerBulletDamage : 5,
  playerBulletSpeed : 3,
  playerBulletSize : 10,
  playerBulletColor : "blue",

  kilbishSize: 30,
  kilbishColor: "green",
  kilbishSpeed: 2,
  kilbishHealth: 50,

  shakaSize: 15,
  shakaColor: "blue",
  shakaSpeed: 10,
  shakaHealth: 10,
}

const rango = new Character(
  gameConfig.playerSize,
  gameConfig.playerSpeed, 
  gameConfig.playerColor, 
  gameConfig.playerHealth, 
  false, 
  gameConfig.canavsSize,
  gameConfig.playerBulletDamage,
  gameConfig.playerBulletSpeed,
  gameConfig.playerBulletSize,
  gameConfig.playerBulletColor
  )

const rangoGame = new Game(gameConfig, rango)
rangoGame.run()

export { rangoGame }