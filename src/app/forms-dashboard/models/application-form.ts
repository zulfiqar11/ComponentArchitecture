export interface PersonalInfoForm {
  id: string;
  type: string;
  fieldType: string;
  required: boolean;
  mask: string;
  title: string;
}

export interface SectionInfoForm {
  id: string;
  type: string;
  title: string;
  children: PersonalInfoForm[];
}

export interface IndividualInfoForm {
  id: string;
  type: string;
  title: string;
  children: SectionInfoForm[];
}

export interface PersonalInfoForm {
  id: string;
  type: string;
  title: string;
  children: IndividualInfoForm[];
}

export interface ApplicationForm {
  formId: string;
  applicationType: string;
  applicationInstanceId: string;
  creationDate: string;
  lastUpdate: string;
  children: PersonalInfoForm[];
}
