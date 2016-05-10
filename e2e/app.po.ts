export class NetguruHangmanPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('netguru-hangman-app h1')).getText();
  }
}
