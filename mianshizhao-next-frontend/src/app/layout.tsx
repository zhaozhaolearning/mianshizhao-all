"use client"
import {AntdRegistry} from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layout/BasicLayout";
import React, {useCallback, useEffect} from "react";

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<Readonly<{
    children: React.ReactNode;
}>> = ({children}) => {

    // useCallback用来缓存函数，当[]中的参数发生变化的时候才会再次执行;
    const doInit = useCallback(() => {
        console.log("init");
    }, []);

    // 这是个钩子函数，当[]中的参数发生变化的时候才会执行这个函数，如果不传东西就执行一次
    useEffect(() => {
        doInit();
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
            <InitLayout>
                <BasicLayout>{children}</BasicLayout>
            </InitLayout>
        </AntdRegistry>


        </body>
        </html>
    );
}
