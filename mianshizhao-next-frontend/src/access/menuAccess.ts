import {menus} from "../../config/menu";
import checkAccess from "@/access/checkAccess";

/**
 * 获取有权限、可以被访问的菜单(递归)
 * @param loginUser
 * @param menuItems
 */
const getAccessibleMenus = (loginUser: API.LoginUserVO,menuItems = menus) => {
    //检查菜单列表和上传上来的权限校验，把不符合条件的排除掉；
    return menuItems.filter((item) => {
        if (!checkAccess(loginUser,item.access)){
            return false;
        }
        //校验子菜单
        if (item.children){
            item.children = getAccessibleMenus(loginUser,item.children);
        }
        return true;
    });
}

export default getAccessibleMenus;