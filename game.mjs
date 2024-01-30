import { LEFT, RIGHT, UP, DOWN } from "./dir.mjs"
import { Character } from "./character.mjs"

class Game {
  #gameConfig
  #canvasElement
  #canvas
  player
  #bulletArray = []
  #enemyArray = []
  constructor(config, player) {
    this.#gameConfig = config
    this.#canvasElement = document.getElementById(config.canvasId)
    this.#canvas = this.#canvasElement.getContext("2d")
    this.#canvasElement.height = this.#gameConfig.canavsSize
    this.#canvasElement.width = this.#gameConfig.canavsSize
    this.player = player
    document.addEventListener("keypress", this.#keyPress.bind(this))
  }
  #draw = function () {
    this.#canvas.clearRect(0, 0, this.#gameConfig.canavsSize, this.#gameConfig.canavsSize)
    this.#bulletArray.forEach((bullet) => { this.#drawBullet(bullet.posX, bullet.posY, bullet.size, bullet.color) })
    this.#enemyArray.forEach((enemy) => {
      this.#drawCharacter(enemy.posX, enemy.posY, enemy.size, enemy.color, enemy.orientation)
    })
    this.#drawCharacter(this.player.posX, this.player.posY, this.player.size, this.player.color, this.player.orientation)
  }
  #drawCharacter = function (x, y, size, fillColor, orientation) {
    const bs = size / 3;
    this.#canvas.fillStyle = fillColor;
    if (orientation === UP) {
      this.#canvas.fillRect(x - bs * 0.5, y - bs * 0.5, bs, bs);
      this.#canvas.fillRect(x - 1.5 * bs, y - 0.5 * bs, bs, bs);
      this.#canvas.fillRect(x - 0.5 * bs, y - 1.5 * bs, bs, bs);
      this.#canvas.fillRect(x + 0.5 * bs, y - 0.5 * bs, bs, bs);
      this.#canvas.fillRect(x - 1.5 * bs, y + 0.5 * bs, bs, bs);
      this.#canvas.fillRect(x + 0.5 * bs, y + 0.5 * bs, bs, bs);
    } else if (orientation === DOWN) {
      this.#canvas.fillRect(x - bs * 0.5, y - bs * 0.5, bs, bs);
      this.#canvas.fillRect(x - bs * 0.5, y + bs * 0.5, bs, bs);
      this.#canvas.fillRect(x - bs * 1.5, y - bs * 0.5, bs, bs);
      this.#canvas.fillRect(x - bs * 1.5, y - bs * 1.5, bs, bs);
      this.#canvas.fillRect(x + bs * 0.5, y - bs * 0.5, bs, bs);
      this.#canvas.fillRect(x + bs * 0.5, y - bs * 1.5, bs, bs);
    } else if (orientation === LEFT) {
      this.#canvas.fillRect(x - bs * 0.5, y - bs * 0.5, bs, bs);
      this.#canvas.fillRect(x - bs * 1.5, y - bs * 0.5, bs, bs);
      this.#canvas.fillRect(x - bs * 0.5, y + bs * 0.5, bs, bs);
      this.#canvas.fillRect(x + bs * 0.5, y + bs * 0.5, bs, bs);
      this.#canvas.fillRect(x - bs * 0.5, y - bs * 1.5, bs, bs);
      this.#canvas.fillRect(x + bs * 0.5, y - bs * 1.5, bs, bs);
    } else if (orientation === RIGHT) {
      this.#canvas.fillRect(x - bs * 0.5, y - bs * 0.5, bs, bs);
      this.#canvas.fillRect(x + bs * 0.5, y - bs * 0.5, bs, bs);
      this.#canvas.fillRect(x - bs * 0.5, y - bs * 1.5, bs, bs);
      this.#canvas.fillRect(x - bs * 1.5, y - bs * 1.5, bs, bs);
      this.#canvas.fillRect(x - bs * 0.5, y + bs * 0.5, bs, bs);
      this.#canvas.fillRect(x - bs * 1.5, y + bs * 0.5, bs, bs);
    } else {
      console.error("wrong orientation")
    }
  }
  #drawBullet = function (x, y, size, fillColor) {
    // TODO: draw bullet
    this.#canvas.fillStyle = fillColor
    this.#canvas.fillRect(x - size / 2, y - size / 2, size, size)
  }

  #keyPress = function (event) {
    if (event.key === 'a') {
      this.player.moveLeft()
    } else if (event.key === 's') {
      this.player.moveDown()
    } else if (event.key === 'd') {
      this.player.moveRight()
    } else if (event.key === 'w') {
      this.player.moveUp()
    } else if (event.key === ' ') {
      this.#bulletArray.push(this.player.fire())
      console.log(this.#bulletArray)
    }
  }

  #removeBullet = function () {
    this.#bulletArray.forEach((bullet) => {
      // check if bullet is outside of canavs 
      // then delete that bullet
    })
  }

  #enemyManager = function () {
    let x = Math.random() * this.#gameConfig.canavsSize
    if (x > this.#gameConfig.canavsSize - this.#gameConfig.shakaSize / 2) {
      x = this.#gameConfig.canavsSize - this.#gameConfig.shakaSize / 2
    } else if (x < this.#gameConfig.shakaSize / 2) {
      x = this.#gameConfig.shakaSize / 2
    }
    let y = Math.random() * this.#gameConfig.canavsSize
    if (y > this.#gameConfig.canavsSize - this.#gameConfig.shakaSize / 2) {
      y = this.#gameConfig.canavsSize - this.#gameConfig.shakaSize / 2
    } else if (y < this.#gameConfig.shakaSize / 2) {
      y = this.#gameConfig.shakaSize / 2
    }
    const oList = [UP, DOWN, LEFT, RIGHT]
    let o = oList[Math.floor(Math.random() * oList.length)]

    if (this.#enemyArray.length < this.#gameConfig.maxEnemies) {
      this.#enemyArray.push(
        new Character(
          x, y, o,
          this.#gameConfig.shakaSize,
          this.#gameConfig.shakaSpeed,
          this.#gameConfig.shakaColor,
          this.#gameConfig.shakaHealth,
          true,
          this.#gameConfig.canavsSize,
          this.#gameConfig.shakaBulletDamage,
          this.#gameConfig.shakaBulletSpeed,
          this.#gameConfig.shakaBulletSize,
          this.#gameConfig.shakaBulletColor,
        )
      )
      console.log(this.#enemyArray)
    }
  }

  run = function () {
    setInterval(() => {
      this.#enemyManager()
      this.#bulletArray.forEach((bullet) => { bullet.move() })
      this.#removeBullet()
      this.#draw()
    }, 20)
  }
}

export { Game }