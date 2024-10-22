import { TestBed } from '@angular/core/testing';

import { AddressstatecitycountryService } from './addressstatecitycountry.service';

describe('AddressstatecitycountryService', () => {
  let service: AddressstatecitycountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressstatecitycountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
