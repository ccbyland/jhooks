### git 仓库地址：https://coding.jd.com/jx-promote-base/jhooks/

### jnpm 地址：http://npm.m.jd.com/browse/keyword/@jhooks

### 如何参与开发

1. 本项目依赖[lerna](https://github.com/lerna/lerna)(包管理))、[jest](https://jestjs.io/docs/zh-Hans/getting-started)（测试框架），参与开发前，应该对这些工具有所了解。
2. 安装项目依赖。

```bash
npm i  --registry=http://registry.m.jd.com
```

3. 使用 lerna 将 packages 下各包依赖进行 link

```bash
npm run bootstrap
```

4. 添加内部包依赖
   例如 `@jhooks/useA` 需要依赖 `@jhooks/useB`，执行以下命令：

```bash
npm run add @jhooks/useB --scope=@jhooks/useA
```

> 1.此命令会在 `@jhooks/useA` 的 `package.json` 中声明依赖 `@jhooks/useB`，同时会在 `@jhooks/useA` 的 `node_modules` 中创建 `@jhooks/useB` 这个模块，注意该模块是 link 到项目的 @jhooks/useB

> 2.运行这个命令前请确保运行过 `npm run bootstrap` 或者 `lerna bootstrap`。

#### 发包准备工作

确认是否已经登录 jnpm，如登录，直接第三步

1. 安装 jnpm
   `$ npm install @jd/jnpm -g --registry=http://registry.m.jd.com`

2. 确认当前在内网

-   首次发包
    `$ jnpm adduser --registry=http://registry.m.jd.com --scope=@jd`
-   jnpm 登陆
    `$ jnpm login --registry=http://registry.m.jd.com --scope=@jd`
-   确认当前用户名为自己

3. 转换，如果是 ts 写的代码，转换成 js，进入项目 packages 里面执行
   `$ npm run build:ts`

4. 在仓库目录执行如下命令使用 lerna 发布
   `$ npm run publish`

### 我应当注意什么

-   确认当前 hooks 的名字，也就是目录名，一旦发布，想删除需要联系中台管理员（麻烦！）
-   每一个组件包中的 package.json 无需再次安装 react 相关依赖，最外层的 package.json 已经有依赖了，不然运行 jest 会报错。
    具体原因：https://segmentfault.com/a/1190000022435060
