/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LettertemplateService } from './Lettertemplate.service';

describe('Service: Lettertemplate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LettertemplateService]
    });
  });

  it('should ...', inject([LettertemplateService], (service: LettertemplateService) => {
    expect(service).toBeTruthy();
  }));
});
