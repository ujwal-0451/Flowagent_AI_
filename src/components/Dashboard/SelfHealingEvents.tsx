import { motion } from 'framer-motion';
import {
  Wand2,
  ArrowRightLeft,
  Clock,
  PieChart,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const events = [
  {
    id: 'sh1',
    type: 'task_reassignment',
    icon: ArrowRightLeft,
    title: 'Task Reassignment',
    description: 'Reassigned "Database Migration" from offline Analytics Core to Orchestrator Prime',
    impact: '+12% timeline efficiency',
    timestamp: '2 hours ago',
  },
  {
    id: 'sh2',
    type: 'timeline_optimization',
    icon: Clock,
    title: 'Timeline Optimization',
    description: 'Parallelized dependent tasks in Customer Onboarding Pipeline',
    impact: '-3 days to completion',
    timestamp: '5 hours ago',
  },
  {
    id: 'sh3',
    type: 'resource_rebalancing',
    icon: PieChart,
    title: 'Resource Rebalancing',
    description: 'Redistributed 8 tasks from overloaded Integration Hub agent',
    impact: '+8% overall throughput',
    timestamp: '1 day ago',
  },
];

const typeColors = {
  task_reassignment: 'cyan',
  timeline_optimization: 'indigo',
  resource_rebalancing: 'emerald',
} as const;

export function SelfHealingEvents() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center border border-indigo-500/30">
            <Wand2 className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Self-Healing Engine</h3>
            <p className="text-sm text-navy-400">Automatic workflow optimization</p>
          </div>
        </div>
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">Active</span>
        </motion.div>
      </div>

      <div className="space-y-3">
        {events.map((event, index) => {
          const Icon = event.icon;
          const color = typeColors[event.type as keyof typeof typeColors];

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-navy-900/30 hover:bg-navy-900/50 transition-colors group cursor-pointer"
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                  color === 'cyan' && 'bg-cyan-500/20',
                  color === 'indigo' && 'bg-indigo-500/20',
                  color === 'emerald' && 'bg-emerald-500/20'
                )}
              >
                <Icon
                  className={cn(
                    'w-4 h-4',
                    color === 'cyan' && 'text-cyan-400',
                    color === 'indigo' && 'text-indigo-400',
                    color === 'emerald' && 'text-emerald-400'
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{event.title}</p>
                  <span className="text-xs text-navy-500 shrink-0">{event.timestamp}</span>
                </div>
                <p className="text-xs text-navy-400 mt-0.5 line-clamp-2">{event.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-navy-800/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-navy-400">Total optimizations this week</p>
            <p className="text-2xl font-bold text-white">12</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-navy-400">Time saved</p>
            <p className="text-2xl font-bold text-emerald-400">8.5h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
