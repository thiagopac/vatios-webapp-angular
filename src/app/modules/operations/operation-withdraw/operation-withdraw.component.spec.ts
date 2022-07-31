import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { OperationWithdrawComponent } from './widget-operation-withdraw.component';

describe('OperationWithdrawComponent', () => {
  let component: OperationWithdrawComponent;
  let fixture: ComponentFixture<OperationWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationWithdrawComponent],
      imports: [PipesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
