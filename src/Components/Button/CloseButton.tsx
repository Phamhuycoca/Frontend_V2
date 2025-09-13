import { CloseCircleFilled } from '@ant-design/icons';
import { Button, type ButtonProps } from 'antd';
import React from 'react';

export const CloseButton: React.FC<ButtonProps> = (pops) => {
  return <Button variant='outlined' color='danger' {...pops} icon={<CloseCircleFilled/>}>Đóng</Button>;
};
