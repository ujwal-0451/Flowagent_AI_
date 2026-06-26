import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  X,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Settings,
  Check,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Notification } from '../../types';

interface NotificationsPanelProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
}

const typeConfig = {
  info: { icon: Info, color: 'cyan' },
  success: { icon: CheckCircle, color: 'emerald' },
  warning: { icon: AlertTriangle, color: 'amber' },
  error: { icon: AlertCircle, color: 'red' },
} as const;

export function NotificationsPanel({
  notifications,
  isOpen,
  onClose,
}: NotificationsPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-navy-900 border-l border-navy-800 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-navy-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="w-5 h-5 text-white" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-[10px] font-bold text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-ghost text-xs py-1.5 px-2">
                  <Check className="w-3 h-3 mr-1" />
                  Mark all read
                </button>
                <button onClick={onClose} className="nav-item p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-2">
                {notifications.map((notification, index) => {
                  const config = typeConfig[notification.type];
                  const Icon = config.icon;

                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        'p-4 rounded-lg transition-colors cursor-pointer',
                        notification.read
                          ? 'bg-navy-900/30 hover:bg-navy-900/50'
                          : 'bg-navy-800/50 hover:bg-navy-800/70 border-l-2 border-indigo-500'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                            config.color === 'cyan' && 'bg-cyan-500/20',
                            config.color === 'emerald' && 'bg-emerald-500/20',
                            config.color === 'amber' && 'bg-amber-500/20',
                            config.color === 'red' && 'bg-red-500/20'
                          )}
                        >
                          <Icon
                            className={cn(
                              'w-4 h-4',
                              config.color === 'cyan' && 'text-cyan-400',
                              config.color === 'emerald' && 'text-emerald-400',
                              config.color === 'amber' && 'text-amber-400',
                              config.color === 'red' && 'text-red-400'
                            )}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium text-white">
                              {notification.title}
                            </p>
                            <span className="text-xs text-navy-500 shrink-0">
                              {notification.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-navy-400 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-navy-800">
              <button className="btn-ghost w-full text-sm py-2 flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                Notification Settings
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
