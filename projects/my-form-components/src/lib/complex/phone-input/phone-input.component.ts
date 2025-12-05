import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lib-phone-input',
  templateUrl: './phone-input.component.html'
})
export class PhoneInputComponent implements OnInit {
  @Input() group!: FormGroup;

  ngOnInit() {
    this.group.addControl('countryCode', new FormControl('', Validators.required));
    this.group.addControl('number', new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{7,15}$/)
    ]));
  }
}
