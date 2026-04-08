# React Component Library

This package contains automatically generated React wrapper components for the Stencil Web Components. These components provide native React integration with proper typing, event handling and JSX support.

## Overview

This library is automatically generated from the core Stencil Web Components. It provides React developers with a native React experience while sharing the exact same implementation, styling and behavior across all frameworks.

## Benefits

✅ **Single Source of Truth** - Components are implemented once in Stencil
✅ **Native React Experience** - Proper React props, events and JSX syntax
✅ **Full TypeScript Support** - Complete type definitions for all components
✅ **Automatic Updates** - All changes from Stencil components are automatically reflected
✅ **No Duplication** - No manual React component implementation required
✅ **Consistent Behavior** - Components work exactly the same across all frameworks

## Project Structure

```
react-library/
├── src/
│   ├── Button/
│   │   ├── Button.tsx              # Auto-generated React wrapper
│   │   ├── Button.scss             # Component styles
│   │   └── Button.stories.tsx      # Storybook documentation
│   └── index.ts                    # Public exports
└── package.json
```

## Installation

```bash
# Install the package
yarn add @yourorg/react-library

# Or with npm
npm install @yourorg/react-library
```

## Usage

```tsx
import { Button } from '@yourorg/react-library';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      {/* Basic usage */}
      <Button onClick={handleClick}>
        Click Me
      </Button>

      {/* With variants */}
      <Button variant="primary" size="large">
        Primary Large Button
      </Button>

      <Button variant="secondary" disabled>
        Disabled Button
      </Button>

      <Button fullWidth>
        Full Width Button
      </Button>
    </div>
  );
}
```

## Available Components

| Component | Props | Description |
|-----------|-------|-------------|
| `<Button />` | `variant`, `size`, `disabled`, `fullWidth`, `onClick` | Interactive button component |
| `<Legend />` | `items`, `orientation` | Color legend for charts and visualizations |
| `<Table />` | `columns`, `data`, `sortable`, `paginated` | Data table component |
| `<Accordion />` | `items`, `allowMultiple` | Collapsible accordion component |

## Button Component API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `fullWidth` | `boolean` | `false` | Take full available width |
| `onClick` | `(event: Event) => void` | - | Click event handler |

## How It Works

### Automatic Generation
When Stencil builds the core web components, it automatically generates React wrapper components. Each wrapper component:

1.  Properly forwards all props to the underlying web component
2.  Correctly handles custom events with React's synthetic event system
3.  Provides full TypeScript type definitions
4.  Maintains all the original component functionality and styling

### Why This Approach

This architecture avoids the common problem of maintaining duplicate component implementations for each framework. All bug fixes, features and improvements only need to be implemented once in the core Stencil component.

## Development

```bash
# Build React library
yarn build

# Start Storybook for component documentation
yarn storybook

# Run tests
yarn test
```

## Storybook

All components are documented with interactive stories in Storybook:

```bash
# Run Storybook locally
yarn storybook
```

Storybook provides:
- Interactive component demos
- Live prop editing
- Usage examples
- Documentation
- Visual testing

## Best Practices

1. **Do not edit generated files** - Components are auto-generated, changes will be overwritten
2. **Make changes in Stencil** - All component logic belongs in the stencil-components package
3. **Use provided types** - Full TypeScript definitions are included, always use them
4. **Test in Storybook** - Always verify components work correctly in React
5. **Follow React conventions** - Use standard React patterns and event handling

## Additional Resources

- [Stencil React Integration Documentation](https://stenciljs.com/docs/react)
- [React Documentation](https://react.dev/)
- [Storybook Documentation](https://storybook.js.org/docs/)
- [Web Components in React Guide](https://react.dev/reference/react-dom/components#custom-html-elements)