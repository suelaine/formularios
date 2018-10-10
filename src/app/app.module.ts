//import { SharedModule } from './shared/shared.module';
//import { DataFormModule } from './data-form/data-form.module';
//import { TemplateFormModule } from './template-form/template-form.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataFormModule } from './data-form/data-form.module';
//import { CampoControlErroComponent } from './shared/campo-control-erro/campo-control-erro.component';
//import { ErrorMsgComponent } from './shared/error-msg/error-msg.component';
//import { FormDebugComponent } from './shared/form-debug/form-debug.component';
//import { InputFieldComponent } from './shared/input-field/input-field.component';
//import { DataFormComponent } from './data-form/data-form.component';

@NgModule({
  declarations: [
    AppComponent,
    //DataFormComponent,
  //  CampoControlErroComponent,
//    ErrorMsgComponent,
    //FormDebugComponent,
    //InputFieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    //TemplateFormModule,
    DataFormModule
   // SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }