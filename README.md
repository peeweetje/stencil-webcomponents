# Stencil Web Components Monorepo

This monorepo contains reusable web components built with Stencil.js, along with framework wrappers and supporting packages. These components are framework agnostic and can be used in any web application regardless of the frontend framework.

## Overview

This is a modern monorepo setup for building cross-framework UI components using native Web Components. Components are built once with Stencil.js and then automatically wrapped for React, Vue, Angular and other frameworks.

## Project Structure

```
stencil-webcomponents/
├── packages/
│   ├── stencil-components/       # Core Stencil.js Web Components
│   │   ├── src/
│   │   │   ├── components/       # All web component implementations
│   │   │   └── index.ts          # Public exports
│   │   ├── stencil.config.ts     # Stencil compiler configuration
│   │   └── package.json
│   │
│   └── react-library/            # Auto-generated React wrappers
│       ├── src/
│       │   ├── Button/           # React component wrappers
│       │   └── index.ts
│       └── package.json
│
├── package.json
├── yarn.lock
└── README.md
```

## Packages

| Package | Description |
|---------|-------------|
| `@yourorg/stencil-components` | Core native Web Components built with Stencil.js |
| `@yourorg/react-library` | React wrapper components for seamless integration |

## How It Works

### 1. Core Components
All UI components are implemented once as native Web Components using Stencil.js in the `stencil-components` package. This is the single source of truth for all component logic, styling and behavior.

### 2. Framework Wrappers
When Stencil builds the components, it automatically generates framework-specific wrapper components. These wrappers provide native framework experience with proper type definitions, event handling and props binding.

### 3. Single Source of Truth
Bug fixes, enhancements and new features are only implemented once in the Stencil components. All framework wrappers automatically receive the updates.

## Getting Started

### Installation

```bash
# Install all dependencies
yarn install
```

### Development

```bash
# Start development server for Stencil components
yarn start

# Start Storybook for React component documentation
yarn storybook

# Build all packages
yarn build

# Run all tests
yarn test
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Start Stencil dev server with watch mode |
| `yarn storybook` | Launch Storybook documentation |
| `yarn build` | Build all packages for production |
| `yarn test` | Run all unit tests |
| `yarn generate` | Generate new Stencil component scaffold |
| `yarn lint` | Run linting across all packages |

## Key Features

✅ **Native Web Components** - Works natively in all modern browsers
✅ **Framework Agnostic** - Use with React, Vue, Angular, Svelte or no framework
✅ **Single Source of Truth** - Write once, use everywhere
✅ **Full TypeScript Support** - Complete type definitions for all packages
✅ **Shadow DOM** - Complete style encapsulation
✅ **Reactive Architecture** - Auto re-render on state/props changes
✅ **Small Bundle Size** - Minimal runtime overhead
✅ **Fast Performance** - Optimized by Stencil compiler
✅ **Storybook Integration** - Interactive component documentation

## Available Components

| Component | Tag Name | Description |
|-----------|----------|-------------|
| Button | `<my-button>` | Interactive button component with variants, sizes and states |
| Legend | `<my-legend>` | Color legend for charts and visualizations |
| Table | `<my-table>` | Data table component with sorting and pagination |
| Accordion | `<my-accordion>` | Collapsible accordion component |
| Modal | `<my-modal>` | open and close modal component |

## Best Practices

1. **Implement once in Stencil** - All component logic belongs in the stencil-components package
2. **Do not duplicate code** - Framework wrappers should only contain binding logic
3. **Keep components focused** - One responsibility per component
4. **Write comprehensive tests** - Test all component states and interactions
5. **Follow naming conventions** - kebab-case for tags, PascalCase for classes
6. **Accessibility first** - Always implement proper ARIA attributes and focus states
7. **Document everything** - Document all props, events and slots

## Development Workflow

1. Make changes to Stencil components in `packages/stencil-components/src/`
2. Run `yarn start` to watch for changes and rebuild
3. Test components directly in browser or via Storybook
4. Run tests with `yarn test`
5. Commit changes and push
6. CI automatically builds and publishes packages

## Additional Resources

- [Stencil Documentation](https://stenciljs.com/docs/introduction)
- [Web Components Specification](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Shadow DOM Guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
- [Storybook Documentation](https://storybook.js.org/docs/)
- [Monorepo Best Practices](https://monorepo.tools/)