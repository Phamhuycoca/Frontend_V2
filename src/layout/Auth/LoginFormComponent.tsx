import React from 'react';
import { Button, Checkbox, Form, Grid, Input, Typography, theme, Menu } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import AuthServices from './Services';
import { useDispatch } from 'react-redux';
import { setData } from '../../stores/auth/auth.slice';
import { jwtDecode } from 'jwt-decode';
import type { authMenu } from './Const';
import { setMenus } from '../../stores/auth/menu.slice';
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

export const LoginFormComponent: React.FC = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const onFinish = async (values: LoginFormValues) => {
    console.log('Received values of form: ', values);
    try {
      // Gọi API backend C# để login
      const response = await AuthServices.Login(values.username, values.password);

      // Lưu JWT token vào localStorage
      localStorage.setItem('access_token', response?.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      const decoded: any = jwtDecode(response?.access_token);
      console.log('Decoded JWT:', decoded);
      let menuItems: authMenu[] = [];
      if (Array.isArray(decoded.menu)) {
        menuItems = decoded.menu.map((item: string) => JSON.parse(item));
      }
      dispatch(setData({ email: decoded.email, user_id: decoded.jti, role: decoded.role }));
      dispatch(setMenus(menuItems));
      //window.location.href='/admin/nguoi-dung'
    } catch (error: any) {
      console.error('Login thất bại:', error.response?.data || error.message);
    }
  };

  const styles = {
    container: {
      margin: '0 auto',
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: '380px',
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: 'center' as const,
      width: '100%',
    },
    forgotPassword: {
      float: 'right' as const,
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: 'center',
      backgroundColor: token.colorBgContainer,
      display: 'flex',
      height: screens.sm ? '100vh' : 'auto',
      padding: screens.md ? `${token.sizeXXL}px 0px` : '0px',
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z" fill="white" />
            <path d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z" fill="white" />
            <path d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z" fill="white" />
          </svg>

          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>Welcome back to AntBlocks UI! Please enter your details below to sign in.</Text>
        </div>

        <Form<LoginFormValues>
          name="normal_login"
          initialValues={{ remember: true,username:'huypk@gmail.com',password:'Ab@123456' }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item name="username" rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" autoComplete="email" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={styles.forgotPassword} href="">
              Forgot password?
            </a>
          </Form.Item>

          <Form.Item style={{ marginBottom: '0px' }}>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Don't have an account?</Text> <Link href="">Sign up now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
