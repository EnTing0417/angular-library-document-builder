import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-select-input',
  templateUrl: './select-input.component.html'
})
export class SelectInputComponent {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() options: { label: string; value: any }[] = [];
}
