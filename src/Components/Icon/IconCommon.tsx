import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";

const icons: Record<string, any> = {
  ...AiIcons,
  ...FaIcons,
  ...IoIcons,
};

export function renderIcon(name?: string) {
  if (!name) return null;
  const key = name.trim(); // tránh lỗi do có khoảng trắng
  const IconComponent = icons[key];
  if (!IconComponent) return <span>{key}</span>;
  return <IconComponent size={20} />;
}
