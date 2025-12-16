# pv-table-component



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description                  | Type                      | Default     |
| -------------------- | ---------------------- | ---------------------------- | ------------------------- | ----------- |
| `columns`            | `columns`              | The table column definitions | `TableColumn[] \| string` | `undefined` |
| `data`               | `data`                 | The table data               | `any[] \| string`         | `undefined` |
| `enableRowSelection` | `enable-row-selection` | Enable row deletion          | `boolean`                 | `false`     |
| `itemsPerPage`       | `items-per-page`       | Items to display per page    | `number`                  | `5`         |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `actionDelete` |             | `CustomEvent<any>` |
| `rowClick`     |             | `CustomEvent<any>` |
| `rowSort`      |             | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
