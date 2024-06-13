import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appAdultAgeValidator]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: AdultAgeValidatorDirective, multi: true }]
})
export class AdultAgeValidatorDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    const minAge = 18;
    const minAgeDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

    if (birthDate > minAgeDate) {
      return { 'underage': true };
    }
    return null;
  }

}
