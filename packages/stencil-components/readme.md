# Stencil Web Components

This package contains reusable web components built with Stencil.js. These components are framework agnostic and can be used in any web application regardless of the frontend framework.

## Overview

Stencil is a compiler that generates standard Web Components (Custom Elements) using modern tooling. Components created here work natively in browsers and integrate seamlessly with React, Vue, Angular, Svelte or no framework at all.

## Project Structure

```
stencil-components/
├── src/
│   ├── components/
│   │   └── button-component/
│   │       ├── button-component.tsx       # Component logic & render
│   │       ├── button-component.scss      # Component styling
│   │       └── button-component.spec.ts   # Unit tests
│   └── index.ts                           # Public exports
├── stencil.config.ts                       # Stencil configuration
└── package.json
```

## How Components Work

### 1. Component Definition

Each component is defined with the `@Component()` decorator:
```typescript
@Component({
  tag: 'my-button',                 // HTML tag name
  styleUrl: 'button-component.scss', // Stylesheet
  shadow: true                       // Enable Shadow DOM
})
export class ButtonComponent {
  // Component logic here
}
```

### 2. Properties

Use `@Prop()` decorator to define public API properties:
```typescript
// Properties are exposed as HTML attributes
@Prop() variant: 'primary' | 'secondary' = 'primary';
@Prop() size: 'small' | 'medium' | 'large' = 'medium';
@Prop() disabled: boolean = false;
@Prop() fullWidth: boolean = false;
```

These properties can be set:
- As HTML attributes: `<my-button variant="secondary" disabled>`
- As DOM properties: `button.disabled = true`
- Framework props binding: `<MyButton variant="primary" />`

### 3. Internal State

Use `@State()` for internal component state (not exposed publicly):
```typescript
@State() isHovered: boolean = false;
```

### 4. Events

Use `@Event()` to dispatch custom events:
```typescript
@Event() buttonClick: EventEmitter<void>;

handleClick() {
  this.buttonClick.emit();
}
```

Listen to events:
```html
<my-button onButtonClick={handleClick} />
```

### 5. Rendering

Components use TSX for rendering:
```typescript
render() {
  return (
    <button
      class={{
        'btn': true,
        [`btn-${this.variant}`]: true,
        [`btn-${this.size}`]: true,
        'btn-disabled': this.disabled,
        'btn-fullwidth': this.fullWidth
      }}
      disabled={this.disabled}
      onClick={() => this.handleClick()}
    >
      <slot /> {/* Content passed from outside */}
    </button>
  );
}
```

### 6. Shadow DOM

When `shadow: true` is set:
- Component styles are completely isolated
- No external CSS leaks in
- Component CSS doesn't leak out
- Uses native browser Shadow DOM implementation

## Creating New Components

### Generate Component Scaffold

Stencil CLI provides a generator to quickly create new component files:

```bash
# Generate new component
yarn generate my-new-component

# OR with full path
yarn generate components/my-new-component
```

This will automatically create:
- `my-new-component.tsx` - Component class with boilerplate
- `my-new-component.scss` - Empty stylesheet
- `my-new-component.spec.ts` - Unit test file

All files will have the correct structure, imports and decorators already set up.

### Manual Component Creation

If you prefer to create files manually:

1. **Create component directory**
```bash
mkdir src/components/my-new-component
```

2. **Create component file `my-new-component.tsx`**:
```typescript
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-new-component',
  styleUrl: 'my-new-component.scss',
  shadow: true
})
export class MyNewComponent {

  @Prop() text: string = 'Hello World';

  render() {
    return (
      <div class="new-component">
        {this.text}
      </div>
    );
  }
}
```

3. **Create stylesheet `my-new-component.scss`**
4. **Add export in `src/index.ts`**:
```typescript
export * from './components/my-new-component/my-new-component';
```

### Component Naming Rules

✅ Use `kebab-case` for HTML tag names (required by web component spec)
✅ Must contain at least one dash (e.g. `my-button` not `button`)
✅ Use unique prefix to avoid collisions with native elements
✅ Use PascalCase for class names

## Building Components

```bash
# Build components
yarn build

# Build in watch mode for development
yarn dev

# Run tests
yarn test
```

## Usage

### Directly in HTML
```html
<script type="module" src="dist/stencil-components/stencil-components.esm.js"></script>

<my-button variant="primary" size="large">Click Me</my-button>
```

### In React
React wrapper components are automatically generated and available in the `react-library` package:
```typescript
import { Button } from '@yourorg/react-library';

<Button variant="primary" size="large" onClick={handleClick}>
  Click Me
</Button>
```

## Key Features

✅ **Native Web Components** - Works everywhere
✅ **TypeScript Support** - Full type definitions
✅ **Shadow DOM** - Style encapsulation
✅ **Reactive** - Auto rerender when props/state change
✅ **Small Bundle Size** - Minimal runtime overhead
✅ **Fast Performance** - Optimized by Stencil compiler
✅ **Framework Agnostic** - Use with any frontend stack

## Available Components

| Component | Tag Name | Description |
|-----------|----------|-------------|
| Button | `<my-button>` | Interactive button component with variants, sizes and states |
| Legend | `<my-legend>` | Color legend for charts and visualizations |

## Best Practices

1. **Keep components small and focused** - One responsibility per component
2. **Use `@Prop()` for public API** - Document all properties
3. **Keep internal state minimal** - Prefer props over state where possible
4. **Write unit tests** - Test all component states and interactions
5. **Follow naming conventions** - kebab-case for tag names, PascalCase for classes
6. **Handle accessibility** - Always include ARIA attributes, proper focus states
7. **Document all events** - Specify what events the component dispatches

## Additional Resources

- [Stencil Documentation](https://stenciljs.com/docs/introduction)
- [Web Components Specification](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Shadow DOM Guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)