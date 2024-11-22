
import React from "react";
import './index.css';

/**
 * 纯静态的页面可以使用服务端渲染
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="global-footer">
      <div>@ {currentYear} 面试钊刷题平台</div>
      <div>
        <a href="https://www.blibli.com" target="_bilank">
          作者： 超级敏感肌 - 程序员钊钊
        </a>
      </div>
    </div>
  );
}
