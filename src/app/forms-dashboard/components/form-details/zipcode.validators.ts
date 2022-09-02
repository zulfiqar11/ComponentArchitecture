import { PersonalInfoForm } from './../../models/application-form';
import { AbstractControl } from '@angular/forms';

export class ZipCodeValidators {
  static checkUSAZipCode(control: AbstractControl) {
    const regex = /^\d{5}[-\s]?(?:\d{4})?$/gm;
    const valid = regex.test(control.value);
    return valid ? null : { invalidZipcode: true };
  }
}
