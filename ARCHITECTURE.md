# Task Manager - Architecture Documentation

## 📐 System Architecture

### Overview

This Task Manager is built using a **3-tier architecture**:

1. **Presentation Layer** (Frontend)
   - React components built with Next.js 14 App Router
   - Client-side state management with React hooks
   - Tailwind CSS for styling

2. **Application Layer** (API Routes)
   - Next.js API routes handling HTTP requests
   - RESTful API design
   - Server-side only execution

3. **Data Layer** (Mock Database)
   - JSON file storage (temporary)
   - Abstracted CRUD operations
   - Easy to replace with real database

### Component Hierarchy

```
app/page.tsx (Main Dashboard - Client Component)
  ├─ FilterBar (Client Component)
  │   └─ Filter and sort controls
  ├─ TaskCard (Client Component)
  │   ├─ StatusBadge (Server Component)
  │   ├─ PriorityBadge (Server Component)
  │   └─ Action buttons
  └─ TaskForm (Client Component)
      └─ Form inputs and validation
```

## 🔄 Data Flow

### Creating a Task

```
User Input (TaskForm)
  ↓
handleCreateTask() → POST /api/tasks
  ↓
API Route validates input
  ↓
lib/tasks.ts → createTask()
  ↓
Write to data/tasks.json
  ↓
Return new task
  ↓
Frontend fetches all tasks
  ↓
Re-render with new data
```

### Updating a Task

```
User Action (TaskCard)
  ↓
handleUpdateTask() → PUT /api/tasks/[id]
  ↓
API Route receives update
  ↓
lib/tasks.ts → updateTask()
  ↓
Update data/tasks.json
  ↓
Return updated task
  ↓
Frontend refetches tasks
  ↓
UI updates
```

## 🗃️ Data Model

### Task Entity

```typescript
interface Task {
  id: string; // Unique identifier (timestamp + random)
  title: string; // Task name (required)
  description?: string; // Optional details
  status: TaskStatus; // "todo" | "in-progress" | "done"
  priority: TaskPriority; // "low" | "medium" | "high"
  dueDate?: string; // ISO date string (optional)
  createdAt: string; // ISO timestamp of creation
}
```

### DTO (Data Transfer Objects)

```typescript
// For creating tasks
interface CreateTaskDTO {
  title: string;
  description?: string;
  status?: TaskStatus; // Default: "todo"
  priority?: TaskPriority; // Default: "medium"
  dueDate?: string;
}

// For updating tasks
interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}
```

## 🛠️ Key Design Patterns

### 1. Repository Pattern

The `lib/tasks.ts` file acts as a repository, abstracting data access:

- Centralizes all data operations
- Easy to mock for testing
- Simple to replace with database calls

### 2. Component Composition

Small, focused components that compose into larger features:

- `StatusBadge` + `PriorityBadge` = reusable indicators
- `TaskCard` = composition of badges + actions
- `TaskForm` = reusable for create and edit

### 3. API Route Handlers

Standard RESTful endpoints following HTTP conventions:

- GET = Retrieve
- POST = Create
- PUT = Update
- DELETE = Remove

### 4. Client-Server Separation

- Server components by default (better performance)
- Client components only when interactivity needed
- API calls never from Server Components directly

## 🔒 Security Considerations

### Current Implementation

- File operations are server-side only (Next.js API routes)
- Input validation on API routes
- TypeScript ensures type safety

### What to Add Later

- [ ] Authentication (NextAuth.js)
- [ ] Authorization (role-based access)
- [ ] Rate limiting
- [ ] Input sanitization (XSS prevention)
- [ ] CSRF protection
- [ ] SQL injection prevention (when using DB)

## 🚀 Migration Path to Database

### Option 1: PostgreSQL + Prisma

**Step 1: Install dependencies**

```bash
npm install prisma @prisma/client
npm install -D prisma
```

**Step 2: Initialize Prisma**

```bash
npx prisma init
```

**Step 3: Define schema** (`prisma/schema.prisma`)

```prisma
model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      String   @default("todo")
  priority    String   @default("medium")
  dueDate     DateTime?
  createdAt   DateTime @default(now())
  userId      String?  // For future auth
}
```

**Step 4: Replace lib/tasks.ts**

```typescript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllTasks() {
  return await prisma.task.findMany();
}

export async function createTask(data: CreateTaskDTO) {
  return await prisma.task.create({ data });
}
// ... etc
```

**Step 5: Make API routes async**

```typescript
export async function GET() {
  const tasks = await getAllTasks();
  return NextResponse.json(tasks);
}
```

### Option 2: MongoDB + Mongoose

**Step 1: Install**

```bash
npm install mongoose
```

**Step 2: Create model**

