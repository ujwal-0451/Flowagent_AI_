import { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
  Plus,
  MoreHorizontal,
  GripVertical,
  Clock,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Task } from '../../types';

const priorityConfig = {
  low: { label: 'Low', class: 'badge badge-cyan' },
  medium: { label: 'Medium', class: 'badge badge-primary' },
  high: { label: 'High', class: 'badge badge-warning' },
  critical: { label: 'Critical', class: 'badge badge-error' },
} as const;

interface KanbanBoardProps {
  tasks: Task[];
}

export function KanbanBoard({ tasks: initialTasks }: KanbanBoardProps) {
  const [tasks, setTasks] = useState(initialTasks);

  const columns = [
    { id: 'backlog', label: 'Backlog', color: 'navy' },
    { id: 'todo', label: 'To Do', color: 'indigo' },
    { id: 'in-progress', label: 'In Progress', color: 'cyan' },
    { id: 'review', label: 'Review', color: 'amber' },
    { id: 'done', label: 'Done', color: 'emerald' },
  ] as const;

  const getTasksByStatus = (status: string) =>
    tasks.filter((task) => task.status === status);

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id);

        return (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="kanban-column flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'w-3 h-3 rounded-full',
                    column.color === 'navy' && 'bg-navy-500',
                    column.color === 'indigo' && 'bg-indigo-500',
                    column.color === 'cyan' && 'bg-cyan-500',
                    column.color === 'amber' && 'bg-amber-500',
                    column.color === 'emerald' && 'bg-emerald-500'
                  )}
                />
                <h4 className="text-sm font-semibold text-white">{column.label}</h4>
                <span className="text-xs text-navy-500 bg-navy-800/50 px-2 py-0.5 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              <button className="nav-item p-1">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <Reorder.Group
              axis="y"
              values={columnTasks}
              onReorder={(newOrder) => {
                newOrder.forEach((task) => {
                  moveTask(task.id, column.id as Task['status']);
                });
              }}
              className="space-y-3 flex-1"
            >
              <AnimatePresence>
                {columnTasks.map((task) => (
                  <Reorder.Item
                    key={task.id}
                    value={task}
                    className="cursor-grab"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="kanban-card group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={priorityConfig[task.priority].class}>
                          {priorityConfig[task.priority].label}
                        </span>
                        <GripVertical className="w-4 h-4 text-navy-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <h5 className="text-sm font-medium text-white mb-2 line-clamp-2">
                        {task.title}
                      </h5>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-navy-400 bg-navy-800/50 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-navy-500">
                          <Clock className="w-3 h-3" />
                          <span>{task.dueDate}</span>
                        </div>
                        {task.assignee && (
                          <div className="flex items-center gap-2">
                            <img
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                              className="w-6 h-6 rounded-full border border-navy-700"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>

            <button className="mt-3 w-full py-2 rounded-lg border border-dashed border-navy-700 text-navy-400 text-sm hover:border-navy-600 hover:text-navy-300 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
