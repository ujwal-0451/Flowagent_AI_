import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Bot,
  Workflow,
  Kanban,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Zap,
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'workflows', label: 'Workflows', icon: Workflow, badge: 3 },
  { id: 'agents', label: 'AI Agents', icon: Bot },
  { id: 'kanban', label: 'Task Board', icon: Kanban },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const bottomNavItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Docs', icon: HelpCircle },
];

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-navy-900/50 border-r border-navy-800/50 flex flex-col h-screen sticky top-0"
    >
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">FlowAgent</h1>
            <p className="text-xs text-navy-400">AI Workflow Engine</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  'nav-item w-full',
                  isActive && 'nav-item-active'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left text-sm font-medium">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/20 text-cyan-400 font-medium">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="px-3 py-4 border-t border-navy-800/50 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="nav-item w-full"
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left text-sm font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="px-3 pb-4">
        <div className="bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <span className="text-sm font-bold text-white">SC</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Sarah Chen</p>
              <p className="text-xs text-navy-400">Admin</p>
            </div>
          </div>
          <button className="nav-item w-full text-xs py-2">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
