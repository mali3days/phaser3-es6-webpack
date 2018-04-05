import 'phaser'

const global = {
  base: 'src/assets',
  img: {
    sky: 'sky',
    ground: 'ground',
    star: 'star',
    bomb: 'bomb'
  },
  spr: {
    dude: 'dude'
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
      gravity: {
        y: 300
      },
      debug: false
    }
  },
  scene: getState()
}

let stars
let bombs
let player
let cursors
let gameOver
let score = 0
let scoreText
let platforms

const collectStar = (player, star) => {
  star.disableBody(true, true)

  score += 10
  scoreText.setText('Score: ' + score)

  if (stars.countActive(true) === 0) {
    stars.children.iterate((child) => {
      child.enableBody(true, child.x, 0, true, true)
    })

    let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)

    let bomb = bombs.create(x, 16, 'bomb')
    bomb.setBounce(1)
    bomb.setCollideWorldBounds(true)
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
    bomb.allowGravity = false
  }
}

const hitBomb = (player, bomb) => {
  this.physics.pause()
  player.setTint(0xff0000)
  player.anims.play('turn')
  gameOver = true
}

function getState () {
  return {
    // init () {
    // },
    preload () {
      const {
        img,
        spr,
        base
      } = global

      for (let i in img) this.load.image(`${img[i]}`, `${base}/${img[i]}.png`)
      for (let i in spr) {
        this.load.spritesheet(`${spr[i]}`, `${base}/${spr[i]}.png`, {
          frameWidth: 32,
          frameHeight: 48
        })
      }
    },

    create () {
      const {
        sky
      /* , star */
      } = global.img

      this.add.image(400, 300, sky)

      platforms = this.physics.add.staticGroup()
      platforms.create(400, 568, 'ground').setScale(2).refreshBody()
      platforms.create(600, 400, 'ground')
      platforms.create(50, 250, 'ground')
      platforms.create(750, 220, 'ground')

      player = this.physics.add.sprite(100, 450, 'dude')
      player.setBounce(0.2)
      player.setCollideWorldBounds(true)
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
          start: 0,
          end: 3
        }),
        frameRate: 10,
        repeat: -1
      })
      this.anims.create({
        key: 'turn',
        frames: [{
          key: 'dude',
          frame: 4
        }],
        frameRate: 20
      })
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {
          start: 5,
          end: 8
        }),
        frameRate: 10,
        repeat: -1
      })

      this.physics.add.collider(player, platforms)

      cursors = this.input.keyboard.createCursorKeys()

      stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
      })

      stars.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
      })

      this.physics.add.collider(stars, platforms)

      this.physics.add.overlap(player, stars, collectStar, null, this)

      scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' })

      bombs = this.physics.add.group()

      this.physics.add.collider(bombs, platforms)

      this.physics.add.collider(player, bombs, hitBomb, null, this)
    },

    update () {
      if (gameOver) {
        return null
      }
      if (cursors.left.isDown) {
        player.setVelocityX(-160)

        player.anims.play('left', true)
      } else if (cursors.right.isDown) {
        player.setVelocityX(160)

        player.anims.play('right', true)
      } else {
        player.setVelocityX(0)

        player.anims.play('turn')
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330)
      }
    }
  }
}

const game = new Phaser.Game(config)

game.global = global
