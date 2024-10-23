/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DropdownValuesService } from './dropdownValues.service';

describe('Service: DropdownValues', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DropdownValuesService]
    });
  });

  it('should ...', inject([DropdownValuesService], (service: DropdownValuesService) => {
    expect(service).toBeTruthy();
  }));
});
