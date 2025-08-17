import { Avatar, Badge, Col, Layout, Row, theme } from 'antd';
import Icon, { BellOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;

export const AdminHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Row justify={'end'} align={'middle'}>
          <div className='me-4' style={{cursor:'pointer'}}>
            <Badge count={90}>
            <BellOutlined
              style={{
                fontSize: '24px',
              }}
            />
          </Badge>
          </div>
          <Avatar size="large" icon={<UserOutlined />} className='me-3'/>
      </Row>
    </Header>
  );
};
