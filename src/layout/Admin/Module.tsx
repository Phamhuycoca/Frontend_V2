import React from 'react';

import { Layout } from 'antd';
import { AdminSidebar } from './Sidebar';
import { AdminHeader } from './Header';
import { AdminContent } from './Content';

const AdminModule: React.FC = () => {
  return (
    <Layout>
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <AdminContent />
      </Layout>
    </Layout>
  );
};

export default AdminModule;
