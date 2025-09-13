// import { createRoot } from 'react-dom/client';
// import { StyleProvider } from '@ant-design/cssinjs';
// import { ConfigProvider} from 'antd';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { routes } from './Router/Routes.tsx';
// import { Provider } from 'react-redux';
// import { store } from './stores/store.tsx';
// import { GlobalModal } from './Components/GlobalModal/GlobalModal.tsx';
// import { GlobalAlert } from './Components/GlobalModal/GlobalAlert.tsx';
// ModuleRegistry.registerModules([AllCommunityModule]);
// createRoot(document.getElementById('root')!).render(
//   // <StrictMode>
//   <StyleProvider hashPriority="high">
//     <ConfigProvider theme={{ cssVar: { key: 'app' }, hashed: false }}>
//       <Provider store={store}>
//         <Router>
//           <Routes>
//             {routes.map((route) => {
//               if (route.children) {
//                 return (
//                   <Route key={route.path} path={route.path} element={route.element}>
//                     {route.children.map((childRoute) => (
//                       <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
//                     ))}
//                   </Route>
//                 );
//               }
//               return <Route key={route.path} path={route.path} element={route.element} />;
//             })}
//           </Routes>
//         </Router>
//         <GlobalModal/>
//         <GlobalAlert/>
//       </Provider>
//     </ConfigProvider>
//   </StyleProvider>,
//   // </StrictMode>,
// );

import { createRoot } from 'react-dom/client';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './Router/Routes.tsx';
import { Provider } from 'react-redux';
import { store } from './stores/store.tsx';
import { GlobalModal } from './Components/GlobalModal/GlobalModal.tsx';
import { GlobalAlert } from './Components/GlobalModal/GlobalAlert.tsx';
import {jwtDecode} from 'jwt-decode';
import { setMenus } from './stores/auth/menu.slice.tsx';

ModuleRegistry.registerModules([AllCommunityModule]);

const token = localStorage.getItem('access_token');
if (token) {
  try {
    const decoded: any = jwtDecode(token);
    if (decoded.menu) {
      const menus = decoded.menu.map((item: string) => JSON.parse(item));
      store.dispatch(setMenus(menus));
    }
  } catch (err) {
    console.error('Token decode error:', err);
  }
}
createRoot(document.getElementById('root')!).render(
  <StyleProvider hashPriority="high">
    <ConfigProvider theme={{ cssVar: { key: 'app' }, hashed: false }}>
      <Provider store={store}>
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
        <GlobalModal />
        <GlobalAlert />
      </Provider>
    </ConfigProvider>
  </StyleProvider>,
);
