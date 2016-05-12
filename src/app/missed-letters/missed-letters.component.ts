import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-missed-letters',
  templateUrl: 'missed-letters.component.html',
  styleUrls: ['missed-letters.component.css']
})
export class MissedLettersComponent implements OnInit {
  
  @Input() missedLetters: string[] = []; // = ['a', 'b', 'c', 'd', 'e', 'f'];

  constructor() {}

  ngOnInit() {
  }

}
