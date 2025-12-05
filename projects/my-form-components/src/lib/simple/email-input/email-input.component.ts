import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-email-input',
  templateUrl: './email-input.component.html'
})
export class EmailInputComponent {
  @Input() label!: string;
  @Input() control!: FormControl;
}
