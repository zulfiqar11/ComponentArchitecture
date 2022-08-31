import {
  IndividualInfoForm,
  SectionInfoForm,
} from './../../models/application-form';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationForm } from '../../models/application-form';

@Component({
  selector: 'app-form-section',
  styleUrls: ['form-section.component.css'],
  template: `
    <div class="section">
      <div *ngFor="let section of sections$ | async">
        <div>
          {{ section.type }} {{ section.id }}
          <button (click)="loadSection(section)">Load</button>
        </div>
      </div>
    </div>
  `,
})
export class FormSectionComponent implements OnInit {
  @Input()
  sections$: Observable<SectionInfoForm[]>;

  @Output()
  load: EventEmitter<SectionInfoForm> = new EventEmitter();

  formSections: SectionInfoForm[];

  constructor() {}

  ngOnInit(): void {}

  loadSection(section: SectionInfoForm) {
    this.load.emit(section);
  }
}
