import { motion } from 'framer-motion';
import {
  Workflow as WorkflowIcon,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const workflows = [
  {
    id: 'w1',
    name: 'Customer Onboarding Pipeline',
    status: 'healthy',
    efficiency: 94.7,
    selfHealingEvents: 12,
    tasksActive: 8,
    tasksCompleted: 156,
    lastOptimized: '5 minutes ago',
    agents: 3,
  },
  {
    id: 'w2',
    name: 'Data Processing ETL',
    status: 'healthy',
    efficiency: 98.2,
    selfHealingEvents: 3,
    tasksActive: 12,
    tasksCompleted: 890,
    lastOptimized: '1 hour ago',
    agents: 2,
  },
  {
    id: 'w3',
    name: 'Invoice Generation',
    status: 'degraded',
    efficiency: 78.5,
    selfHealingEvents: 8,
    tasksActive: 5,
    tasksCompleted: 234,
    lastOptimized: '30 minutes ago',
    agents: 2,
  },
  {
    id: 'w4',
    name: 'Support Ticket Routing',
    status: 'healthy',
    efficiency: 91.3,
    selfHealingEvents: 15,
    tasksActive: 24,
    tasksCompleted: 1245,
    lastOptimized: '15 minutes ago',
    agents: 4,
  },
];

const statusConfig = {
  healthy: { icon: CheckCircle2, color: 'emerald', label: 'Healthy' },
  degraded: { icon: AlertTriangle, color: 'amber', label: 'Degraded' },
  critical: { icon: AlertTriangle, color: 'red', label: 'Critical' },
};

export function WorkflowVisualization() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
            <input
              type="text"
              placeholder="Search workflows..."
              className="input pl-10 pr-4 py-2 w-64"
            />
          </div>
          <button className="btn-ghost flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow, index) => {
          const config = statusConfig[workflow.status as keyof typeof statusConfig];
          const Icon = config.icon;

          return (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-hover p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      config.color === 'emerald' && 'bg-emerald-500/20 border border-emerald-500/30',
                      config.color === 'amber' && 'bg-amber-500/20 border border-amber-500/30',
                      config.color === 'red' && 'bg-red-500/20 border border-red-500/30'
                    )}
                  >
                    <WorkflowIcon
                      className={cn(
                        'w-6 h-6',
                        config.color === 'emerald' && 'text-emerald-400',
                        config.color === 'amber' && 'text-amber-400',
                        config.color === 'red' && 'text-red-400'
                      )}
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">{workflow.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Icon
                        className={cn(
                          'w-3.5 h-3.5',
                          config.color === 'emerald' && 'text-emerald-400',
                          config.color === 'amber' && 'text-amber-400',
                          config.color === 'red' && 'text-red-400'
                        )}
                      />
                      <span
                        className={cn(
                          'text-xs font-medium',
                          config.color === 'emerald' && 'text-emerald-400',
                          config.color === 'amber' && 'text-amber-400',
                          config.color === 'red' && 'text-red-400'
                        )}
                      >
                        {config.label}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="nav-item p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-navy-900/30 rounded-lg p-3">
                  <p className="text-xs text-navy-400">Efficiency</p>
                  <p className="text-xl font-bold text-white mt-1">{workflow.efficiency}%</p>
                </div>
                <div className="bg-navy-900/30 rounded-lg p-3">
                  <p className="text-xs text-navy-400">Active Tasks</p>
                  <p className="text-xl font-bold text-white mt-1">{workflow.tasksActive}</p>
                </div>
                <div className="bg-navy-900/30 rounded-lg p-3">
                  <p className="text-xs text-navy-400">Agents</p>
                  <p className="text-xl font-bold text-white mt-1">{workflow.agents}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-navy-400">
                    <Clock className="w-3 h-3" />
                    <span>{workflow.lastOptimized}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-indigo-400">
                    <RotateCcw className="w-3 h-3" />
                    <span>{workflow.selfHealingEvents} auto-heals</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-navy-800/50">
                <button className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Run
                </button>
                <button className="btn-secondary flex-1 text-sm py-2">
                  View Details
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
