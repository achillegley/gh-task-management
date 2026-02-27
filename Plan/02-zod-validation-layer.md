# Comprehensive Type-Safe Validation with Zod

## Why This Feature Demonstrates Copilot

- **Schema Generation**: Copilot can infer and generate Zod schemas from TypeScript types
- **Validation Logic**: Auto-generates validation functions with proper error handling
- **API Integration**: Shows multi-file refactoring capabilities
- **Type Safety**: Demonstrates understanding of TypeScript type system

## Problem

Current validation in API routes is minimal string checking. No runtime validation against TypeScript types, leading to potential runtime errors.

## Proposed Implementation

### 1. Install Zod and Generate Schemas

```typescript
// lib/schemas.ts
import { z } from "zod";

export const taskStatusSchema = z.enum(["todo", "in-progress", "done"]);
export const taskPrioritySchema = z.enum(["low", "medium", "high"]);

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  dueDate: z.string().datetime().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const taskIdSchema = z.string().uuid();
```

### 2. Refactor API Routes with Validation

- Update `app/api/tasks/route.ts` POST handler
- Update `app/api/tasks/[id]/route.ts` PUT handler
- Add validation middleware
- Return detailed validation errors

### 3. Form-Level Validation

- Add Zod validation to `TaskForm`
- Show real-time error messages
- Type-safe form handling

### 4. Custom Validation Rules

```typescript
// Business rules like:
- Tasks due in past cannot be created
- Description required for high-priority tasks
- Maximum 100 active tasks per user (future)
```

## Files Affected

- `package.json` - Add zod dependency
- `lib/schemas.ts` - New file with all validation schemas
- `lib/validation.ts` - New file with validation utilities
- `app/api/tasks/route.ts` - Add validation
- `app/api/tasks/[id]/route.ts` - Add validation
- `components/TaskForm.tsx` - Add client-side validation
- `types/task.ts` - Update to use Zod inferred types

## Copilot Demo Scenario

### Step 1: Schema Generation (3 minutes)

Create `lib/schemas.ts`:

```
Prompt: "Based on types/task.ts, generate Zod schemas for Task, CreateTaskDTO, and UpdateTaskDTO with proper validation rules"
```

Copilot generates complete schemas with:

- Type inference
- Custom error messages
- Optional field handling
- Enum validation

### Step 2: API Integration (5 minutes)

Open `app/api/tasks/route.ts`:

```
Prompt: "Refactor POST handler to use createTaskSchema for validation and return detailed error messages"
```

Then:

```
Prompt: "Create a reusable validateRequest utility function that works with any Zod schema"
```

### Step 3: Form Validation (4 minutes)

Open `components/TaskForm.tsx`:

```
Prompt: "Add Zod validation to this form with real-time error display under each field"
```

### Step 4: Advanced Validations (3 minutes)

In `lib/schemas.ts`:

```
Prompt: "Add custom validation: dueDate must be in future, description required when priority is high"
```

### Live Demo Tips

1. Show invalid API request returning structured errors
2. Demonstrate form showing real-time validation
3. Type a title > 100 chars and show error
4. Create task with past due date and show rejection
5. Show TypeScript autocomplete with Zod inferred types

### Expected Output

- Type-safe validation layer across application
- Detailed error messages for API consumers
- Client-side validation preventing invalid submissions
- Shared schemas between client and server
- 100% type safety with runtime checks
