import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Simple
import { TextInputComponent } from './simple/text-input/text-input.component';
import { EmailInputComponent } from './simple/email-input/email-input.component';
import { CheckboxInputComponent } from './simple/checkbox-input/checkbox-input.component';
import { SelectInputComponent } from './simple/select-input/select-input.component';

// Complex
import { AddressInputComponent } from './complex/address-input/address-input.component';
import { PhoneInputComponent } from './complex/phone-input/phone-input.component';

@NgModule({
  declarations: [
    TextInputComponent,
    EmailInputComponent,
    CheckboxInputComponent,
    SelectInputComponent,
    AddressInputComponent,
    PhoneInputComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    TextInputComponent,
    EmailInputComponent,
    CheckboxInputComponent,
    SelectInputComponent,
    AddressInputComponent,
    PhoneInputComponent
  ]
})
export class MyFormComponentsModule {}
