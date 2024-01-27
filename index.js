const canvasElement = document.getElementById("canvas")
const canvas = canvasElement.getContext("2d")

const UP = "u"
const DOWN = "d"
const LEFT = "l"
const RIGHT = "r"

const gameConfig = {
  canavsSize: 600,
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

canvasElement.height = gameConfig.canavsSize
canvasElement.width = gameConfig.canavsSize

class Character {
  #x = 0
  #y = 0
  #o = UP
  #speed
  #health
  #color
  #size
  #isEnemy
  constructor(size, speed, color, health, isEnemy) {
    this.#size = size
    this.#speed = speed
    this.#color = color
    this.#health = health
    this.#isEnemy = isEnemy
  }
  moveUp = function () {
    this.#o = UP
    this.#y -= this.#speed
    if (this.#y < this.#size / 2) {
      this.#y = this.#size / 2
    }
  }
  moveDown = function () {
    this.#o = DOWN
    this.#y += this.#speed
    if (this.#y > gameConfig.canavsSize - this.#size / 2) {
      this.#y = gameConfig.canavsSize - this.#size / 2
    }
  }
  moveLeft = function () {
    this.#o = LEFT
    this.#x -= this.#speed
    if (this.#x < this.#size / 2) {
      this.#x = this.#size / 2
    }
  }
  moveRight = function () {
    this.#o = RIGHT
    this.#x += this.#speed
    if (this.#x > gameConfig.canavsSize - this.#size / 2) {
      this.#x = gameConfig.canavsSize - this.#size / 2
    }
  }
  get posX() {
    return this.#x
  }
  get posY() {
    return this.#y
  }
  get health() {
    return this.#health
  }
  get color() {
    return this.#color
  }
  get size() {
    return this.#size
  }
  get orientation() {
    return this.#o
  }
}

function drawCharacter(x, y, size, fillColor, orientation) {
  const bs = size / 3;
  canvas.fillStyle = fillColor;
  if (orientation === UP) {
    canvas.fillRect(x - bs * 0.5, y - bs * 0.5, bs, bs);
    canvas.fillRect(x - 1.5 * bs, y - 0.5 * bs, bs, bs);
    canvas.fillRect(x - 0.5 * bs, y - 1.5 * bs, bs, bs);
    canvas.fillRect(x + 0.5 * bs, y - 0.5 * bs, bs, bs);
    canvas.fillRect(x - 1.5 * bs, y + 0.5 * bs, bs, bs);
    canvas.fillRect(x + 0.5 * bs, y + 0.5 * bs, bs, bs);
  } else if (orientation === DOWN) {
    canvas.fillRect(x - bs * 0.5, y - bs * 0.5, bs, bs);
    canvas.fillRect(x - bs * 0.5, y + bs * 0.5, bs, bs);
    canvas.fillRect(x - bs * 1.5, y - bs * 0.5, bs, bs);
    canvas.fillRect(x - bs * 1.5, y - bs * 1.5, bs, bs);
    canvas.fillRect(x + bs * 0.5, y - bs * 0.5, bs, bs);
    canvas.fillRect(x + bs * 0.5, y - bs * 1.5, bs, bs);
  } else if (orientation === LEFT) {
    canvas.fillRect(x - bs * 0.5, y - bs * 0.5, bs, bs);
    canvas.fillRect(x - bs * 1.5, y - bs * 0.5, bs, bs);
    canvas.fillRect(x - bs * 0.5, y + bs * 0.5, bs, bs);
    canvas.fillRect(x + bs * 0.5, y + bs * 0.5, bs, bs);
    canvas.fillRect(x - bs * 0.5, y - bs * 1.5, bs, bs);
    canvas.fillRect(x + bs * 0.5, y - bs * 1.5, bs, bs);
  } else if (orientation === RIGHT) {
    canvas.fillRect(x - bs * 0.5, y - bs * 0.5, bs, bs);
    canvas.fillRect(x + bs * 0.5, y - bs * 0.5, bs, bs);
    canvas.fillRect(x - bs * 0.5, y - bs * 1.5, bs, bs);
    canvas.fillRect(x - bs * 1.5, y - bs * 1.5, bs, bs);
    canvas.fillRect(x - bs * 0.5, y + bs * 0.5, bs, bs);
    canvas.fillRect(x - bs * 1.5, y + bs * 0.5, bs, bs);
  } else {
    console.error("wrong orientation")
  }
}

const rango = new Character(gameConfig.playerSize, gameConfig.playerSpeed, gameConfig.playerColor, gameConfig.playerHealth, false)

function keyPress(params) {
  if (params.key === 'a') {
    rango.moveLeft()
  } else if (params.key === 's') {
    rango.moveDown()
  } else if (params.key === 'd') {
    rango.moveRight()
  } else if (params.key === 'w') {
    rango.moveUp()
  }
};

setInterval(() => {
  canvas.clearRect(0, 0, gameConfig.canavsSize, gameConfig.canavsSize)
  drawCharacter(rango.posX, rango.posY, rango.size, rango.color, rango.orientation)
}, 20)