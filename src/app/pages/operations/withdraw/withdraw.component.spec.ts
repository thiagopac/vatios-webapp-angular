import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { WithdrawComponent } from './withdraw.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('WithdrawComponent', () => {
  let component: WithdrawComponent;
  let fixture: ComponentFixture<WithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithdrawComponent],
      providers: [HttpClient, HttpHandler],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
