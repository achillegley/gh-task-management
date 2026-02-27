# Advanced Search, Filtering, and Sorting System

## Why This Feature Demonstrates Copilot

- **Complex State Management**: Multi-filter state handling
- **Query Optimization**: Efficient filtering algorithms
- **URL State Sync**: Shareable filter URLs
- **Debouncing**: Performance optimization patterns
- **Regex Generation**: Complex search patterns

## Problem

Current filtering is basic (status only). Users need powerful search across title/description, multiple filters, and sortable columns.

## Proposed Implementation

### 1. Search Component with Debouncing

```typescript
// components/SearchBar.tsx
- Full-text search across title and description
- Debounced input (300ms)
- Search history with localStorage
- Keyboard shortcuts (Cmd+K to focus)
```

### 2. Advanced Filter Panel

```typescript
// components/AdvancedFilters.tsx
- Multiple status selection (checkboxes)
- Multiple priority selection
- Date range picker for due dates
- Date range for creation dates
- "Has description" toggle
- "Overdue" quick filter
```

### 3. Sort Controls

```typescript
// components/SortControls.tsx
- Sort by: priority, due date, created date, title
- Ascending/descending toggle
- Multi-level sorting (primary + secondary)
```

### 4. URL State Persistence

```
/tasks?search=urgent&status=todo,in-progress&priority=high&sort=dueDate:asc
```

### 5. Filter Chips Display

```typescript
// components/ActiveFilters.tsx
- Show active filters as removable chips
- "Clear all filters" button
- Save filter presets
```

## Files Affected

- `components/SearchBar.tsx` - New file
- `components/AdvancedFilters.tsx` - New file
- `components/SortControls.tsx` - New file
- `components/ActiveFilters.tsx` - New file
- `hooks/useTaskFilters.ts` - New custom hook
- `hooks/useDebounce.ts` - New utility hook
- `lib/filtering.ts` - New filtering utilities
- `app/page.tsx` - Integrate new components
- `components/FilterBar.tsx` - Expand significantly

## Copilot Demo Scenario

### Step 1: Debounced Search (4 minutes)

Create `hooks/useDebounce.ts`:

```
Prompt: "Create a generic useDebounce hook with TypeScript that delays value updates by specified milliseconds"
```

Create `components/SearchBar.tsx`:

```
Prompt: "Create a search bar component with debounced input, search icon, clear button, and keyboard shortcut support (Cmd+K)"
```

### Step 2: Advanced Filters (6 minutes)

Create `components/AdvancedFilters.tsx`:

```
Prompt: "Create an advanced filter panel with: multi-select checkboxes for status and priority, date range pickers for due date and created date, toggle for 'has description', and quick filter buttons"
```

### Step 3: Complex Filtering Logic (5 minutes)

Create `lib/filtering.ts`:

```
Prompt: "Create filtering functions that handle: full-text search across multiple fields, multiple status/priority selection, date range filtering, and combining all filters efficiently"
```

### Step 4: URL State Sync (5 minutes)

Create `hooks/useTaskFilters.ts`:

```
Prompt: "Create a custom hook that syncs filter state with URL search params using Next.js useRouter and useSearchParams"
```

### Step 5: Filter Chips UI (3 minutes)

Create `components/ActiveFilters.tsx`:

```
Prompt: "Create a component that displays active filters as removable chips with count badge and clear all button"
```

### Live Demo Tips

1. Type in search and show debouncing (no API calls until typing stops)
2. Select multiple filters and show URL updating
3. Share URL with colleague showing same filters
4. Show "Clear all" removing all chips
5. Demonstrate Cmd+K keyboard shortcut
6. Show search highlighting in results
7. Filter combinations (e.g., "high priority overdue tasks")

### Expected Output

- Powerful search matching Google-level UX
- Shareable filter URLs
- Performant with 1000+ tasks
- Intuitive filter UI
- Keyboard navigation support
