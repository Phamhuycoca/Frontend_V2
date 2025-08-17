import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={{ cssVar: { key: 'app' }, hashed: false }}>
        <App />
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>
);
