import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { NetguruHangmanAppComponent } from '../app/netguru-hangman.component';

beforeEachProviders(() => [NetguruHangmanAppComponent]);

describe('App: NetguruHangman', () => {
  it('should create the app',
      inject([NetguruHangmanAppComponent], (app: NetguruHangmanAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'netguru-hangman works!\'',
      inject([NetguruHangmanAppComponent], (app: NetguruHangmanAppComponent) => {
    expect(app.title).toEqual('netguru-hangman works!');
  }));
});
