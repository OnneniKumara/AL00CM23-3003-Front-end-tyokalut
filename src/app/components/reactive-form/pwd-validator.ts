import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export const pwdValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  const errors: ValidationErrors = {};

  if (password.value !== confirmPassword.value) {
    errors['passwordMismatch'] = true;
    confirmPassword.setErrors(errors);
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  } else {
    confirmPassword.setErrors(null);
    password.setErrors(null);
    return null;
  }
};
