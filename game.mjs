const UP = "u"
const DOWN = "d"
const LEFT = "l"
const RIGHT = "r"

class Game {
  #gameConfig
  #canvasElement
  #canvas
  player
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

  #keyPress = function (event) {
    if (event.key === 'a') {
      this.player.moveLeft()
    } else if (event.key === 's') {
      this.player.moveDown()
    } else if (event.key === 'd') {
      this.player.moveRight()
    } else if (event.key === 'w') {
      this.player.moveUp()
    }
  }

  run = function () {
    setInterval(() => {
      this.#draw()
    }, 20)
  }
}

export { Game }