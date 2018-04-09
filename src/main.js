import 'phaser'

const global = {
  // base: 'src/assets',
  // img: {
  //   sky: 'sky',
  //   ground: 'ground',
  //   star: 'star',
  //   bomb: 'bomb'
  // },
  // spr: {
  //   dude: 'dude'
  // }
}

const config = {
  // type: Phaser.AUTO,
  // parent: 'content',
  // width: 800,
  // height: 600,
  // physics: {
  //   default: 'arcade',
  //   arcade: {
  //     gravity: {
  //       y: 300
  //     },
  //     debug: false
  //   }
  // },
  scene: getState()
}

function getState () {
  return {
    // init () {
    // },
    preload () {
    },

    create () {
    },

    update () {
    }
  }
}

const game = new Phaser.Game(config)

game.global = global
