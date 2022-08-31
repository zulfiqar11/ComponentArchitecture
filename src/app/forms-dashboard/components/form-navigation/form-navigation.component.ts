import {
  PersonalInfoForm,
  IndividualInfoForm,
} from './../../models/application-form';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationForm } from '../../models/application-form';

@Component({
  selector: 'app-form-navigation',
  template: `
    <div
      [ngStyle]="{
        'background-color': 'rgb(230, 229, 229)',
        border: '1px solid black'
      }"
    >
      <ul *ngFor="let mainForm of (parent$ | async)?.children">
        <li>Tree {{ mainForm.id }}</li>
        <ul *ngFor="let personalInfo of mainForm.children">
          <li>
            <button (click)="loadSubForm(personalInfo)">
              Sub Form {{ personalInfo.id }}
            </button>
          </li>
        </ul>
      </ul>
    </div>
  `,
})
export class FormNavigationComponent implements OnInit {
  @Input()
  parent$: Observable<ApplicationForm>;

  @Output()
  load: EventEmitter<IndividualInfoForm> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  loadSubForm(individualInfo: IndividualInfoForm) {
    this.load.emit(individualInfo);
  }
}
