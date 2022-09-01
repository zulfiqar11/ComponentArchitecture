import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PersonalInfoForm } from './../../models/application-form';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-form-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['form-details.component.css'],
  template: `
    <div class="details">
      <form [formGroup]="form">
        <div *ngFor="let field of personalInfoFormFields">
          <label>
            {{ field?.title }}:
            <label [ngStyle]="{ color: 'red' }" *ngIf="field.required">*</label>
            <input type="text" [formControlName]="field.title" />
            <label>{{ field?.mask }}</label>
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
}
