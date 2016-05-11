import { Component, OnInit } from '@angular/core';
import {WordnikService} from './wordnik.service';
import {HangmanComponent} from './hangman';
import {MissedLettersComponent} from './missed-letters';
import {GuessWordComponent} from './guess-word';

@Component({
  moduleId: module.id,
  selector: 'netguru-hangman-app',
  templateUrl: 'netguru-hangman.component.html',
  styleUrls: ['netguru-hangman.component.css'],
  directives: [HangmanComponent, MissedLettersComponent, GuessWordComponent],
  providers: [WordnikService],
  host: { '(window:keydown)': 'onKey($event.keyCode)' }
})

// https://github.com/netguru/frontend-recruitment-task
export class NetguruHangmanAppComponent implements OnInit {

  title = 'netguru-hangman';
  error: any = null;

  wordToGuess: any[] = null;
  wordToGuessLength: number = 0;;

  guesses: number = 0;
  wrongGuesses: number = 0;
  correctlyGuessedLetters: any[] = null;
  missedLetters: any[] = null;

  dialog: any;
  dialogOpen = false;

  constructor(
    private wordnik: WordnikService
  ) { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {

    this.closeModal();
    this.guesses = 0;
    this.wrongGuesses = 0;
    this.wordToGuessLength = 0;

    this.wordToGuess = new Array();
    this.correctlyGuessedLetters = new Array();
    this.missedLetters = new Array();

    this.getNewWord();
  }

  getNewWord() {
    this.wordnik.getRandomWord().subscribe(
      (word: string) => {
        this.wordToGuessLength = word.length;
        this.wordToGuess = word.toLowerCase().split('');
      },
      (error) => this.error = error
    );
  }

  onKey(keycode) {
    if (this.isPressedKeyLetter(keycode)) {

      var letter = String.fromCharCode(keycode).toLowerCase();
      this.guesses++;

      if (this.isLetterInWordToGuess(letter)) {
        // guessed right
        if (!this.isLetterInArray(letter, this.correctlyGuessedLetters)) {
          this.correctlyGuessedLetters.push(letter);
        }

      } else {
        // guessed wrong
        if (!this.isLetterInArray(letter, this.missedLetters)) {
          this.wrongGuesses++;
          this.missedLetters.push(letter);
        }
      }

      if (this.isGameOver()) {
        this.showModal();
      }
    }
  }

  isGameOver() {
    if (this.wrongGuesses < 11) {
      // Game over

      let guessed = true;
      for (let i = 0; i < this.wordToGuess.length; i++) {
        let letter = this.wordToGuess[i];

        if (this.correctlyGuessedLetters.indexOf(letter) === -1) {
          guessed = false;
        }
      }

      return guessed;
    }

    return true;
  }

  showModal() {
    let dialog: any = document.getElementById('gameoverModal');
    dialog.showModal();
    this.dialogOpen = true;
  }

  closeModal() {
    if (this.dialogOpen) {
      let dialog: any = document.getElementById('gameoverModal');
      dialog.close();
      this.dialogOpen = false;
    }
  }

  isPressedKeyLetter(keycode: number) {
    return keycode >= 65 && keycode <= 90;
  }

  isLetterInArray(letter: string, array: string[]) {
    return array.indexOf(letter) > -1;
  }

  isLetterInWordToGuess(letter: string) {
    return this.wordToGuess.indexOf(letter) > -1;
  }

  isLetterInCorrectlyGuessedLetters(letter: string) {
    return this.correctlyGuessedLetters.indexOf(letter) > -1;
  }
}
