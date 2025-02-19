export const ROUTE_PATHS = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  APPLICATION_TRACKER: '/application-tracker',
  PREP_TRACKER: '/prep-tracker',
  PREP_DETAILED: '/prep-tracker/detailed/:metricId',
  COLD_OUTREACHES: '/cold-outreaches',
  DETAILED_METRIC: '/prep-tracker/detailed/:metricId',
} as const;

export const PROTECTED_ROUTES = [
  ROUTE_PATHS.DASHBOARD,
  ROUTE_PATHS.APPLICATION_TRACKER,
  ROUTE_PATHS.PREP_TRACKER,
  ROUTE_PATHS.PREP_DETAILED,
  ROUTE_PATHS.COLD_OUTREACHES,
  ROUTE_PATHS.DETAILED_METRIC,
];

export const PUBLIC_ROUTES = [
  ROUTE_PATHS.LANDING,
  ROUTE_PATHS.LOGIN,
  ROUTE_PATHS.REGISTER,
]; 