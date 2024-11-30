// 默认用户
import ACCESS_ENUM from "@/access/accessEnum";

export const DEFAULT_USER: API.LoginUserVO = {
    userName: "未登录",
    userProfile: "暂无简介",
    userAvatar: "/assets/logo.png",
    userRole: ACCESS_ENUM.ADMIN,
};