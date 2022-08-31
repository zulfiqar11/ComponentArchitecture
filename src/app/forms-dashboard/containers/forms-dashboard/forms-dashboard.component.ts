import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// model
import {
  ApplicationForm,
  IndividualInfoForm,
  PersonalInfoForm,
  SectionInfoForm,
} from './../../models/application-form';

@Component({
  selector: 'app-forms-dashboard',
  styleUrls: ['forms-dashboard.component.css'],
  template: `
    <div class="header">
      <app-form-header [parent$]="form$"></app-form-header>
    </div>
    <div class="left">
      <app-form-navigation
        (load)="loadSubForm($event)"
        [parent$]="form$"
      ></app-form-navigation>
    </div>

    <div class="right">
      <div class="rightTop">
        <app-form-section
          (load)="loadSection($event)"
          [sections$]="sectionForm$"
        ></app-form-section>
      </div>
      <div class="rightBottom">
        <app-form-details
          (navigate)="loadFields($event)"
          (formValues)="loadFormValues($event)"
          [sectionCount]="sectionsFormCount"
          [personalInfoFormFields]="personalInfoFormFields"
        ></app-form-details>
      </div>
    </div>
  `,
})
export class FormsDashboardComponent implements OnInit {
  form$: Observable<ApplicationForm>;
  sectionForm$: Observable<SectionInfoForm[]>;
  sectionsForm: SectionInfoForm[];
  sectionsFormCount: number;
  personalInfoFormFields: PersonalInfoForm[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.form$ = this.http.get<ApplicationForm>(
      'http://localhost:4200/assets/dh-form-schema.json'
    );
  }

  loadSubForm(subForm: IndividualInfoForm) {
    this.personalInfoFormFields = [];
    this.sectionForm$ = of(subForm.children);
    this.sectionsForm = subForm.children;
    this.sectionsFormCount = subForm.children.length;
  }

  loadSection(section: SectionInfoForm) {
    this.personalInfoFormFields = [];
    this.personalInfoFormFields = section.children;
  }

  loadFields(sectionIndex: number) {
    this.personalInfoFormFields = this.sectionsForm[sectionIndex]?.children;
  }

  loadFormValues(formGroup: FormGroup) {
    // console.log('formValues:::', formGroup.value);
  }
}
