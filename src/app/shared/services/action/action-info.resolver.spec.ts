import { TestBed } from '@angular/core/testing';

import { ActionInfoResolver } from './action-info.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActionInfoResolver', () => {
  let resolver: ActionInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    resolver = TestBed.inject(ActionInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
