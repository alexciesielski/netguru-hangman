import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class WordnikService {

  private randomWordURL: string = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=15&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

  constructor(
    private http: Http
  ) { }

  // Retrieve random word from Wordnik
  // http://developer.wordnik.com/docs.html#!/words
  getRandomWord(): Observable<any> {
    return this.http.get(this.randomWordURL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();

    console.log('Wordnik', body.word);
    return body.word || {};
  }

  handleError(error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg);

    return Observable.throw(errMsg);
  }
}
