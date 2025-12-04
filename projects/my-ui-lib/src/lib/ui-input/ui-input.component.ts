import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * UI Input Component
 * Works with Reactive Forms
 */
@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: UiInputComponent, multi: true }
  ]
})
export class UiInputComponent implements ControlValueAccessor {

  /** Label shown above input */
  @Input() label = '';

  /** Type of input: text, number, email */
  @Input() type = 'text';

  /** Placeholder text */
  @Input() placeholder = '';

  /** Emits value changes */
  @Output() valueChange = new EventEmitter<string>();

  value: string = '';
  disabled = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
}
