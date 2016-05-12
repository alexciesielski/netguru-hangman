import { Component, OnInit } from '@angular/core';
import {WordnikService} from './wordnik.service';
import {HangmanComponent} from './hangman';
import {MissedLettersComponent} from './missed-letters';

@Component({
  moduleId: module.id,
  selector: 'netguru-hangman-app',
  templateUrl: 'netguru-hangman.component.html',
  styleUrls: ['netguru-hangman.component.css'],
  directives: [HangmanComponent, MissedLettersComponent],
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
    this.guesses = 0;
    this.wrongGuesses = 0;
    this.wordToGuessLength = 0;

    this.wordToGuess = new Array();
    this.correctlyGuessedLetters = new Array();
    this.missedLetters = new Array();

    this.getNewWord();
    this.closeModal();
  }

  getNewWord() {
    this.wordnik.getRandomWord().subscribe(
      (word: string) => {
        this.wordToGuessLength = word.length;
        this.wordToGuess = word.toLowerCase().split('');
        if (word.indexOf('-') > -1 || word.indexOf(' ') > -1) {
          console.log('Wordnik returned word containing dash/space, requesting new word.');
          this.newGame();
        } else {
          this.isGameRunning = true;
        }
      },
      (error) => {
        this.error = error;
        this.showModal(error);
      }
    );
  }

  onKey(keycode) {
    if (this.isGameRunning && this.isPressedKeyLetter(keycode)) {

      this.guesses++;

      var letter = String.fromCharCode(keycode).toLowerCase();
      this.checkGuessedLetter(letter);
      this.checkGameOver();
    }
  }

  checkGuessedLetter(letter: string) {
    if (this.isGuessedRight(letter)) {
      // guessed correctly

      if (!this.isLetterInArray(letter, this.correctlyGuessedLetters)) {
        // if letter not yet guessed, add it to guessed letters
        this.correctlyGuessedLetters.push(letter);
      }

    } else {
      // guessed wrong
      if (!this.isLetterInArray(letter, this.missedLetters)) {
        // if letter not yet in missed letters, add it to missed letters 
        // and show next body part of hangman
        this.wrongGuesses++;
        this.missedLetters.push(letter);
      }
    }
  }

  checkGameOver() {
    if (this.isLost()) {
      this.showModal('Game over');
    } else if (this.isWon()) {
      this.showModal('Victory!');
    }
  }

  isWon(): boolean {
    let guessed = true;

    // check if all letters from wordToGuess are in correctlyGuessedLetters
    for (let i = 0; i < this.wordToGuess.length; i++) {
      let letter = this.wordToGuess[i];

      if (this.correctlyGuessedLetters.indexOf(letter) === -1) {
        // not yet won
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
    // checks if pressed key is a letter from A to Z
    return (keycode >= 65 && keycode <= 90);
  }

  isLetterInArray(letter: string, array: string[]) {
    return array.indexOf(letter) > -1;
  }

  isGuessedRight(letter: string) {
    return this.isLetterInArray(letter, this.wordToGuess);
  }

  isLetterInCorrectlyGuessedLetters(letter: string) {
    return this.isLetterInArray(letter, this.correctlyGuessedLetters);
  }
}
