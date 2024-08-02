/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MfaOTPComponent } from './mfaOTP.component';

describe('MfaOTPComponent', () => {
  let component: MfaOTPComponent;
  let fixture: ComponentFixture<MfaOTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfaOTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfaOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
