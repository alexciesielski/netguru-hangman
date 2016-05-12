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
  title = 'Netguru Hangman';
  error: any = null;
  modalText = 'Welcome to Hangman';
  isGameRunning = false;

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
    this.showModal('Welcome to Hangman');
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
    this.isGameRunning = true;
  }

  getNewWord() {
    this.wordnik.getRandomWord().subscribe(
      (word: string) => {
        this.wordToGuessLength = word.length;
        this.wordToGuess = word.toLowerCase().split('');
      },
      (error) => {
        this.error = error;
        this.showModal(error);
      }
    );
  }

  onKey(keycode) {
    if (this.isPressedKeyLetter(keycode) && this.isGameRunning) {

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

      if (this.isLost()) {
        this.showModal('Game over');
      } else if(this.isWon()) {
        this.showModal('Victory!');
      }
      
    }
  }

  isWon(): boolean {
    let guessed = true;
    for (let i = 0; i < this.wordToGuess.length; i++) {
      let letter = this.wordToGuess[i];

      if (this.correctlyGuessedLetters.indexOf(letter) === -1) {
        guessed = false;
      }
    }
    
    return guessed;
  }

  isLost(): boolean {
    return this.wrongGuesses === 11;
  }

  showModal(modalText) {
    if (!this.dialogOpen) {
      let dialog: any = document.getElementById('gameoverModal');
      dialog.showModal();
      this.dialogOpen = true;
      this.isGameRunning = false;
      this.modalText = modalText;
    }
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
