import { Layout, theme } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

export const AdminContent: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: '100vh',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>
    </>
  );
};
