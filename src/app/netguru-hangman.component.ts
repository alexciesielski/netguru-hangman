import { Component, OnInit } from '@angular/core';
import {WordnikService} from './wordnik.service';

@Component({
  moduleId: module.id,
  selector: 'netguru-hangman-app',
  templateUrl: 'netguru-hangman.component.html',
  styleUrls: ['netguru-hangman.component.css'],
  providers: [WordnikService]
})

// https://github.com/netguru/frontend-recruitment-task
export class NetguruHangmanAppComponent implements OnInit {
  title = 'netguru-hangman';
  word: string = '';
  error: any;

  constructor(
    private wordnik: WordnikService
  ) { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.word = '';
    this.subscribeToRandomWordnik();
  }

  subscribeToRandomWordnik() {
    this.wordnik.getRandomWord().subscribe(
      word => this.word = word,
      error => this.error = error
    );
  }
}
