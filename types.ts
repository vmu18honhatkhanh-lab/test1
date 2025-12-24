
export interface EngineMetric {
  id: string;
  label: string;
  value: string | number;
  unit: string;
  trend?: number;
  icon: string;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  deadline: string;
  severity: 'warning' | 'critical' | 'low';
}

export enum NavigationTab {
  OVERVIEW = 'overview',
  DETAILS = 'details',
  HISTORY = 'history',
  SETTINGS = 'settings'
}
