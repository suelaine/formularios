import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DropdownService } from './services/dropdown.service';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { BaseFormComponent } from './base-form/base-form.component';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
    
  ],
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,    
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    //ErrorMsgComponent,
    //InputFieldComponent
  ],
  providers: [ DropdownService ]
})
export class SharedModule { }