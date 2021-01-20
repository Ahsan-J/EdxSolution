import Dashboard from '../screen/Dashboard';

export interface IRouteType {
  name: string;
  component: React.FC;
  label?: string;
}

export default [
  {
    name: 'Dashboard',
    component: Dashboard,
    label: 'Dashboard',
  },
] as Array<IRouteType>;
