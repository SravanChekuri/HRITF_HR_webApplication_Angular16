/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NPUSService } from './NPUS.service';

describe('Service: NPUS', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NPUSService]
    });
  });

  it('should ...', inject([NPUSService], (service: NPUSService) => {
    expect(service).toBeTruthy();
  }));
});