```typescript
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: "todo" },
  priority: { type: String, default: "medium" },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now },
});

export const TaskModel = mongoose.model("Task", taskSchema);
```

**Step 3: Update lib/tasks.ts**

```typescript
export async function getAllTasks() {
  return await TaskModel.find().lean();
}
```

### Option 3: Supabase (PostgreSQL + Real-time)

**Step 1: Install**

```bash
npm install @supabase/supabase-js
```

**Step 2: Initialize client**

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);
```

**Step 3: Update operations**

```typescript
export async function getAllTasks() {
  const { data } = await supabase.from("tasks").select("*");
  return data;
}
```

## 📊 State Management

### Current Approach: Local State

Using React's `useState` and `useEffect`:

- Simple and sufficient for this app size
- All state in main page component
- Refetch after mutations

### When to Upgrade

Consider more sophisticated state management when:

- App grows beyond 5-10 pages
- Need shared state across many components
- Implementing real-time updates
- Adding offline support

### Options for Later

- **React Context** - Built-in, good for medium apps
- **Zustand** - Lightweight, simple API
- **Redux Toolkit** - Full-featured, great for large apps
- **TanStack Query** - Best for server state management
- **Jotai** - Atomic state management

## 🧪 Testing Strategy

### Unit Tests

```typescript
// Example: Testing task utilities
import { createTask } from "@/lib/tasks";

describe("createTask", () => {
  it("should create task with defaults", () => {
    const task = createTask({ title: "Test" });
    expect(task.status).toBe("todo");
    expect(task.priority).toBe("medium");
  });
});
```

### Integration Tests

```typescript
// Example: Testing API routes
import { GET, POST } from "@/app/api/tasks/route";

describe("/api/tasks", () => {
  it("GET should return all tasks", async () => {
    const response = await GET();
    const tasks = await response.json();
    expect(Array.isArray(tasks)).toBe(true);
  });
});
```

### E2E Tests (Playwright)

```typescript
test("create new task", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.click("text=Create New Task");
  await page.fill("[name=title]", "Test Task");
  await page.click("text=Create Task");
  await expect(page.locator("text=Test Task")).toBeVisible();
});
```

## 🎨 Styling Architecture

### Tailwind CSS Approach

- Utility-first classes
- No custom CSS files (except globals.css)
- Responsive design with breakpoint prefixes
- Consistent color and spacing system

### Design Tokens

```javascript
// Defined in tailwind.config.js
colors: {
  primary: blue,
  success: green,
  danger: red,
  warning: yellow
}
```

### Component-Specific Styles

Inline with Tailwind classes:

- Co-located with component logic
- Easy to see all styles
- No class name conflicts
- Dead code elimination

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Implementation

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>
```

## 🔧 Development Workflow

### Local Development

```bash
nvm use 22.14.0  # Set Node version
npm run dev      # Start dev server
# Make changes
# Hot reload happens automatically
```

### Adding a New Feature

1. **Define types** (if needed) in `/types`
2. **Create data function** in `/lib` (if needed)
3. **Add API route** in `/app/api` (if needed)
4. **Create component** in `/components`
5. **Integrate** in page
6. **Test manually**
7. **Write tests** (when test suite is set up)

### Code Quality

```bash
npm run lint     # Check for issues
npm run build    # Ensure production build works
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

- **Netlify**: Works with Next.js
- **Railway**: Good for apps with databases
- **AWS Amplify**: Full AWS integration
- **Self-hosted**: Use Docker + Node.js

### Environment Variables

When deploying, set:

```
DATABASE_URL=...        # When using real DB
NEXTAUTH_SECRET=...     # When adding auth
NEXTAUTH_URL=...        # When adding auth
```

## 📈 Performance Optimizations

### Current

- ✅ Server Components by default
- ✅ Tailwind CSS tree-shaking
- ✅ Next.js automatic code splitting
- ✅ Image optimization (if using next/image)

### Future Improvements

- [ ] Implement pagination for large lists
- [ ] Add React.memo to expensive components
- [ ] Use dynamic imports for heavy components
- [ ] Implement service worker for offline support
- [ ] Add CDN for static assets
- [ ] Enable Next.js incremental static regeneration

## 🤝 Contributing Guidelines

### Code Style

- Use TypeScript everywhere
- Follow functional component patterns
- Keep components small and focused
- Add comments for complex logic
- Use descriptive variable names

### Git Workflow

```bash
git checkout -b feature/task-search
# Make changes
git commit -m "feat: add task search functionality"
git push origin feature/task-search
# Create pull request
```

### Commit Message Convention

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance

---

This architecture is designed to be **beginner-friendly** yet **production-ready**, with a clear **migration path** to more sophisticated solutions as your needs grow.
