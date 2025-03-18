import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedApplicationsComponent } from './completed-applications.component';


describe('CompletedApplicationsComponent', () => {
  let component: CompletedApplicationsComponent;
  let fixture: ComponentFixture<CompletedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
