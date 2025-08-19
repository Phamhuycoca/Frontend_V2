import { EditOutlined } from "@ant-design/icons";
import { Button, type ButtonProps } from "antd";
import type React from "react";

export const EditButton:React.FC<ButtonProps>=(props)=>{
    return<Button variant="outlined" color="orange" {...props} icon={<EditOutlined/>}>Chỉnh sửa</Button>
}