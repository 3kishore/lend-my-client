import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedClientDetailsComponent } from './accepted-client-details.component';

describe('AcceptedClientDetailsComponent', () => {
  let component: AcceptedClientDetailsComponent;
  let fixture: ComponentFixture<AcceptedClientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedClientDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
