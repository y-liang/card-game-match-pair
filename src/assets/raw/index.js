function ready() {
  let overlays = Array.from(document.getElementsByClassName('overlay-text'))
  let cards = Array.from(document.getElementsByClassName('card'))
  let game = new MixOrMatch(cards)

  // console.log(cards) 

  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible')
      game.startGame()
    }) // to be able to... click to get rid of the overlays (start, gameover, victory) so a new game can start
  })

  cards.forEach(card => {
    card.addEventListener('click', () => {
      game.flipCard(card)
    }) // to be able to... click to flip each card, so don't need to add event listener to every card element
  })
}

class AudioId extends Audio {
  constructor(path) {
    super('assets/audio/' + path)
  }
}

class AudioController {
  constructor() {
    this.bgMusic = new AudioId('creepy.mp3')
    this.flipSound = new AudioId('flip.wav')
    this.matchSound = new AudioId('match.wav')
    this.victorySound = new AudioId('victory.wav')
    this.gameOverSound = new AudioId('gameover.wav')

    this.bgMusic.volume = 0.5
    this.bgMusic.loop = true
  }

  startMusic() {
    this.bgMusic.play()
  }
  stopMusic() {
    this.bgMusic.pause()
    this.bgMusic.currentTime = 0
  }

  flip() {
    this.flipSound.play()
  }
  match() {
    this.matchSound.play()
  }
  victory() {
    this.stopMusic()
    this.victorySound.play()
  }
  gameOver() {
    this.stopMusic()
    this.gameOverSound.play()
  }
}

class MixOrMatch {
  constructor(cards) {
    this.cardsArray = cards

    this.timerElem = document.getElementById('time-remaining') // if innerText put here, it is the number fixed in html, not dynamic
    this.flipElem = document.getElementById('flips')

    this.audioController = new AudioController()
  }

  startGame() {
    this.timerElem.innerText = 60
    this.flipElem.innerText = 0

    this.cardToCheck = null
    this.matchedCards = []
    this.busy = false

    this.shuffleCards()

    // use arrow function do keep this to the class
    setTimeout(() => {
      this.audioController.startMusic()
      this.startCountdown()
    }, 600) // better user experience

    this.hideCards()
  }

  hideCards() {
    this.cardsArray.forEach(card => {
      card.classList.remove('visible')
      card.classList.remove('matched')
    })
  }

  startCountdown() {
    this.timer = setInterval(() => {
      this.timerElem.innerText--
      if (this.timerElem.innerText == 0) {
        this.gameOver()
      }
    }, 1000)  // call a function every one second, and this startCountdown is a timer
    // here timer is the reference of this setInterval function being called
  }

  gameOver() {
    clearInterval(this.timer)
    this.audioController.gameOver()
    document.getElementById('game-over-text').classList.add('visible') // game over text popped up
  }

  gameWon() {
    clearInterval(this.timer)
    this.audioController.victory()
    document.getElementById('game-won-text').classList.add('visible') // game over text popped up
  }


  canFlipCard(card) {
    return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck)
    // above is to return true if all the three conditions are met
  }

  getCardType(card) {
    return card.getElementsByClassName('card-value')[0].src
  }

  flipCard(card) {

    if (this.canFlipCard(card)) {
      this.audioController.flip()
      this.flipElem.innerText++
      card.classList.add('visible')

      if (this.cardToCheck) {
        // check for match
        this.getCardType(card) == this.getCardType(this.cardToCheck) ?
          this.isMatch(card, this.cardToCheck) : this.isMix(card, this.cardToCheck)

        this.cardToCheck = null // new round, otherwise there is always a cardToCheck after the first flip
      } else {
        this.cardToCheck = card
      }

    }
  }

  isMatch(card1, card2) {
    this.matchedCards.push(card1, card2)
    console.log(this.matchedCards)
    card1.classList.add('matched')
    card2.classList.add('matched')
    this.audioController.match()
    setTimeout(() => {
      card1.classList.remove('matched')
      card2.classList.remove('matched')
    }, 3000)

    if (this.matchedCards.length == this.cardsArray.length) {
      this.gameWon()
    }
  }

  isMix(card1, card2) {
    this.busy = true
    setTimeout(() => {
      card1.classList.remove('visible')
      card2.classList.remove('visible')
      this.busy = false
    }, 1000)
  }

  shuffleCards() {
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * i) // (i + 1)
      this.cardsArray[randomIndex].style.order = i // exchange the html element's css styling order with a randome one's
      this.cardsArray[i].style.order = randomIndex
    }
  }
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready())
} else {
  ready()
}