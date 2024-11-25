import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限 校验当前用户是否有权限进行访问该页面
 * @param loginUser 当前登录用户
 * @param needAccess 需要具有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: API.LoginUserVO, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
    // 获取当前登录用户具有的权限（如果没有，默认没有权限）
    const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
    // 如果不需要任何权限
    if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
        return true;
    }
    //如果需要登录才能访问
    if (needAccess === ACCESS_ENUM.USER) {
        // 如果用户未登录
        if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
            return false;
        }
    }
    // 如果需要管理员才能访问
    if (needAccess === ACCESS_ENUM.ADMIN) {
        //必须要管理员权限，如果没有，则表示无权限
        if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
            return false;
        }
    }
    return true;
};
export default checkAccess;

