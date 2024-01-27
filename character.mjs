const UP = "u"
const DOWN = "d"
const LEFT = "l"
const RIGHT = "r"

class Character {
  #x = 0
  #y = 0
  #o = UP
  #maxPos
  #speed
  #health
  #color
  #size
  #isEnemy
  constructor(size, speed, color, health, isEnemy, maxPos) {
    this.#size = size
    this.#speed = speed
    this.#color = color
    this.#health = health
    this.#isEnemy = isEnemy
    this.#maxPos = maxPos
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
    if (this.#y > this.#maxPos - this.#size / 2) {
      this.#y = this.#maxPos - this.#size / 2
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
    if (this.#x > this.#maxPos - this.#size / 2) {
      this.#x = this.#maxPos - this.#size / 2
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

export { Character }