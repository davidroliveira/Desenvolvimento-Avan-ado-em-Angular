import { BrowserModule }                from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule }                     from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent }                 from './app.component';
import { DynamicFormComponent }         from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, DynamicFormComponent, DynamicFormQuestionComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
})
export class AppModule {
  constructor() {
  }
}
