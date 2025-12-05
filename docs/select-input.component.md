# lib-select-input

**Source:** `C:\Users\enting\Desktop\Projects\angular-builder\projects\my-form-components\src\lib\simple\select-input\select-input.component.ts`

---

## 🧩 Component Metadata
| Field | Value |
|-------|--------|
| Selector | `lib-select-input` |
| Template | `./select-input.component.html` |
| Styles | `inline` |

---

## 📥 Inputs
- **options**: `{ label: string`

---

## 📤 Outputs
_None_

---

## 🧪 Public Properties
- **label**: `string`
- **control**: `FormControl`
- **options**: `{ label: string; value: any }[]`

---

## 🔧 Public Methods
_None_

---

## 🖼 Template Preview
```html
<label>{{label}}</label>
<select [formControl]="control">
  <option value="">Select {{label}}</option>
  <option *ngFor="let option of options" [value]="option.value">{{option.label}}</option>
</select>
<div *ngIf="control.invalid && (control.dirty || control.touched)">
  {{label}} is required.
</div>

```