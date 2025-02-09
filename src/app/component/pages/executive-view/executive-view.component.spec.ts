import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveViewComponent } from './executive-view.component';

describe('ExecutiveViewComponent', () => {
  let component: ExecutiveViewComponent;
  let fixture: ComponentFixture<ExecutiveViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
