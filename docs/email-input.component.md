# lib-email-input

**Source:** `C:\Users\enting\Desktop\Projects\angular-builder\projects\my-form-components\src\lib\simple\email-input\email-input.component.ts`

---

## 🧩 Component Metadata
| Field | Value |
|-------|--------|
| Selector | `lib-email-input` |
| Template | `./email-input.component.html` |
| Styles | `inline` |

---

## 📥 Inputs
_None_

---

## 📤 Outputs
_None_

---

## 🧪 Public Properties
- **label**: `string`
- **control**: `FormControl`

---

## 🔧 Public Methods
_None_

---

## 🖼 Template Preview
```html
<label>{{label}}</label>
<input type="email" [formControl]="control"/>
<div *ngIf="control.invalid && (control.dirty || control.touched)">
  <div *ngIf="control.errors?.['required']">{{label}} is required.</div>
  <div *ngIf="control.errors?.['email']">Invalid email format.</div>
</div>

```