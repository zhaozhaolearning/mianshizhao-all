import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {findAllMenuItemByPath} from "../../config/menu";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbindden";

/**
 * 全局统一权限校验拦截器
 * @param children 因为封装了其他的组件接收一个children，将其他组件展示的内容展示到这个组件里面
 * @constructor
 */
const AccessLayout: React.FC<Readonly<{
    children: React.ReactNode;
}>> = ({children}) => {

    // 获取当前页面路径
    const pathname = usePathname();
    //获取当前登录用户
    const loginUser = useSelector((state: RootState) => state.loginUser)
    // 获取当前路径需要的权限
    const menu = findAllMenuItemByPath(pathname);
    // 防止空值 给一个默认值
    const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;
    // 校验权限
    const canAccess = checkAccess(loginUser,needAccess);

    if (!canAccess){
        return <Forbidden />
    }
    
    return children;
}
export default AccessLayout;