# pv-modal-component



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                 | Description                                       | Type                                             | Default    |
| ---------------------- | ------------------------- | ------------------------------------------------- | ------------------------------------------------ | ---------- |
| `closeOnBackdropClick` | `close-on-backdrop-click` | If true, clicking outside the modal will close it | `boolean`                                        | `true`     |
| `closeOnEscape`        | `close-on-escape`         | If true, pressing escape key will close the modal | `boolean`                                        | `true`     |
| `isOpen`               | `is-open`                 | Controls if the modal is open                     | `boolean`                                        | `false`    |
| `modalTitle`           | `modal-title`             | Modal title displayed in header                   | `string`                                         | `''`       |
| `showCloseButton`      | `show-close-button`       | If true, close button will be shown in header     | `boolean`                                        | `true`     |
| `size`                 | `size`                    | Modal size variant                                | `"fullscreen" \| "large" \| "medium" \| "small"` | `'medium'` |


## Events

| Event        | Description                  | Type                |
| ------------ | ---------------------------- | ------------------- |
| `modalClose` | Emitted when modal is closed | `CustomEvent<void>` |
| `modalOpen`  | Emitted when modal is opened | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Programmatically close the modal

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Programmatically open the modal

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
