import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorStateComponent } from './error-state.component';

describe('EmptySpaceComponent', () => {
  let component: ErrorStateComponent;
  let fixture: ComponentFixture<ErrorStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorStateComponent]
    });
    fixture = TestBed.createComponent(ErrorStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
