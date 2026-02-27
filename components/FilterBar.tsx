"use client";

import { TaskStatus, TaskPriority } from "@/types/task";

interface FilterBarProps {
  statusFilter: TaskStatus | "all";
  onStatusFilterChange: (status: TaskStatus | "all") => void;
  sortBy: "priority" | "dueDate" | "createdAt";
  onSortChange: (sort: "priority" | "dueDate" | "createdAt") => void;
}

export default function FilterBar({
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="status-filter"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Filter by Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(e.target.value as TaskStatus | "all")
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="sort-by"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Sort by
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) =>
              onSortChange(
                e.target.value as "priority" | "dueDate" | "createdAt",
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="createdAt">Created Date</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>
    </div>
  );
}
