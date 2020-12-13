# BDD 测试代码

和主干代码不同，这个分支的测试代码，使用BDD模式编写。

## 目录结构说明

- src 一级目录
  - components 公共组件库
    - __mocks__ jest 的 mock 文件
    - __tests__ 公共组件的单元测试目录
    - *.(jsx|js|css|less|styl) 组件和样式文件等
  - containers 页面目录
    - NotFound 404页面
        - __mocks__ jest 的 mock 文件
        - __tests__ 公共组件的单元测试目录
        - *.(jsx|js|css|less|styl) 组件和样式文件等
    - TodoList TodoList页面
        - __mocks__ jest 的 mock 文件
        - __tests__ 公共组件的单元测试目录
        - *.(jsx|js|css|less|styl) 组件和样式文件等
        - todoStore TodoList页面配套store
           - actions.js 方法定义
           - index.js 导出
           - reducer.js
           - types.js 类型定义的变量
  - store
    - index.js store定义和导出
    - reducers.js 汇总各个页面的reducer
  - utils 工具方法目录
