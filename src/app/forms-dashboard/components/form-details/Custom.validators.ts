import { PersonalInfoForm } from '../../models/application-form';
import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static checkUSAZipCode(control: AbstractControl) {
    const regex = /^\d{5}[-\s]?(?:\d{4})?$/gm;
    const valid = regex.test(control.value);
    return valid ? null : { invalidZipcode: true };
  }
  static checkUSAssn(control: AbstractControl) {
    const regex = new RegExp(
      '^(?!000)(?!666)(?!9)\\d{3}[- ]?(?!00)\\d{2}[- ]?(?!0000)\\d{4}$'
    );
    const valid = regex.test(control.value);
    return valid ? null : { invalidSSN: true };
  }

  static checkUSACurrency(control: AbstractControl) {
    const regex = new RegExp('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*.[0-9]{2}$');
    const valid = regex.test(control.value);
    return valid ? null : { invalidCurrency: true };
  }
}
