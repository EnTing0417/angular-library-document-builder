# lib-checkbox-input

**Source:** `C:\Users\enting\Desktop\Projects\angular-builder\projects\my-form-components\src\lib\simple\checkbox-input\checkbox-input.component.ts`

---

## 🧩 Component Metadata
| Field | Value |
|-------|--------|
| Selector | `lib-checkbox-input` |
| Template | `./checkbox-input.component.html` |
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
<label>
  <input type="checkbox" [formControl]="control"/> {{label}}
</label>
<div *ngIf="control.invalid && (control.dirty || control.touched)">
  You must accept {{label}}.
</div>

```