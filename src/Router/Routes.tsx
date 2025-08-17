import App from '../App';
import type { RouteConfig } from '../Common/interface';

export const routes: RouteConfig[] = [
  {
    path: '/',
    protected: false,
    element: <App />,
  },
];
