import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-checkbox-input',
  templateUrl: './checkbox-input.component.html'
})
export class CheckboxInputComponent {
  @Input() label!: string;
  @Input() control!: FormControl;
}
