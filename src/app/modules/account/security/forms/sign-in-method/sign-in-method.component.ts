import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService, UserType } from 'src/app/modules/auth';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { UserService } from 'src/app/services/user/user.service';
import { PasswordMatchValitador } from 'src/app/validators/password-match.validator';

@Component({
  selector: 'app-sign-in-method',
  templateUrl: './sign-in-method.component.html',
})
export class SignInMethodComponent implements OnInit, OnDestroy {
  showChangePasswordForm: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  private unsubscribe: Subscription[] = [];
  private sub: Subscription;

  fg: FormGroup;
  user: UserType;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private authService: AuthService,
    private asyncPipe: AsyncPipe,
    private userService: UserService,
    private alertMessageService: AlertMessageService
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
    this.buildFormGroup();
  }

  ngOnInit(): void {
    this.user = this.asyncPipe.transform(
      this.authService.currentUserSubject.asObservable()
    )!;
  }

  buildFormGroup() {
    this.fg = this.fb.group(
      {
        current_password: [
          null,
          [Validators.required, Validators.minLength(6)],
        ],
        new_password: [null, [Validators.required, Validators.minLength(6)]],
        password_confirmation: [
          null,
          [Validators.required, Validators.minLength(6)],
        ],
      },
      {
        validator: PasswordMatchValitador(
          'new_password',
          'password_confirmation'
        ),
      }
    );
  }

  get f() {
    return this.fg.controls;
  }

  togglePasswordForm(show: boolean) {
    this.showChangePasswordForm = show;
  }

  savePassword() {
    this.isLoading$.next(true);

    this.sub = this.userService.changePassword(this.fg.value).subscribe(() => {
      this.alertMessageService.showToast(
        'Sua senha foi alterada com sucesso!',
        'success'
      );
      this.isLoading$.next(false);
      this.showChangePasswordForm = false;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
