"use client"
import {AntdRegistry} from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layout/BasicLayout";
import React, {useCallback, useEffect} from "react";
import {Provider, useDispatch} from "react-redux";
import {getLoginUserUsingGet} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import store, {AppDispatch} from "@/stores";
import AccessLayout from "@/access/AccessLayout";
import AccessEnum from "@/access/accessEnum";

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<Readonly<{
    children: React.ReactNode;
}>> = ({children}) => {

    //使用dispatch触发更新
    const dispatch = useDispatch<AppDispatch>();

    // useCallback用来缓存函数，当[]中的参数发生变化的时候才会再次执行;
    // 初始化全局用户状态
    const doInitLoginUser = useCallback(async () => {
        // 获取用户信息
        const res = await getLoginUserUsingGet();
        if (res.data) {

        } else {
            // 测试代码 模拟登录
            // setTimeout(() => {
            //     const testUser = {
            //         userName: "测试登录",
            //         id: 1,
            //         userRole: AccessEnum.ADMIN
            //     };
            //     dispatch(setLoginUser(testUser));
            // },3000);
        }
    }, []);

    // 这是个钩子函数，当[]中的参数发生变化的时候才会执行这个函数，如果不传东西就执行一次
    useEffect(() => {
        doInitLoginUser();
    }, []);

    return children;
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh">
        <body>

        <AntdRegistry>
            <Provider store={store}>
                <InitLayout>
                    <BasicLayout>
                        <AccessLayout>
                            {children}
                        </AccessLayout>
                    </BasicLayout>
                </InitLayout>
            </Provider>
        </AntdRegistry>


        </body>
        </html>
    );
}
