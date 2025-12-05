import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lib-address-input',
  templateUrl: './address-input.component.html'
})
export class AddressInputComponent implements OnInit {
  @Input() group!: FormGroup;

  ngOnInit() {
    this.group.addControl('street', new FormControl('', Validators.required));
    this.group.addControl('city', new FormControl('', Validators.required));
    this.group.addControl('zip', new FormControl('', Validators.required));
  }
}
