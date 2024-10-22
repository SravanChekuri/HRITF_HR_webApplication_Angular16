import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCardDisplayComponent } from './employee-card-display.component';

describe('EmployeeCardDisplayComponent', () => {
  let component: EmployeeCardDisplayComponent;
  let fixture: ComponentFixture<EmployeeCardDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeCardDisplayComponent]
    });
    fixture = TestBed.createComponent(EmployeeCardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
