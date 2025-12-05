# lib-phone-input

**Source:** `C:\Users\enting\Desktop\Projects\angular-builder\projects\my-form-components\src\lib\complex\phone-input\phone-input.component.ts`

---

## 🧩 Component Metadata
| Field | Value |
|-------|--------|
| Selector | `lib-phone-input` |
| Template | `./phone-input.component.html` |
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
  <label>Country Code</label>
  <input formControlName="countryCode" placeholder="+1"/>
  <label>Phone Number</label>
  <input formControlName="number"/>
</div>

```