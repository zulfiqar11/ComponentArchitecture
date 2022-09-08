import { CustomValidators } from './Custom.validators';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PersonalInfoForm } from './../../models/application-form';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-form-details',
  styleUrls: ['form-details.component.css'],
  template: `
    <div class="details">
      <form [formGroup]="form">
        <div *ngFor="let field of personalInfoFormFields">
          <label>
            {{ field?.title }}:
            <label [ngStyle]="{ color: 'red' }" *ngIf="field.required">*</label>
            <input type="text" [formControlName]="field.title" />
            <label *ngIf="invalidZipCode && field.title === 'ZIP Code'"
              >Invalid zipcode: 5 numbers
            </label>
            <label *ngIf="invalidSSN && field.title === 'SSN'"
              >Invalid social security number: xxx-xx-xxxx
            </label>
            <label *ngIf="checkSalary(field.title)"
              >Invalid currency: 123.45
            </label>
          </label>
        </div>
        <div>
          {{ form.value | json }}
        </div>
        <div>
          {{ form.valid }}
        </div>

        <button [disabled]="submitEnabled()" type="submit">Submit</button>

        <div>
          <button (click)="onPrevious()">Previous</button>
          <button (click)="onNext()">Next</button>
        </div>
      </form>
    </div>
  `,
})
export class FormDetailsComponent implements OnChanges {
  @Input()
  personalInfoFormFields: PersonalInfoForm[];

  @Input()
  sectionCount: number;

  @Output()
  navigate: EventEmitter<number> = new EventEmitter();

  @Output()
  formValues: EventEmitter<FormGroup> = new EventEmitter();

  form: FormGroup = this.formBuilder.group({});

  sectionIndex = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(): void {
    this.addControls();
  }

  addControls() {
    this.form = this.formBuilder.group({});
    this.personalInfoFormFields?.forEach((field) => {
      this.form.addControl(
        field?.title,
        this.formBuilder.control('', this.ValidatorsToAdd(field))
      );
    });
  }

  ValidatorsToAdd(field: PersonalInfoForm): ValidatorFn[] {
    let ValidatorsAdded: ValidatorFn[] = [];
    if (field.required === true) {
      ValidatorsAdded.push(Validators.required);
    }

    switch (field.mask) {
      case 'zip':
        ValidatorsAdded.push(CustomValidators.checkUSAZipCode);
        break;
      case 'ssn':
        ValidatorsAdded.push(CustomValidators.checkUSAssn);
        break;
      case 'currency':
        ValidatorsAdded.push(CustomValidators.checkUSACurrency);
        break;
      default:
        break;
    }

    return ValidatorsAdded;
  }

  submitEnabled() {
    return !this.form.valid;
  }

  onPrevious() {
    this.formValues.emit(this.form);
    if (this.sectionIndex > 0) {
      this.sectionIndex = this.sectionIndex - 1;
    }
    this.navigate.emit(this.sectionIndex);
  }

  onNext() {
    this.formValues.emit(this.form);
    if (this.sectionIndex < this.sectionCount - 1) {
      this.sectionIndex = this.sectionIndex + 1;
    }
    this.navigate.emit(this.sectionIndex);
  }

  get invalidZipCode() {
    return (
      this.form?.get('ZIP Code')?.hasError('invalidZipcode') &&
      this.form?.get('ZIP Code').touched &&
      this.form?.get('ZIP Code').dirty
    );
  }
  get invalidSSN() {
    return (
      this.form?.get('SSN')?.hasError('invalidSSN') &&
      this.form?.get('SSN').touched &&
      this.form?.get('SSN').dirty
    );
  }
  checkSalary(fieldTitle: string) {
    let returnValue = false;

    switch (fieldTitle) {
      case 'Yearly gross salary':
        returnValue = this.validateCurrency(fieldTitle);
        break;
      case 'Potential Yearly bonus':
        returnValue = this.validateCurrency(fieldTitle);
        break;
      case 'Social Security Tax':
        returnValue = this.validateCurrency(fieldTitle);
        break;
      case 'Net Pay (per month)':
        returnValue = this.validateCurrency(fieldTitle);
        break;
      default:
        break;
    }

    return returnValue;
  }
  validateCurrency(fieldTitle: string): boolean {
    return (
      this.form?.get(fieldTitle)?.hasError('invalidCurrency') &&
      this.form?.get(fieldTitle).touched &&
      this.form?.get(fieldTitle).dirty
    );
  }
}
