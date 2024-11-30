"use client"
import './index.css';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import Image from "next/image";
import Link from "next/link";
import {userRegisterUsingPost} from "@/api/userController";
import {message} from "antd";
import {ProForm} from "@ant-design/pro-form/lib";
import {useRouter} from "next/navigation";


/**
 * 用户注册页面
 * @constructor
 */
//使用箭头函数
const UserRegisterPage: React.FC = () => {
    const [form] = ProForm.useForm();
    const router = useRouter();

    /**
     * 提交
     */
    const doSubmit = async (values: API.UserRegisterRequest) => {
        try {
            const res = await userRegisterUsingPost(values);
            if (res.data) {
                message.success("注册成功,自动跳转登录页");
                // 前往登录页面
                router.push("/user/login");
                // 清空填写的内容
                form.resetFields();
            }
        } catch (e) {
            // @ts-ignore
            message.error("注册失败" + e.message);
        }

    }

    return (
        <div id="userRegisterPage">
            <LoginForm
                form={form}
                logo={<Image src="/assets/logo4.png" alt="面试钊" height={44} width={44}/>}
                title="面试钊-用户注册"
                subTitle="面试刷题网站"
                onFinish={doSubmit}
                submitter={{
                    searchConfig: {
                        submitText: "注册"
                    },
                }}
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
                    placeholder={'请输入密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="checkPassword"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined/>,
                    }}
                    placeholder={'请输入确认密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入确认密码！',
                        },
                    ]}
                />
                <div
                    style={{
                        marginBlockEnd: 24,
                        textAlign: "end",
                    }}
                >
                    已有账号
                    <Link href={"/user/login"}>
                        去登录
                    </Link>
                </div>
            </LoginForm>
        </div>
    );
};

export default UserRegisterPage;