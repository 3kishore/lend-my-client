import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBankerModalComponent } from './assign-banker-modal.component';

describe('AssignBankerModalComponent', () => {
  let component: AssignBankerModalComponent;
  let fixture: ComponentFixture<AssignBankerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignBankerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignBankerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
