# lib-contact-form

**Source:** `C:\Users\enting\Desktop\Projects\angular-builder\projects\my-ui-lib\src\lib\contact-form\contact-form.component.ts`

---

## 🧩 Component Metadata
| Field | Value |
|-------|--------|
| Selector | `lib-contact-form` |
| Template | `./contact-form.component.html` |
| Styles | `./contact-form.component.css` |

---

## 📥 Inputs
_None_

---

## 📤 Outputs
_None_

---

## 🧪 Public Properties
- **form**: `FormGroup`
- **countries**: `any`

---

## 🔧 Public Methods
### onSubmit()
**Return:** `void`
Params:
_None_

---

## 🖼 Template Preview
```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" class="contact-form">
  <label>
    Street:
    <input formControlName="street">
  </label>

  <label>
    City:
    <input formControlName="city">
  </label>

  <label>
    State/Province:
    <input formControlName="state">
  </label>

  <label>
    Country:
    <select formControlName="country">
      <option value="">Select country</option>
      <option *ngFor="let c of countries" [value]="c">{{ c }}</option>
    </select>
  </label>

  <label>
    Postal Code:
    <input formControlName="postalCode">
  </label>
  <div *ngIf="form.get('postalCode')?.invalid && form.get('postalCode')?.touched" class="error">
    Postal code is required and must match format.
  </div>

  <label>
    Phone:
    <input formControlName="phone" placeholder="+1 555 555 5555">
  </label>
  <div *ngIf="form.get('phone')?.invalid && form.get('phone')?.touched" class="error">
    Phone number is required and must be valid.
  </div>

  <button type="submit" [disabled]="form.invalid">Submit</button>
</form>

<pre>{{ form.value | json }}</pre>

```