import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ingredientGuard } from './ingredient.guard';

describe('ingredientGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ingredientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
