import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { LastTransactionsCellComponent } from './last-transactions-cell.component';

describe('LastTransactionsCellComponent', () => {
  let component: LastTransactionsCellComponent;
  let fixture: ComponentFixture<LastTransactionsCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastTransactionsCellComponent],
      imports: [PipesModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LastTransactionsCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
