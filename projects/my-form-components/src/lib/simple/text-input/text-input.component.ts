import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-text-input',
  templateUrl: './text-input.component.html',
})
export class TextInputComponent {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() type: string = 'text';
}
