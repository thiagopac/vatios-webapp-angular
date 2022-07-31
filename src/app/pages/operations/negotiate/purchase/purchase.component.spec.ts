import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PurchaseComponent } from './purchase.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PurchaseComponent', () => {
  let component: PurchaseComponent;
  let fixture: ComponentFixture<PurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseComponent],
      providers: [HttpClient, HttpHandler],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
