import { DeleteOutlined } from "@ant-design/icons";
import { Button, type ButtonProps } from "antd";
import type React from "react";

export const DeleteButton:React.FC<ButtonProps>=(props)=>{
    return <Button variant="outlined" color="volcano" {...props} icon={<DeleteOutlined/>}>Xóa</Button>
}