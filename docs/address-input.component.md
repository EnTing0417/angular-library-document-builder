# lib-address-input

**Source:** `C:\Users\enting\Desktop\Projects\angular-builder\projects\my-form-components\src\lib\complex\address-input\address-input.component.ts`

---

## 🧩 Component Metadata
| Field | Value |
|-------|--------|
| Selector | `lib-address-input` |
| Template | `./address-input.component.html` |
| Styles | `inline` |

---

## 📥 Inputs
_None_

---

## 📤 Outputs
_None_

---

## 🧪 Public Properties
- **group**: `FormGroup`

---

## 🔧 Public Methods
### ngOnInit()
**Return:** `void`
Params:
_None_

---

## 🖼 Template Preview
```html
<div [formGroup]="group">
  <label>Street</label>
  <input formControlName="street"/>
  <label>City</label>
  <input formControlName="city"/>
  <label>Zip Code</label>
  <input formControlName="zip"/>
</div>

```