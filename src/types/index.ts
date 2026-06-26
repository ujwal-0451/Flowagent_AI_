export interface Agent {
  id: string;
  name: string;
  type: 'automation' | 'analysis' | 'support' | 'integration';
  status: 'online' | 'offline' | 'busy' | 'warning';
  efficiency: number;
  tasksCompleted: number;
  lastActive: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: Agent;
  dueDate: string;
  tags: string[];
  workflowId?: string;
}

export interface WorkflowNode {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'warning';
  type: 'start' | 'process' | 'decision' | 'action' | 'end';
  x: number;
  y: number;
  progress?: number;
  assignedAgent?: Agent;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface Workflow {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'critical';
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  efficiency: number;
  selfHealingEvents: number;
  lastOptimized: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface Activity {
  id: string;
  action: string;
  description: string;
  user: string;
  timestamp: string;
  type: 'task' | 'workflow' | 'agent' | 'system';
}

export interface MetricCard {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: 'indigo' | 'cyan' | 'emerald' | 'amber';
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

export type NavItem = {
  id: string;
  label: string;
  icon: string;
  badge?: number;
};
