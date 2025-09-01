import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
interface PageHeaderProps {
  customTitles?: string;
}
const BreadcrumBase: React.FC<PageHeaderProps> = ({ customTitles }) => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    {
      title: (
        <a
          onClick={() => {
            navigate('/admin')
          }}
        >
          <HomeOutlined /> Trang quản trị
        </a>
      ),
    },
    {
      title: <a>{customTitles}</a>,
    },
  ];

  return <Breadcrumb items={breadcrumbItems} />;
};

export default BreadcrumBase;
