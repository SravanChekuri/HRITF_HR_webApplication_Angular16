/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddEmployeeService } from './addEmployee.service';

describe('Service: AddEmployee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddEmployeeService]
    });
  });

  it('should ...', inject([AddEmployeeService], (service: AddEmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
