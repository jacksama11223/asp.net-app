// Mock data for SmartLMS.AI Dashboard
export const AI_RISK_DATA = [
  { name: 'Low Risk', value: 65, color: '#10b981' },
  { name: 'Medium Risk', value: 25, color: '#f59e0b' },
  { name: 'High Risk', value: 10, color: '#ef4444' },
];

export const COURSE_TRENDS = [
  { month: 'Jan', enrollments: 450, completion: 380 },
  { month: 'Feb', enrollments: 520, completion: 410 },
  { month: 'Mar', enrollments: 610, completion: 480 },
  { month: 'Apr', enrollments: 580, completion: 510 },
  { month: 'May', enrollments: 720, completion: 590 },
  { month: 'Jun', enrollments: 850, completion: 650 },
];

export const RECENT_ACTIVITY = [
  { id: 1, user: 'John Doe', action: 'Completed Python Basics', time: '2 mins ago', type: 'achievement' },
  { id: 2, user: 'Sarah Smith', action: 'Flagged by AI: Low Engagement', time: '15 mins ago', type: 'ai_alert' },
  { id: 3, user: 'Mike Johnson', action: 'Enrolled in Advanced React', time: '1 hour ago', type: 'enrollment' },
  { id: 4, user: 'Emily Brown', action: 'Failed Quiz: UI UX Principles', time: '3 hours ago', type: 'alert' },
];

export const STATS = [
  { label: 'Total Students', value: '12,450', change: '+12%', icon: 'users' },
  { label: 'Avg. Course Progress', value: '78%', change: '+5%', icon: 'activity' },
  { label: 'Active Courses', value: '156', change: '+8', icon: 'book' },
  { label: 'AI Prediction Accuracy', value: '94.2%', change: '+1.5%', icon: 'zap' },
];
