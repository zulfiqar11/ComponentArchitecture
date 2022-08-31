import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationForm } from '../../models/application-form';

@Component({
  selector: 'app-form-header',
  styleUrls: ['form-header.component.css'],
  template: `
    <div class="container">
      <div class="header-info" *ngIf="parent$ | async as form">
        <div>
          <b>Application Type:</b>
          {{ form.applicationType }}
        </div>
        <div>
          <b>Application Id:</b>
          {{ form.applicationInstanceId }}
        </div>
        <div>
          <b>Creation Date:</b>
          {{ form.creationDate | date: 'MM/dd/yyyy' }}
        </div>
        <div>
          <b>Update Date:</b>
          {{ form.lastUpdate | date: 'MM/dd/yyyy' }}
        </div>
      </div>
      <div class="header-button">
        <button class="submit-button">Submit</button>
      </div>
    </div>
  `,
})
export class FormHeaderComponent implements OnInit {
  @Input()
  parent$: Observable<ApplicationForm>;

  constructor() {}

  ngOnInit(): void {}
}
