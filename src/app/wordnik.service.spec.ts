import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { WordnikService } from './wordnik.service';

describe('Wordnik Service', () => {
  beforeEachProviders(() => [WordnikService]);

  it('should ...',
      inject([WordnikService], (service: WordnikService) => {
    expect(service).toBeTruthy();
  }));
});
