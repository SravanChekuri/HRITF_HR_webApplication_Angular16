import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFilterComponent } from './employee-filter.component';

describe('EmployeeFilterComponent', () => {
  let component: EmployeeFilterComponent;
  let fixture: ComponentFixture<EmployeeFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeFilterComponent]
    });
    fixture = TestBed.createComponent(EmployeeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
