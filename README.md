
# Card Game Match Pair
A memory matching card game where the player flips over two cards at a time to reveal their symbols. The goal is to match all pairs of cards in as few moves as possible.

## Demo
- https://matair.dev.yliang.net/

![demo](/src/assets/light.gif)


## Features

- Setting the cards in play

   Two sets of cards are created using the symbols from the _symbols_ array and combined into one array (of match pairs) representing all the cards. For each symbol in the symbols array, an object is created representing a card with that symbol. The card object has properties such as _kind_ (the symbol on the card), _up_ (whether or not the card is face-up), and _found_ (whether or not the card has been matched).

   ```
   symbols = ['emoji_nature', 'emoji_symbols', 'outdoor_grill', 'deck', 'cake', 'emoji_food_beverage', 'hot_tub', 'two_wheeler'];

   let cardsOne = this.symbols.map(symbol => ({ kind: symbol, up: false, found: false }));
   let cartsTwo = this.symbols.map(symbol => ({ kind: symbol, up: false, found: false }));

   this.cards = [...cardsOne, ...cartsTwo]; // double the cards
   ```


- Tracking the game state

   Define several variables and arrays to keep track of the game state, such as the colors of the cards, the different moments in the game (start, loss, win), the cards and overlays currently in play, and whether or not the game is busy flipping and checking cards.

   > The `startGame()` resets the game state by shuffling the cards, resetting the state of matched cards, the flip count, and the countdown timer.

   ```
   startGame() {
      this.cards.map(card => { card.up = false; });
      this.shuffleCards(this.cards);
      this.cardsMatched = [];
      this.timeLeft = 60;
      this.flipCount = 0;
      setTimeout(() => { this.startCountdown(); }, 500);
   }
   ```


- Flipping the cards

   The `setCardClass` takes a card as an argument and returns a string representing the CSS classes that should be applied to that card based on its current state. For example, if a card is face-up and matched, it will have the classes “card”, “visible”, and “matched”.

   - Style

   ```
   setCardClass(card: Card): string {
      return ['card',
         card.kind,
         card.up ? 'visible' : null,
         card.found ? 'matched' : null].join(' ');
   }
   ```

   - LogicW

   ```
   runCard(card: Card, index: number) {
      if (
         this.isBusy == false
         && !this.cardsMatched.includes(card)
         && card !== this.cardToCheck
      ) {
         if (this.flipCount !== undefined) this.flipCount += 1;
         this.cards[index].up = true;
         if (!this.cardToCheck) {
            this.cardToCheck = card;
         } else {
            card.kind == this.cardToCheck.kind ?
               this.isMatch(card) : this.isMix(card);
         }

      }
   }
   ```

- Calculating the result of the game

   - A loss

   ```
      startCountdown() {
         this.timer = setInterval(() => {
            if (this.timeLeft !== undefined) this.timeLeft -= 1;
            this.timeLeft == 0 ? this.gameOver(this.moments.loss) : null;
         }, 1000);
      }
   ```

   - A win

   ```
      if (this.cardsMatched.length == this.cards.length) {
         setTimeout(() => {
            this.gameOver(this.moments.win);
         }, 1000); // buffer time
      }
   ```


## Summary

The game could include multiple levels of difficulty with varying numbers of cards and time limits to provide a greater challenge for players and increase replayability. Additionally, the ability for players to share their game results on social media could be added. This could include information such as their score, time remaining, and number of flips.