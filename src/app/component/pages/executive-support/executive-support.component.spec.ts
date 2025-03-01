import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveSupportComponent } from './executive-support.component';

describe('ExecutiveSupportComponent', () => {
  let component: ExecutiveSupportComponent;
  let fixture: ComponentFixture<ExecutiveSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
