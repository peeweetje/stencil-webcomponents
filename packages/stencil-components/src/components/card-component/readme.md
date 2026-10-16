# pv-card-component



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                      | Type                                    | Default     |
| ----------- | ----------- | ------------------------------------------------ | --------------------------------------- | ----------- |
| `clickable` | `clickable` | If true, the card behaves as a clickable element | `boolean`                               | `false`     |
| `heading`   | `heading`   | The card heading displayed in the header         | `string`                                | `''`        |
| `imageAlt`  | `image-alt` | Alt text for the card image                      | `string`                                | `''`        |
| `imageSrc`  | `image-src` | Image source displayed at the top of the card    | `string`                                | `undefined` |
| `padding`   | `padding`   | The card padding size                            | `"large" \| "medium" \| "small"`        | `'medium'`  |
| `subtitle`  | `subtitle`  | The card subtitle displayed below the heading    | `string`                                | `''`        |
| `variant`   | `variant`   | The card variant style                           | `"default" \| "elevated" \| "outlined"` | `'default'` |


## Events

| Event       | Description                              | Type                      |
| ----------- | ---------------------------------------- | ------------------------- |
| `cardClick` | Emitted when a clickable card is clicked | `CustomEvent<MouseEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
