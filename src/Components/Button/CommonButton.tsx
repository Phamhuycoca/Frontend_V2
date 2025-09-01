import React from "react";
import { Button, Flex } from "antd";

interface Props {
  icon?: string |React.ReactNode;
  onClick?: () => void;
  text: string;
  variant?: "text" | "link" | "solid" | "outlined" | "dashed" | "filled";
  type?: "text" | "link" | "dashed" | "primary" | "default";
  color?:"primary" | "default" | "danger" | "blue" | "purple" | "cyan" | "green" | "magenta" | "pink" | "red" | "orange" | "yellow" | "volcano" | "geekblue" | "lime" | "gold" | undefined;
}

export const CommonButton: React.FC<Props> = ({
  onClick,
  text = "Thêm mới",
  icon = null,
  variant = "solid",
  type = "primary",
  color="primary"
}) => {
  return (
    <Flex gap="small" wrap>
      <Button
        color={color}
        variant={variant}
        icon={icon != null && icon}
        onClick={onClick}
        type={type}
      >
        {text}
      </Button>
    </Flex>
  );
};