import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AdminAuthService } from 'src/app/services/admin-auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminType } from 'src/app/services/admin-auth/admin-auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  //utilizar em caso de demonstrações públicas e pitches
  defaultAuth: any = {
    email: '',
    password: '',
  };

  loginForm: UntypedFormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private adminAuthService: AdminAuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.adminAuthService.isLoading$;
    // redirect to home if already logged in
    if (this.adminAuthService.currentAdminUserValue) {
      this.router.navigate(['/data-management/home']);
    }
  }

  ngOnInit(): void {
    this.initForm();

    // console.log("isLoading$", this.isLoading$);

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] ||
      '/data-management/home';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ]),
      ],
      remember: [null],
    });
  }

  submit() {
    this.hasError = false;
    const loginSubscr = this.adminAuthService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((user: AdminType | undefined) => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
