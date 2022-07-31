import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PlansComponent } from './plans.component';

describe('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlansComponent],
      imports: [PipesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
