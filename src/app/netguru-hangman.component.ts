import { Component } from '@angular/core';
import {WordnikService} from './wordnik.service';

@Component({
  moduleId: module.id,
  selector: 'netguru-hangman-app',
  templateUrl: 'netguru-hangman.component.html',
  styleUrls: ['netguru-hangman.component.css'],
  providers: [WordnikService]
})

// https://github.com/netguru/frontend-recruitment-task
export class NetguruHangmanAppComponent {
  title = 'netguru-hangman works!';
  
  
}
