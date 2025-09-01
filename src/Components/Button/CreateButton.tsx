import { PlusOutlined } from '@ant-design/icons';
import { Button, type ButtonProps } from 'antd';
import React from 'react';

export const CreateButton: React.FC<ButtonProps> = (pops) => {
  return <Button variant='outlined' color='primary' {...pops} icon={<PlusOutlined/>}>Thêm mới</Button>;
};
