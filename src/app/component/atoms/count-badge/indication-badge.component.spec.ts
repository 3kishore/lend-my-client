import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicationBadgeComponent } from './indication-badge.component';

describe('IndicationBadgeComponent', () => {
  let component: IndicationBadgeComponent;
  let fixture: ComponentFixture<IndicationBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicationBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicationBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
