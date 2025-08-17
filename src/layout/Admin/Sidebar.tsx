import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Image, Layout, Menu } from 'antd';

const { Sider } = Layout;
export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={'12%'}>
      <div className="demo-logo-vertical">
        <Image
          height={60}
          width={'100%'}
          preview={false}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>
      <div
        style={{
          backgroundColor: '#fff',
          position: 'absolute',
          top: 5,
          right: -25,
          display: 'inline-block',
          textAlign: 'center',
          lineHeight: '50px',
          borderRadius: '50%',
          border: '1px solid #cccc',
          zIndex: 10,
          height: 50,
          width: 50,
          cursor:'pointer'
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          },
        ]}
      />
    </Sider>
  );
};
