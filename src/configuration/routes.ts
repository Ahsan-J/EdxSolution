import Dashboard from '../screen/Dashboard';

export interface IRouteType {
  name: string;
  component: React.SFC;
  label?: string;
}

export default [
  {
    name: 'Dashboard',
    component: Dashboard,
    label: 'Dashboard',
  },
] as Array<IRouteType>;
