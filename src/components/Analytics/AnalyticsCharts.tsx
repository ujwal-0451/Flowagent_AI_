import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Calendar, BarChart2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AnalyticsChartsProps {
  productivityData: Array<{ name: string; value: number }>;
  tasksCompletedData: Array<{ name: string; value: number }>;
  agentPerformanceData: Array<{ name: string; value: number }>;
}

const COLORS = ['#6366f1', '#22d3ee', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy-900 border border-navy-700 rounded-lg p-3 shadow-xl">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-cyan-400 mt-1">
          {payload[0].value}% productivity
        </p>
      </div>
    );
  }
  return null;
};

export function AnalyticsCharts({
  productivityData,
  tasksCompletedData,
  agentPerformanceData,
}: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Productivity Trend</h3>
              <p className="text-sm text-navy-400">Last 7 days</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <span>+12.5%</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={productivityData}>
              <defs>
                <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.3} />
              <XAxis
                dataKey="name"
                stroke="#627d98"
                tick={{ fill: '#627d98', fontSize: 12 }}
                axisLine={{ stroke: '#1e3a5f' }}
              />
              <YAxis
                stroke="#627d98"
                tick={{ fill: '#627d98', fontSize: 12 }}
                axisLine={{ stroke: '#1e3a5f' }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#productivityGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <BarChart2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Tasks Completed</h3>
              <p className="text-sm text-navy-400">Weekly breakdown</p>
            </div>
          </div>
          <span className="text-sm text-navy-400">743 total</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tasksCompletedData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.3} />
              <XAxis
                dataKey="name"
                stroke="#627d98"
                tick={{ fill: '#627d98', fontSize: 12 }}
                axisLine={{ stroke: '#1e3a5f' }}
              />
              <YAxis
                stroke="#627d98"
                tick={{ fill: '#627d98', fontSize: 12 }}
                axisLine={{ stroke: '#1e3a5f' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#102a43',
                  border: '1px solid #243b53',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#22d3ee' }}
              />
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Agent Performance</h3>
              <p className="text-sm text-navy-400">Efficiency breakdown</p>
            </div>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={agentPerformanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={{ stroke: '#627d98' }}
              >
                {agentPerformanceData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#102a43"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#102a43',
                  border: '1px solid #243b53',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Quick Stats</h3>
        <div className="space-y-4">
          {[
            { label: 'Self-Healing Success Rate', value: 99.2, color: 'indigo' },
            { label: 'Average Task Completion', value: 94.5, color: 'cyan' },
            { label: 'Agent Uptime', value: 98.7, color: 'emerald' },
            { label: 'Workflow Efficiency', value: 91.3, color: 'amber' },
          ].map((stat, index) => (
            <div key={stat.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-400">{stat.label}</span>
                <span className="text-sm font-medium text-white">{stat.value}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-navy-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.value}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className={cn(
                    'h-full rounded-full',
                    stat.color === 'indigo' && 'bg-indigo-500',
                    stat.color === 'cyan' && 'bg-cyan-500',
                    stat.color === 'emerald' && 'bg-emerald-500',
                    stat.color === 'amber' && 'bg-amber-500'
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
