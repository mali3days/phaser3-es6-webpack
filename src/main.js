import 'phaser'

const global = {
  base: 'src/assets',
  elements: {
    blue: 'blue',
    green: 'green',
    red: 'red',
    yellow: 'yellow'
  }
  // spr: {
  //   dude: 'dude'
  // }
}

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: {
      //   y: 300
      // },
      debug: false
    }
  },
  scene: getState()
}

const game = new Phaser.Game(config)
game.global = global

const tileGrid = [
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null]
]
const tileTypes = [
  'blue',
  'green',
  'red',
  'yellow'
]
let score = 0
let activeTile1 = null
let activeTile2 = null
let canMove = false

function getState () {
  return {
    init () {
      //
    },

    preload () {
      const { base, elements } = global
      // blue, green, red, yellow
      for (let elem in elements) this.load.image(`${elem}`, `${base}/elements/${elem}.png`)
    },

    create () {
      // this.backgroundColor = '#34495f'
      let width = this.textures.get('blue').getSourceImage().width
      let height = this.textures.get('blue').getSourceImage().height

      this.physics.add.group({
        key: 'blue'
      })

      const seed = Date.now()
      this.random = Phaser.Math.RND
      // console.log(this.random)
    },

    update () {
    }
  }
}
