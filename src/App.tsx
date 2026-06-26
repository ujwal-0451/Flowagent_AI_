import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MetricsCards } from './components/Dashboard/MetricsCards';
import { WorkflowPipeline } from './components/Dashboard/WorkflowPipeline';
import { SelfHealingEvents } from './components/Dashboard/SelfHealingEvents';
import { RecentActivities } from './components/Dashboard/RecentActivities';
import { AgentsGrid } from './components/Agents/AgentsGrid';
import { KanbanBoard } from './components/Kanban/KanbanBoard';
import { AnalyticsCharts } from './components/Analytics/AnalyticsCharts';
import { WorkflowVisualization } from './components/Workflows/WorkflowVisualization';
import { NotificationsPanel } from './components/Notifications/NotificationsPanel';
import {
  agents,
  tasks,
  mainWorkflow,
  notifications,
  activities,
  productivityData,
  tasksCompletedData,
  agentPerformanceData,
} from './data/mockData';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <MetricsCards />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <WorkflowPipeline workflow={mainWorkflow} />
              </div>
              <SelfHealingEvents />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivities activities={activities} />
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="btn-primary text-sm py-3">Create Workflow</button>
                  <button className="btn-secondary text-sm py-3">Deploy Agent</button>
                  <button className="btn-secondary text-sm py-3">View Reports</button>
                  <button className="btn-secondary text-sm py-3">Manage Tasks</button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'workflows':
        return (
          <motion.div
            key="workflows"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <WorkflowVisualization />
          </motion.div>
        );

      case 'agents':
        return (
          <motion.div
            key="agents"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-navy-400">
                Manage and monitor your AI agents
              </p>
              <button className="btn-primary flex items-center gap-2">
                Deploy New Agent
              </button>
            </div>
            <AgentsGrid agents={agents} />
          </motion.div>
        );

      case 'kanban':
        return (
          <motion.div
            key="kanban"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-navy-400">
                Drag and drop tasks to update their status
              </p>
              <button className="btn-primary flex items-center gap-2">
                Add New Task
              </button>
            </div>
            <KanbanBoard tasks={tasks} />
          </motion.div>
        );

      case 'analytics':
        return (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <AnalyticsCharts
              productivityData={productivityData}
              tasksCompletedData={tasksCompletedData}
              agentPerformanceData={agentPerformanceData}
            />
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-96"
          >
            <div className="text-center">
              <p className="text-xl text-navy-400">Coming Soon</p>
              <p className="text-sm text-navy-500 mt-2">
                This section is under development
              </p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeView={activeView} />

        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>

      <NotificationsPanel
        notifications={notifications}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      <button
        onClick={() => setShowNotifications(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-glow flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        <span className="text-white font-medium">?</span>
      </button>
    </div>
  );
}

export default App;
