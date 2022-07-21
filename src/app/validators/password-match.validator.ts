import { FormGroup } from '@angular/forms';

export function PasswordMatchValitador(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors.passwordMatchValitador
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordMatchValitador: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
