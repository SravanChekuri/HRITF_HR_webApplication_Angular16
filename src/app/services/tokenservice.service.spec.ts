/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TokenserviceService } from './tokenservice.service';

describe('Service: Tokenservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenserviceService]
    });
  });

  it('should ...', inject([TokenserviceService], (service: TokenserviceService) => {
    expect(service).toBeTruthy();
  }));
});
