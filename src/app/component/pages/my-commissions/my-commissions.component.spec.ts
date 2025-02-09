import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommissionsComponent } from './my-commissions.component';

describe('MyCommissionsComponent', () => {
  let component: MyCommissionsComponent;
  let fixture: ComponentFixture<MyCommissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCommissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
