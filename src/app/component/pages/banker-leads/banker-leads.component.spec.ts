import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankerLeadsComponent } from './banker-leads.component';

describe('BankerLeadsComponent', () => {
  let component: BankerLeadsComponent;
  let fixture: ComponentFixture<BankerLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankerLeadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankerLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
