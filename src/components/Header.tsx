import { motion } from 'framer-motion';
import {
  Search,
  Bell,
  Command,
  Sparkles,
  Menu,
} from 'lucide-react';

interface HeaderProps {
  activeView: string;
}

const viewTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  workflows: 'Workflows',
  agents: 'AI Agents',
  kanban: 'Task Board',
  analytics: 'Analytics',
  settings: 'Settings',
  help: 'Help & Documentation',
};

export function Header({ activeView }: HeaderProps) {
  const title = viewTitles[activeView] || 'Dashboard';

  return (
    <header className="sticky top-0 z-40 glass border-b border-navy-800/50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden nav-item p-2">
              <Menu className="w-5 h-5" />
            </button>
            <motion.div
              key={title}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <p className="text-sm text-navy-400 mt-0.5">
                {activeView === 'dashboard' && 'Overview of your workflow operations'}
                {activeView === 'workflows' && 'Manage and visualize your workflow pipelines'}
                {activeView === 'agents' && 'Configure and monitor AI agents'}
                {activeView === 'kanban' && 'Track and manage your tasks'}
                {activeView === 'analytics' && 'Insights and performance metrics'}
              </p>
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="input pl-10 pr-4 py-2 w-64 text-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 text-navy-500">
                  <Command className="w-3 h-3" />
                  <span className="text-xs">K</span>
                </div>
              </div>
            </div>

            <button className="relative nav-item p-2">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </button>

            <button className="btn-primary flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Self-Heal</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
