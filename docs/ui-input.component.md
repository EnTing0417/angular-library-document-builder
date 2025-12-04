# ui-input

**Source:** `C:\Users\enting\Desktop\Projects\my-ui-workspace\projects\my-ui-lib\src\lib\ui-input\ui-input.component.ts`

---

## 🧩 Component Metadata
| Field | Value |
|-------|--------|
| Selector | `ui-input` |
| Template | `./ui-input.component.html` |
| Styles | `./ui-input.component.css` |

---

## 📥 Inputs
_None_

---

## 📤 Outputs
_None_

---

## 🧪 Public Properties
- **label**: `any`
- **type**: `any`
- **placeholder**: `any`
- **valueChange**: `any`
- **value**: `string`
- **disabled**: `any`
- **onChange**: `any`
- **onTouched**: `any`

---

## 🔧 Public Methods
### writeValue()
**Return:** `void`
Params:
- value: `string`

### registerOnChange()
**Return:** `void`
Params:
- fn: `any`

### registerOnTouched()
**Return:** `void`
Params:
- fn: `any`

### setDisabledState()
**Return:** `void`
Params:
- isDisabled: `boolean`

### handleInput()
**Return:** `void`
Params:
- event: `Event`


---

## 🖼 Template Preview
```html
<div class="ui-form-control">
  <label>{{ label }}</label>
  <input
    [type]="type"
    [placeholder]="placeholder"
    [value]="value"
    [disabled]="disabled"
    (input)="handleInput($event)"
  />
</div>

```