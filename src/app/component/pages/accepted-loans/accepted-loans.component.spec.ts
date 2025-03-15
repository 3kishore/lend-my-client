import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedLoansComponent } from './accepted-loans.component';

describe('AcceptedLoansComponent', () => {
  let component: AcceptedLoansComponent;
  let fixture: ComponentFixture<AcceptedLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedLoansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
