import { motion } from 'framer-motion';
import {
  Activity,
  Cog,
  MessageSquare,
  Link2,
  MoreVertical,
  Power,
  Pause,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Agent } from '../../types';

const typeConfig = {
  automation: { icon: Cog, color: 'indigo' },
  analysis: { icon: Activity, color: 'cyan' },
  support: { icon: MessageSquare, color: 'emerald' },
  integration: { icon: Link2, color: 'amber' },
} as const;

const statusConfig = {
  online: { label: 'Online', class: 'status-online' },
  offline: { label: 'Offline', class: 'status-error' },
  busy: { label: 'Busy', class: 'status-warning' },
  warning: { label: 'Warning', class: 'status-warning' },
} as const;

interface AgentsGridProps {
  agents: Agent[];
}

export function AgentsGrid({ agents }: AgentsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent, index) => {
        const typeConf = typeConfig[agent.type];
        const statusConf = statusConfig[agent.status];
        const Icon = typeConf.icon;

        return (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="card card-hover p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      typeConf.color === 'indigo' && 'bg-indigo-500/20 border border-indigo-500/30',
                      typeConf.color === 'cyan' && 'bg-cyan-500/20 border border-cyan-500/30',
                      typeConf.color === 'emerald' && 'bg-emerald-500/20 border border-emerald-500/30',
                      typeConf.color === 'amber' && 'bg-amber-500/20 border border-amber-500/30'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-6 h-6',
                        typeConf.color === 'indigo' && 'text-indigo-400',
                        typeConf.color === 'cyan' && 'text-cyan-400',
                        typeConf.color === 'emerald' && 'text-emerald-400',
                        typeConf.color === 'amber' && 'text-amber-400'
                      )}
                    />
                  </div>
                  <div className={cn('status-dot absolute -bottom-0.5 -right-0.5', statusConf.class)} />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">{agent.name}</h4>
                  <p className="text-xs text-navy-400 capitalize">{agent.type} Agent</p>
                </div>
              </div>
              <button className="nav-item p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-400">Efficiency</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-navy-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.efficiency}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={cn(
                        'h-full rounded-full',
                        agent.efficiency >= 90 ? 'bg-emerald-500' :
                        agent.efficiency >= 70 ? 'bg-cyan-500' :
                        agent.efficiency >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      )}
                    />
                  </div>
                  <span className="text-sm font-medium text-white">{agent.efficiency}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-400">Tasks Completed</span>
                <span className="text-sm font-medium text-white">{agent.tasksCompleted}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-400">Last Active</span>
                <span className="text-xs text-navy-500">{agent.lastActive}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-navy-800/50">
              {agent.status === 'offline' ? (
                <button className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-2">
                  <Power className="w-4 h-4" />
                  Activate
                </button>
              ) : agent.status === 'busy' ? (
                <button className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-2">
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              ) : (
                <button className="btn-secondary flex-1 text-sm py-2">
                  View Details
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
