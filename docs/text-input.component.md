# lib-text-input

**Source:** `C:\Users\enting\Desktop\Projects\angular-builder\projects\my-form-components\src\lib\simple\text-input\text-input.component.ts`

---

## 🧩 Component Metadata
| Field | Value |
|-------|--------|
| Selector | `lib-text-input` |
| Template | `./text-input.component.html` |
| Styles | `inline` |

---

## 📥 Inputs
- **type**: `string` = 'text'

---

## 📤 Outputs
_None_

---

## 🧪 Public Properties
- **label**: `string`
- **control**: `FormControl`
- **type**: `string`

---

## 🔧 Public Methods
_None_

---

## 🖼 Template Preview
```html
<label>{{label}}</label>
<input [formControl]="control" [type]="type"/>
<div *ngIf="control.invalid && (control.dirty || control.touched)">
  <div *ngIf="control.errors?.['required']">{{label}} is required.</div>
  <div *ngIf="control.errors?.['minlength']">
    Minimum {{control.errors['minlength'].requiredLength}} characters.
  </div>
</div>

```