/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OTPService } from './OTP.service';

describe('Service: OTP', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OTPService]
    });
  });

  it('should ...', inject([OTPService], (service: OTPService) => {
    expect(service).toBeTruthy();
  }));
});
