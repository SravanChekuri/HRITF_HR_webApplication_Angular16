import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(control: AbstractControl): ValidationErrors | null {
    
  if (!control.value) {
    return null;
  }

  const date = new Date(control.value);
  const day = date.getDay();
  const year = date.getFullYear();
  // Check if it's a Saturday (6) or Sunday (0)
  if (day === 6 || day === 0) {
    return { invalidDate: true };
  }

  return null;
}


