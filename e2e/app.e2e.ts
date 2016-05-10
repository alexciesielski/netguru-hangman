import { NetguruHangmanPage } from './app.po';

describe('netguru-hangman App', function() {
  let page: NetguruHangmanPage;

  beforeEach(() => {
    page = new NetguruHangmanPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('netguru-hangman works!');
  });
});
