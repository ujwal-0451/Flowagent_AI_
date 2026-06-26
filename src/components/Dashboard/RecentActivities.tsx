import { motion } from 'framer-motion';
import {
  Bot,
  Workflow,
  CheckSquare,
  Cog,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Activity } from '../../types';

const typeConfig = {
  task: { icon: CheckSquare, color: 'cyan' },
  workflow: { icon: Workflow, color: 'indigo' },
  agent: { icon: Bot, color: 'emerald' },
  system: { icon: Cog, color: 'amber' },
} as const;

interface RecentActivitiesProps {
  activities: Activity[];
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {activities.slice(0, 5).map((activity, index) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3"
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                  config.color === 'cyan' && 'bg-cyan-500/20',
                  config.color === 'indigo' && 'bg-indigo-500/20',
                  config.color === 'emerald' && 'bg-emerald-500/20',
                  config.color === 'amber' && 'bg-amber-500/20'
                )}
              >
                <Icon
                  className={cn(
                    'w-4 h-4',
                    config.color === 'cyan' && 'text-cyan-400',
                    config.color === 'indigo' && 'text-indigo-400',
                    config.color === 'emerald' && 'text-emerald-400',
                    config.color === 'amber' && 'text-amber-400'
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{activity.action}</p>
                <p className="text-xs text-navy-400 mt-0.5 line-clamp-2">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-navy-500">{activity.user}</span>
                  <span className="w-1 h-1 rounded-full bg-navy-600" />
                  <span className="text-xs text-navy-500">{activity.timestamp}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
