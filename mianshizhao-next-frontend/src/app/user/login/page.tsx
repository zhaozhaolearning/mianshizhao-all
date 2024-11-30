"use client"
import './index.css';


import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import Image from "next/image";
import Link from "next/link";
import {userLoginUsingPost} from "@/api/userController";
import {message} from "antd";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/stores";
import LoginUser, {setLoginUser} from "@/stores/loginUser";

import {ProForm} from "@ant-design/pro-form/lib";
import {useRouter} from "next/navigation";


/**
 * 用户登录页面
 * @constructor
 */
//使用箭头函数
const UserLoginPage: React.FC = () => {
    const [form] = ProForm.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    /**
     * 提交
     */
    const doSubmit = async (values: API.UserLoginRequest) => {
        try {
            const res = await userLoginUsingPost(values);
            if (res.data) {
                message.success("登录成功");
                // 将登录状态放进全局存储管理
                dispatch(setLoginUser(res.data as API.LoginUserVO));
                // 将登录页替换为主页
                router.replace("/");
                // 清空填写的内容
                form.resetFields();
            }
        } catch (e) {
            // @ts-ignore
            message.error("登录失败" + e.message);
        }

    }

    return (
        <div id="userLoginPage">
            <LoginForm
                form={form}
                logo={<Image src="/assets/logo3.png" alt="面试钊" height={44} width={44}/>}
                title="面试钊-用户登录"
                subTitle="面试刷题网站"
                onFinish={doSubmit}
            >
                <ProFormText
                    name="userAccount"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined/>,
                    }}
                    placeholder={'账号'}
                    rules={[
                        {
                            required: true,
                            message: '请输入账号!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="userPassword"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined/>,
                    }}
                    placeholder={'密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />
                <div
                    style={{
                        marginBlockEnd: 24,
                        textAlign: "end",
                    }}
                >
                    还没账号?
                    <Link href={"/user/register"}>
                        去注册
                    </Link>
                </div>
            </LoginForm>
        </div>
    );
};

export default UserLoginPage;