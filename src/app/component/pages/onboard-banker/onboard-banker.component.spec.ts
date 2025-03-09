import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardBankerComponent } from './onboard-banker.component';

describe('OnboardBankerComponent', () => {
  let component: OnboardBankerComponent;
  let fixture: ComponentFixture<OnboardBankerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardBankerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardBankerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
