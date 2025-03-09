import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankersDetailComponent } from './bankers-detail.component';

describe('BankersDetailComponent', () => {
  let component: BankersDetailComponent;
  let fixture: ComponentFixture<BankersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankersDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
