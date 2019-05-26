import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  getErrorMessageFormInput(form, input: string): string | null {
    console.log(form, input);
    if (form.hasError('required', [input])) {
      return 'You must enter a value';
    }
    if (form.hasError('email', [input])) {
      return 'Not a valid email';
    }
    if (form.hasError('minlength', [input])) {
      const { actualLength, requiredLength } = form.getError('minlength', [input]);
      return `Min length is ${requiredLength}, you enter ${actualLength}`;
    }
    return null;
  }
  getErrorMessageInput(control): string | null {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if (control.hasError('email')) {
      return 'Not a valid email';
    }
    if (control.hasError('minlength')) {
      const { actualLength, requiredLength } = control.getError('minlength');
      return `Min length is ${requiredLength}, you enter ${actualLength}`;
    }
    return null;
  }
}
