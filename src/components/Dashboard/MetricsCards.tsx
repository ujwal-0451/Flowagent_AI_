import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Bot,
  Zap,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const metrics = [
  {
    label: 'Active Agents',
    value: 5,
    change: 12.5,
    trend: 'up' as const,
    icon: Bot,
    color: 'indigo' as const,
    detail: 'of 6 total',
  },
  {
    label: 'Tasks Completed',
    value: 234,
    change: 8.2,
    trend: 'up' as const,
    icon: CheckCircle2,
    color: 'cyan' as const,
    detail: 'this week',
  },
  {
    label: 'Avg. Efficiency',
    value: '94.7%',
    change: 3.1,
    trend: 'up' as const,
    icon: Zap,
    color: 'emerald' as const,
    detail: 'across all agents',
  },
  {
    label: 'Avg. Response',
    value: '1.2s',
    change: -2.3,
    trend: 'down' as const,
    icon: Clock,
    color: 'amber' as const,
    detail: 'improvement',
  },
];

const colorClasses = {
  indigo: {
    bg: 'bg-indigo-500/10',
    icon: 'text-indigo-400',
    border: 'border-indigo-500/30',
    glow: 'shadow-indigo-500/20',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    icon: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    icon: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
  },
  amber: {
    bg: 'bg-amber-500/10',
    icon: 'text-amber-400',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-500/20',
  },
};

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const colors = colorClasses[metric.color];

        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="metric-card card-hover"
          >
            <div className="flex items-start justify-between">
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center',
                colors.bg,
                colors.border,
                'border'
              )}>
                <Icon className={cn('w-6 h-6', colors.icon)} />
              </div>
              <div className={cn(
                'flex items-center gap-1 text-sm font-medium',
                metric.trend === 'up' && 'text-emerald-400',
                metric.trend === 'down' && 'text-emerald-400'
              )}>
                {metric.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                {metric.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white tracking-tight">
                {metric.value}
              </p>
              <p className="text-sm text-navy-400 mt-1">{metric.label}</p>
              <p className="text-xs text-navy-500 mt-0.5">{metric.detail}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
