import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  form: FormGroup;
  countries = ['USA', 'Canada', 'UK', 'Malaysia', 'Singapore'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 -]{3,10}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      alert(JSON.stringify(this.form.value, null, 2));
    }
  }
}
