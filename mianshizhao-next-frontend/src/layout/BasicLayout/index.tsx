"use client";
import {GithubFilled, LogoutOutlined, SearchOutlined,} from "@ant-design/icons";
import {ProLayout} from "@ant-design/pro-components";
import {Dropdown, Input, message, theme} from "antd";
import React from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import {menus} from "../../../config/menu";
import {AppDispatch, RootState} from "@/stores";
import {useDispatch, useSelector} from "react-redux";
import getAccessibleMenus from "@/access/menuAccess";
import {userLogoutUsingPost} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import {DEFAULT_USER} from "@/constants/user";

const SearchInput = () => {
    const {token} = theme.useToken();
    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: "flex",
                alignItems: "center",
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                }}
                prefix={<SearchOutlined/>}
                placeholder="搜索题目"
                variant="borderless"
            />
        </div>
    );
};

interface Props {
    children: React.ReactNode;
}

export default function BasicLayout({children}: Props) {

    const loginUser = useSelector((state: RootState) => state.loginUser);
    //获取当前页面的相对路径
    const pathname = usePathname();
    // const [num, setNum] = useState(40);
    // if (typeof document === "undefined") { 浏览器的document不可能是undefined
    //   return <div />;
    // }


    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();
    /**
     * 用户注销
     */
    const userLogout = async () => {
        try {
            await userLogoutUsingPost();
            message.success("成功退出登录");
            // 将登录状态放进全局存储管理
            dispatch(setLoginUser(DEFAULT_USER));
            // 将登录页替换为主页 push相当于新加了一个页面，点击返回返回上一个页面。
            // replace相当于替代当前页面，点击返回返回欠一个页面
            router.push("/user/login");
        } catch (e) {
            // @ts-ignore
            message.error("操作失败" + e.message);
        }
    }

    return (
        <div
            id="basicLayout"
            style={{
                height: "100vh",
                overflow: "auto",
            }}
        >
            <ProLayout
                title={"面试钊刷题平台"}
                layout={"top"}
                logo={
                    <Image
                        src="/assets/logo2.ico"
                        height={43}
                        width={43}
                        alt="面试钊 -- 小钊开发"
                    />
                }
                location={{
                    //将页面的相对路径传给location然后就会完成高亮显示
                    pathname,
                }}
                avatarProps={{
                    src: loginUser.userAvatar || "/assets/logo4.png",
                    size: "small",
                    title: loginUser.userName || "zhaozhao",
                    render: (props, dom) => {

                        if (!loginUser.id) {
                            return (
                                <div onClick={() => {
                                    router.push("/user/login");
                                }}>
                                    {dom}
                                </div>
                            )
                        }

                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "logout",
                                            icon: <LogoutOutlined/>,
                                            label: "退出登录",
                                        },
                                    ],
                                    onClick: async (event: { key: React.Key }) => {
                                        const {key} = event;
                                        if (key === "logout") {
                                            // 由于不涉及其他的操作所以这里可以不加await
                                            await userLogout();
                                        }
                                    }
                                }}
                            >
                                {dom}
                            </Dropdown>
                        );
                    },
                }}
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        <SearchInput key="Searchinput"/>,
                        <a key="github" href="https://www.bilibili.com/" target="_blank">
                            <GithubFilled key="GithubFilled"/>
                        </a>,
                    ];
                }}
                headerTitleRender={(logo, title, _) => {
                    const defaultDom = (
                        <a>
                            {logo}
                            {title}
                        </a>
                    );
                    if (typeof window === "undefined") return defaultDom;
                    if (document.body.clientWidth < 1400) {
                        return defaultDom;
                    }
                    if (_.isMobile) return defaultDom;
                    return <>{defaultDom}</>;
                }}
                //渲染底部栏
                footerRender={(props) => {
                    return <GlobalFooter/>;
                }}
                onMenuHeaderClick={(e) => console.log(e)}
                // 定义有哪些菜单
                menuDataRender={() => {
                    return getAccessibleMenus(loginUser, menus);
                }}
                //定义菜单项如何渲染
                menuItemRender={(item, dom) => (
                    <Link href={item.path || "/"} target={item.target}>
                        {dom}
                    </Link>
                )}
            >
                {children}
            </ProLayout>
        </div>
    );
}
