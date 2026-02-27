# Automated Testing Suite with Vitest and React Testing Library

## Why This Feature Demonstrates Copilot

- **Test Generation**: Copilot can auto-generate comprehensive unit tests based on existing code
- **Test-Driven Development**: Shows how Copilot suggests test cases before implementation
- **Coverage Analysis**: Demonstrates Copilot's understanding of edge cases
- **Multiple Test Types**: Unit, integration, and E2E tests

## Problem

The application currently has no automated tests, making refactoring risky and reducing confidence in deployments.

## Proposed Implementation

### 1. Setup Testing Infrastructure

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
```

### 2. Component Tests

- Test `TaskCard` rendering with different props
- Test `TaskForm` validation and submission
- Test `FilterBar` filtering logic
- Test `StatusBadge` and `PriorityBadge` styling

### 3. API Route Tests

- Test all CRUD operations in `/api/tasks`
- Test error handling and edge cases
- Test validation logic

### 4. Integration Tests

- Test full user workflows
- Test data persistence
- Test component interactions

## Files Affected

- `package.json` - Add testing dependencies
- `vitest.config.ts` - New file
- `tests/setup.ts` - New file
- `tests/components/` - New directory
- `tests/api/` - New directory
- `tests/lib/` - New directory
- `.github/workflows/test.yml` - New CI workflow

## Copilot Demo Scenario

### Step 1: Setup (2 minutes)

```
Prompt: "Add vitest, @testing-library/react, and jsdom to package.json with latest versions"
Prompt: "Create a vitest.config.ts file configured for React and jsdom with path aliases"
Prompt: "Create tests/setup.ts with React Testing Library global setup"
```

### Step 2: Component Testing (5 minutes)

Open `components/TaskCard.tsx`, then create new file `tests/components/TaskCard.test.tsx`:

```
Prompt: "Generate comprehensive tests for TaskCard including rendering, status changes, edit/delete actions, and edge cases"
```

Copilot will generate complete test suite with:

- Render tests
- User interaction tests
- Props validation
- Accessibility tests

### Step 3: API Testing (5 minutes)

Open `app/api/tasks/route.ts`, create `tests/api/tasks.test.ts`:

```
Prompt: "Generate integration tests for all HTTP methods in this API route including success and error cases"
```

### Step 4: Watch Test Coverage Grow

```
Prompt: "Add test coverage reporting to vitest.config.ts"
Prompt: "Generate tests for remaining untested files"
```

### Live Demo Tips

1. Show Copilot suggesting test names as you type `it('should...`
2. Demonstrate inline test generation with Copilot Chat
3. Show how Copilot fixes failing tests
4. Generate snapshot tests with a single prompt
5. Create mock data with Copilot

### Expected Output

- 80%+ code coverage
- 50+ test cases across components, API, and utilities
- CI pipeline running tests on every PR
- Test-driven development workflow established
