import 'phaser'

const global = {
  base: 'src/assets',
  elements: {
    blue: 'blue',
    green: 'green',
    red: 'red',
    yellow: 'yellow'
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: getState()
}

const game = new Phaser.Game(config)
game.global = global

function getState () {
  return {
    init () {
    },

    preload () {
      const { base, elements } = global
      for (let elem in elements) this.load.image(`${elem}`, `${base}/elements/${elem}.png`)
    },

    create () {
      this.physics.add.group({
        key: 'blue'
      })
      this.random = Phaser.Math.RND
    },

    update () {
    }
  }
}
