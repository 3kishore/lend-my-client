import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedLoansComponent } from './completed-loans.component';

describe('CompletedLoansComponent', () => {
  let component: CompletedLoansComponent;
  let fixture: ComponentFixture<CompletedLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedLoansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
