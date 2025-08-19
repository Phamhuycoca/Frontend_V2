import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './Router/Routes.tsx';
ModuleRegistry.registerModules([AllCommunityModule]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={{ cssVar: { key: 'app' }, hashed: false }}>
        <Router>
          <Routes>
            {routes.map((route) => {
                if (route.children) {
                  return (
                    <Route key={route.path} path={route.path} element={route.element}>
                      {route.children.map((childRoute) => (
                        <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
                      ))}
                    </Route>
                  );
                }
              return <Route key={route.path} path={route.path} element={route.element} />;
            })}
          </Routes>
        </Router>
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
);
