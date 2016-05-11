import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-guess-word',
  templateUrl: 'guess-word.component.html',
  styleUrls: ['guess-word.component.css']
})
export class GuessWordComponent implements OnInit {
  
  lettersToGuess: string[] = ['b','e','y','u','s','s','s','s'];

  constructor() {}

  ngOnInit() {
    
  }

}
