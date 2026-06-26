import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  Zap,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface WorkflowPipelineProps {
  workflow: {
    id: string;
    name: string;
    status: 'healthy' | 'degraded' | 'critical';
    efficiency: number;
    selfHealingEvents: number;
    lastOptimized: string;
    nodes: Array<{
      id: string;
      name: string;
      status: string;
      type: string;
      x: number;
      y: number;
      progress?: number;
      assignedAgent?: { name: string; avatar: string };
    }>;
    edges: Array<{
      id: string;
      source: string;
      target: string;
      label?: string;
      animated?: boolean;
    }>;
  };
}

const statusColors = {
  completed: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/50',
    text: 'text-emerald-400',
    icon: CheckCircle2,
  },
  running: {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/50',
    text: 'text-cyan-400',
    icon: Loader2,
  },
  pending: {
    bg: 'bg-navy-500/20',
    border: 'border-navy-600/50',
    text: 'text-navy-400',
    icon: Clock,
  },
  warning: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/50',
    text: 'text-amber-400',
    icon: AlertTriangle,
  },
  failed: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/50',
    text: 'text-red-400',
    icon: AlertTriangle,
  },
};

export function WorkflowPipeline({ workflow }: WorkflowPipelineProps) {
  const nodePositions = new Map(workflow.nodes.map(n => [n.id, { x: n.x, y: n.y }]));

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || statusColors.pending;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">{workflow.name}</h3>
            <span
              className={cn(
                'badge',
                workflow.status === 'healthy' && 'badge-success',
                workflow.status === 'degraded' && 'badge-warning',
                workflow.status === 'critical' && 'badge-error'
              )}
            >
              {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-navy-400 mt-1">
            {workflow.efficiency}% efficiency
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">
              {workflow.selfHealingEvents} Auto-Heals
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-64 bg-navy-900/30 rounded-xl overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {workflow.edges.map((edge) => {
            const source = nodePositions.get(edge.source);
            const target = nodePositions.get(edge.target);
            if (!source || !target) return null;

            const midX = (source.x + target.x) / 2;

            return (
              <g key={edge.id}>
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  d={`M ${source.x + 60} ${source.y + 20} C ${midX} ${source.y + 20}, ${midX} ${target.y + 20}, ${target.x} ${target.y + 20}`}
                  stroke="url(#edge-gradient)"
                  strokeWidth="2"
                  fill="none"
                  className={edge.animated ? 'animate-pulse' : ''}
                  strokeDasharray={edge.animated ? '5,5' : 'none'}
                />
                {edge.label && (
                  <text
                    x={midX}
                    y={(source.y + target.y) / 2 + 15}
                    className="fill-navy-400 text-xs"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {workflow.nodes.map((node, index) => {
          const colors = getStatusColor(node.status);
          const Icon = colors.icon;

          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
              }}
              className={cn(
                'w-[120px] p-2 rounded-lg border backdrop-blur-sm',
                colors.bg,
                colors.border
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon
                  className={cn(
                    'w-4 h-4',
                    colors.text,
                    node.status === 'running' && 'animate-spin'
                  )}
                />
                <span className={cn('text-xs font-medium', colors.text)}>
                  {node.status === 'running' && `${node.progress}%`}
                </span>
              </div>
              <p className="text-xs text-white font-medium truncate">{node.name}</p>
              {node.assignedAgent && (
                <div className="flex items-center gap-1 mt-1">
                  <img
                    src={node.assignedAgent.avatar}
                    alt={node.assignedAgent.name}
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="text-[10px] text-navy-400 truncate">
                    {node.assignedAgent.name.split(' ')[0]}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy-800/50">
        <div className="flex items-center gap-4">
          {Object.entries(statusColors).slice(0, 3).map(([status, config]) => (
            <div key={status} className="flex items-center gap-2">
              <div className={cn('w-2 h-2 rounded-full', config.bg.replace('/20', ''))} />
              <span className="text-xs text-navy-400 capitalize">{status}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-navy-500">
          Last optimized {workflow.lastOptimized}
        </p>
      </div>
    </div>
  );
}
