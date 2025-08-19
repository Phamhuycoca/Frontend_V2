import { SaveOutlined } from '@ant-design/icons';
import { Button, type ButtonProps } from 'antd';

export const SaveButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
    color='blue'
    icon={<SaveOutlined/>}
     variant="outlined" {...props}>
      Lưu lại
    </Button>
  );
};
