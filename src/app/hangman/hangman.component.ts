import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-hangman',
  templateUrl: 'hangman.component.html',
  styleUrls: ['hangman.component.css']
})
export class HangmanComponent {
  @Input() wrongGuesses: number = 0;

  constructor() {}

}
