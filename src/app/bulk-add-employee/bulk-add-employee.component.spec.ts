import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkAddEmployeeComponent } from './bulk-add-employee.component';

describe('BulkAddEmployeeComponent', () => {
  let component: BulkAddEmployeeComponent;
  let fixture: ComponentFixture<BulkAddEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkAddEmployeeComponent]
    });
    fixture = TestBed.createComponent(BulkAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
