import {MenuDataItem} from "@ant-design/pro-layout";
import {CrownOutlined} from "@ant-design/icons";
import ACCESS_ENUM from "@/access/accessEnum";

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
        icon: <CrownOutlined/>,
        access: ACCESS_ENUM.ADMIN,
        children: [
            {
                path: "/admin/user",
                name: "用户管理",
                access: ACCESS_ENUM.ADMIN,
            },
        ],
    },
] as MenuDataItem[];

// 根据全部路径查找所有菜单
export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
    return findMenuItemByPath(menus, path);
}

// 传入菜单列表进行查找返回值为MenuDataItem 或者 null （path）是外面访问输入的路径
// 根据路径查找菜单（递归）
export const findMenuItemByPath = (menus: MenuDataItem[], path: string): MenuDataItem | null => {
    for (const menu of menus) {
        if (menu.path === path) {
            return menu;
        }
        if (menu.children) {
            //如果这个menu存在children
            const matchMenuItem = findMenuItemByPath(menu.children, path)
            if (matchMenuItem) {
                return matchMenuItem;
            }
        }
    }
    return null;

}

