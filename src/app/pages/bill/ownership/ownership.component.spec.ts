import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { OwnershipComponent } from './ownership.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('OwnershipComponent', () => {
  let component: OwnershipComponent;
  let fixture: ComponentFixture<OwnershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnershipComponent],
      providers: [HttpClient, HttpHandler],
      imports: [RouterTestingModule, MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
