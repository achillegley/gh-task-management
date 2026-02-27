# Task Manager Web App

A modern, full-featured Task Manager built with Next.js 14+, TypeScript, and Tailwind CSS. This application demonstrates a clean architecture with a mock JSON database that can be easily replaced with a real backend.

## 🚀 Features

- ✅ **Create, Edit, Delete Tasks** - Full CRUD functionality
- ✅ **Status Management** - Track tasks as To Do, In Progress, or Done
- ✅ **Priority Levels** - Categorize tasks by Low, Medium, or High priority
- ✅ **Due Dates** - Set and track task deadlines
- ✅ **Filtering** - Filter tasks by status
- ✅ **Sorting** - Sort by priority, due date, or creation date
- ✅ **Statistics Dashboard** - View task counts at a glance
- ✅ **Responsive Design** - Works seamlessly on all devices
- ✅ **Modern UI** - Clean, minimal interface with Tailwind CSS

## 📁 Project Structure

```
/app
  /api
    /tasks
      route.ts          # GET (all tasks), POST (create)
      /[id]
        route.ts        # GET, PUT, DELETE (single task)
  layout.tsx
  page.tsx             # Main dashboard
  globals.css

/components
  TaskCard.tsx         # Individual task display
  TaskForm.tsx         # Create/edit task modal
  FilterBar.tsx        # Filter and sort controls
  StatusBadge.tsx      # Status indicator component
  PriorityBadge.tsx    # Priority indicator component

/lib
  tasks.ts             # Data layer utilities (CRUD operations)

/types
  task.ts              # TypeScript type definitions

/data
  tasks.json           # Mock database (JSON file)
```

## 🏗️ Architecture Overview

### Data Layer (`/lib/tasks.ts`)

- **Purpose**: Abstraction layer for data operations
- **Key Functions**:
  - `getAllTasks()` - Retrieve all tasks
  - `getTaskById(id)` - Get a single task
  - `createTask(data)` - Create new task
  - `updateTask(id, updates)` - Update existing task
  - `deleteTask(id)` - Remove task
- **Benefits**: Easy to replace with database calls later

### API Routes (`/app/api/tasks`)

- **RESTful Design**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **Server-Side Only**: File operations happen server-side for security
- **Validation**: Input validation before data operations
- **Error Handling**: Proper error responses

### Frontend Components

- **Server Components**: Used by default for better performance
- **Client Components**: Only when needed (forms, interactions)
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components are generic and reusable

## 🛠️ Getting Started

### Prerequisites

- Node.js 22.14.0 (use `nvm use 22.14.0`)
- npm

### Installation

1. **Use correct Node version**

   ```bash
   nvm use 22.14.0
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Usage

### Creating a Task

1. Click "Create New Task" button
2. Fill in the task details (title is required)
3. Select status, priority, and optionally add a due date
4. Click "Create Task"

### Managing Tasks

- **Change Status**: Use the dropdown on each task card
- **Edit Task**: Click the "Edit" button
- **Delete Task**: Click the "Delete" button (confirms before deleting)

### Filtering & Sorting

- Use the filter bar to filter by status
- Sort tasks by creation date, priority, or due date

## 🔄 Replacing JSON with a Real Database

The architecture is designed to make database migration easy:

### Step 1: Choose Your Database

Options include:

- **PostgreSQL** with Prisma ORM
- **MongoDB** with Mongoose
- **MySQL** with any ORM
- **Supabase** (PostgreSQL with real-time features)
- **Firebase Firestore**

### Step 2: Update the Data Layer

Replace `/lib/tasks.ts` with database calls:

```typescript
// Example with Prisma
import { prisma } from "@/lib/prisma";

export async function getAllTasks() {
  return await prisma.task.findMany();
}

export async function createTask(data: CreateTaskDTO) {
  return await prisma.task.create({ data });
}

// ... etc
```

### Step 3: Update API Routes (if needed)

The API routes might need to be made `async` if they aren't already:

```typescript
export async function GET() {
  const tasks = await getAllTasks(); // Now returns Promise
  return NextResponse.json(tasks);
}
```

### Step 4: Remove JSON File

Delete `/data/tasks.json` and update `.gitignore` if needed.

### What Stays the Same

- ✅ All components remain unchanged
- ✅ Frontend logic stays the same
- ✅ API route structure unchanged
- ✅ TypeScript types unchanged

## 🔐 Adding Authentication

To add authentication later:

1. **Install Auth Library**
   - NextAuth.js (recommended)
   - Clerk
   - Auth0

2. **Add User Association**
   - Add `userId` field to Task type
   - Filter tasks by current user

3. **Protect API Routes**
   ```typescript
   export async function GET(request: NextRequest) {
     const session = await getServerSession();
     if (!session) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
     // ... rest of logic
   }
   ```

## 💡 Suggested Improvements

### Features

- [ ] Drag-and-drop to reorder tasks
- [ ] Task categories/tags
- [ ] Task attachments
- [ ] Recurring tasks
- [ ] Task comments
- [ ] Task search functionality
- [ ] Dark mode toggle
- [ ] Export tasks to CSV/JSON
- [ ] Task reminders/notifications
- [ ] Collaborative tasks (assign to users)

### Technical Enhancements

- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Add E2E tests (Playwright or Cypress)
- [ ] Implement optimistic UI updates
- [ ] Add loading skeletons
- [ ] Implement infinite scroll for large task lists
- [ ] Add offline support with service workers
- [ ] Implement real-time updates with WebSockets
- [ ] Add data validation with Zod
- [ ] Implement rate limiting on API routes
- [ ] Add API documentation with Swagger

### Performance

- [ ] Implement pagination
- [ ] Add caching strategy
- [ ] Optimize images with Next.js Image
- [ ] Implement lazy loading for components

### UX Improvements

- [ ] Add keyboard shortcuts
- [ ] Toast notifications for actions
- [ ] Undo/redo functionality
- [ ] Bulk actions (delete multiple, change status)
- [ ] Quick actions menu
- [ ] Task templates

## 🛠️ Technologies Used

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library
- **Node.js File System** - JSON file handling

## 📦 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Built with ❤️ using Next.js and TypeScript**
