import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { smartGuard } from './smart.guard';

describe('smartGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => smartGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
