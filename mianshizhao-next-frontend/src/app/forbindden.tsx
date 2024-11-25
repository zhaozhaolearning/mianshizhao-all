import {Button, Result} from "antd";

/**
 * 无权限访问的页面
 * @constructor
 */
const Forbidden = () => {
    // result这个组件可以快速返回结果页面给用户用于查看是否有权限
    return <Result
        status={403}
        title={"403"}
        subTitle={"你没权限访问该页面"}
        extra={
            <Button type="primary" href="/">
                返回首页
            </Button>
        }

    />
}
export default Forbidden;