import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Image, Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../stores/store';
import type { MenuItemType } from 'antd/es/menu/interface';
import type { MenuItem } from '../../Common/interface';
import { renderIcon } from '../../Components/Icon/IconCommon';

const { Sider } = Layout;
export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { menus } = useSelector((state: RootState) => state.menu);

  const convertMenu = (menus: MenuItem[]): MenuItemType[] => {
    return menus.map((m, idx) => {
      const hasChildren = Array.isArray(m.children) && m.children.length > 0;
      return {
        key: m.duong_dan || idx.toString(),
        icon: renderIcon(m.icon ?? ''),
        label: m.ten,
        children: hasChildren ? convertMenu(m.children ?? []) : undefined,
      };
    });
  };
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
          cursor: 'pointer',
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        onClick={(info) => {
          console.log('clicked:', info.key);
          navigate(info.key); // key chính là duong_dan
        }}
        items={convertMenu(menus)}
      />
    </Sider>
  );
};
