# AI-Powered Task Suggestions and Smart Defaults

## Why This Feature Demonstrates Copilot

- **AI Integration**: Shows Copilot working with AI APIs
- **Prompt Engineering**: Demonstrates crafting effective prompts
- **Streaming Responses**: Handle real-time AI output
- **Context Awareness**: Use application state in AI prompts
- **Error Handling**: Graceful AI failures

## Problem

Users face blank canvas syndrome when creating tasks. Smart suggestions would improve task creation quality and speed.

## Proposed Implementation

### 1. Smart Task Title Suggestions

```typescript
// lib/ai/suggestions.ts
- Suggest task titles based on past tasks
- Auto-complete while typing
- Suggest related tasks
- Learn from user's task patterns
```

### 2. AI Description Generator

```typescript
// Generate task descriptions from title
// Add acceptance criteria
// Suggest subtasks
// Estimate completion time
```

### 3. Smart Priority Detection

```typescript
// Analyze title/description for urgency keywords
// Suggest priority based on due date
// Learn from user's priority patterns
```

### 4. Task Breakdown Assistant

```typescript
// Split large tasks into subtasks
// Generate checklist from description
// Suggest dependencies between tasks
```

### 5. Natural Language Task Creation

```typescript
// "Remind me to call John tomorrow at 2pm"
// → Task with due date and time
```

## Files Affected

- `lib/ai/client.ts` - New AI client (OpenAI/Anthropic)
- `lib/ai/suggestions.ts` - Suggestion generation
- `lib/ai/prompts.ts` - Prompt templates
- `app/api/ai/suggestions/route.ts` - New API endpoint
- `components/TaskForm.tsx` - Add AI features
- `components/AiSuggestions.tsx` - New suggestion UI
- `hooks/useAiSuggestions.ts` - New hook
- `.env.example` - Add AI API keys
- `types/ai.ts` - AI response types

## Copilot Demo Scenario

### Step 1: AI Client Setup (3 minutes)

Create `lib/ai/client.ts`:

```
Prompt: "Create an AI client that uses OpenAI API with streaming support, error handling, and TypeScript types. Support both chat completion and text completion"
```

### Step 2: Suggestion Prompts (4 minutes)

Create `lib/ai/prompts.ts`:

```
Prompt: "Create prompt templates for: generating task descriptions from titles, suggesting priority levels, breaking down complex tasks into subtasks, and extracting due dates from natural language"
```

### Step 3: API Endpoint (5 minutes)

Create `app/api/ai/suggestions/route.ts`:

```
Prompt: "Create an API route that accepts a task title and returns AI-generated suggestions for description, priority, and subtasks using the OpenAI streaming API"
```

### Step 4: Suggestions Hook (4 minutes)

Create `hooks/useAiSuggestions.ts`:

```
Prompt: "Create a React hook that debounces title input, calls the AI suggestions API, handles loading/error states, and streams suggestions in real-time"
```

### Step 5: UI Integration (6 minutes)

Create `components/AiSuggestions.tsx`:

```
Prompt: "Create a component that displays AI-generated task suggestions with loading skeleton, clickable suggestion cards, and the ability to accept/reject each suggestion"
```

Update `components/TaskForm.tsx`:

```
Prompt: "Add AI suggestion support to this form: show suggestions as user types title, add 'Use AI' button, and auto-fill description when suggestion is accepted"
```

### Step 6: Natural Language Parser (5 minutes)

Create `lib/ai/nlp-parser.ts`:

```
Prompt: "Create a function that uses AI to parse natural language task input like 'Call dentist tomorrow at 3pm' and extract: title, description, due date, priority, using date-fns for date parsing"
```

### Live Demo Tips

1. Type "Write monthly report" and watch AI suggest description
2. Show streaming suggestions appearing in real-time
3. Accept AI-generated description with one click
4. Type complex task and show AI breaking it into subtasks
5. Input "Fix production bug ASAP" and show AI suggesting high priority
6. Parse "Review PR #123 before Friday 5pm" into structured task
7. Show graceful fallback when AI API is down

### Expected Output

- Real-time AI suggestions while typing
- One-click task creation from natural language
- Smart priority/due date detection
- Subtask generation for complex tasks
- Learning from user patterns
- 10x faster task creation
