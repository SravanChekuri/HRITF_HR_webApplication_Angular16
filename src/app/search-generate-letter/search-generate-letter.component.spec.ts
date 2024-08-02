import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGenerateLetterComponent } from './search-generate-letter.component';

describe('SearchGenerateLetterComponent', () => {
  let component: SearchGenerateLetterComponent;
  let fixture: ComponentFixture<SearchGenerateLetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchGenerateLetterComponent]
    });
    fixture = TestBed.createComponent(SearchGenerateLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
