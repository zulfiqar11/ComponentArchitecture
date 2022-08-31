import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// controller
import { FormsDashboardComponent } from './containers/forms-dashboard/forms-dashboard.component';

// components
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { FormNavigationComponent } from './components/form-navigation/form-navigation.component';
import { FormDetailsComponent } from './components/form-details/form-details.component';
import { FormSectionComponent } from './components/form-section/form-section.component';

@NgModule({
  declarations: [
    FormsDashboardComponent,
    FormHeaderComponent,
    FormNavigationComponent,
    FormDetailsComponent,
    FormSectionComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormsDashboardComponent],
})
export class FormsDashboardModule {}
