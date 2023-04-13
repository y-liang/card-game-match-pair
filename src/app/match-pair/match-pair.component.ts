import { Component, OnInit } from '@angular/core';
interface Card {
   kind: string;
   up: boolean;
   found: boolean;
}

interface Overlay {
   kind: string;
   shown: boolean;
}

@Component({
   selector: 'app-match-pair',
   templateUrl: './match-pair.component.html',
   styleUrls: ['./match-pair.component.less']
})
export class MatchPairComponent implements OnInit {
   // colors = ['red', 'orange', 'yellow'];

   // colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'grey'];
   symbols = ['emoji_nature', 'emoji_symbols', 'outdoor_grill', 'deck', 'cake', 'emoji_food_beverage', 'hot_tub', 'two_wheeler'];

   moments = { start: 'start', loss: 'loss', win: 'win' };

   cards: Card[] = [];
   overlays: Overlay[] = [];

   cardToCheck: Card | undefined;
   cardsMatched: Card[] = [];

   isBusy: boolean = true;

   // timer;
   timeLeft: number | undefined;
   flipCount: number | undefined;
   timer: string | number | any | undefined;

   constructor() { }

   ngOnInit(): void {
      let cardsOne = this.symbols.map(symbol => ({ kind: symbol, up: false, found: false }));
      let cartsTwo = this.symbols.map(symbol => ({ kind: symbol, up: false, found: false }));

      this.cards = [...cardsOne, ...cartsTwo]; // double the cards


      for (let moment in this.moments) {
         this.overlays.push({ kind: moment, shown: false });
      }


      this.toggleOverlay(true, this.moments.start);

   }

   setCardClass(card: Card): string {
      return ['card',
         card.kind,
         card.up ? 'visible' : null,
         card.found ? 'matched' : null].join(' ');
   }

   // use isBusy to prevent users click when showing the overlays with timeout
   toggleOverlay(on: boolean, moment: string) {
      // isBusy is true when loaded
      switch (on) {
         case true:
            this.isBusy = true;
            setTimeout(() => {
               this.overlays.map(overlay => {
                  overlay.kind == moment ? overlay.shown = true : null;
               });
               this.isBusy = false;
            }, 1000);
            break;

         case false:
            if (this.isBusy == false) {
               this.overlays.map(overlay => {
                  overlay.kind == moment ? overlay.shown = false : null;
               });

               this.startGame();
               break;
            }
      }

   }

   startGame() {
      // close all the cards and shuffle them
      this.cards.map(card => { card.up = false; });
      this.shuffleCards(this.cards);
      this.cardsMatched = [];
      this.timeLeft = 60;
      this.flipCount = 0;
      // clean plate


      setTimeout(() => { this.startCountdown(); }, 500);
   }

   shuffleCards(array: Card[]) {
      let currentIndex = array.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;

         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
      }

      return array;
   }

   startCountdown() {
      this.timer = setInterval(() => {
         if (this.timeLeft !== undefined) this.timeLeft -= 1;
         this.timeLeft == 0 ? this.gameOver(this.moments.loss) : null;
      }, 1000);
   }


   gameOver(result: string) {
      clearInterval(this.timer);
      this.toggleOverlay(true, result);
   }


   runCard(card: Card, index: number) {


      if (
         // card can be flipped under conditions below
         this.isBusy == false
         && !this.cardsMatched.includes(card)
         && card !== this.cardToCheck
      ) {
         if (this.flipCount !== undefined) this.flipCount += 1;

         this.cards[index].up = true;

         // cardToCheck is always up

         if (!this.cardToCheck) {
            // no cardToCheck yet, this card becomes it
            this.cardToCheck = card;

         } else {
            card.kind == this.cardToCheck.kind ?
               this.isMatch(card) : this.isMix(card);

         }

      }
   }

   isMatch(card: Card) {

      this.isBusy = true;
      if (this.cardToCheck) this.cardsMatched.push(card, this.cardToCheck);

      // this.cardToCheck.found = true;
      // this.cardToCheck = null;


      setTimeout(() => {
         this.isBusy = false;

         if (this.cardToCheck) {
            this.cardToCheck.found = true;
            this.cardToCheck = undefined;
         }
         card.up = true;
         card.found = true;
      }, 500);


      // win
      if (this.cardsMatched.length == this.cards.length) {
         setTimeout(() => {
            this.gameOver(this.moments.win);
         }, 1000); // buffer time
      }
   }

   isMix(card: Card) {

      this.isBusy = true;

      setTimeout(() => {
         this.isBusy = false;
         card.up = false;
         if (this.cardToCheck) {
            this.cardToCheck.up = false;
            this.cardToCheck = undefined;
         }

      }, 500);


   }

}