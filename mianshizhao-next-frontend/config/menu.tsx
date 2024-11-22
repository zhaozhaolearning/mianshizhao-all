import { MenuDataItem } from "@ant-design/pro-layout";
import {CrownOutlined} from "@ant-design/icons";

//菜单列表 ts不能导入组件，但是tsx可以导入 要被导出才能被引用
export const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/question",
    name: "题目",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    name: "面试吖",
    path: "https://mianshiya.com",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
      },
    ],
  },
] as MenuDataItem[];
