# 简介

**Gui Admin Monorepo**  (通过 [📦 pnpm](https://www.pnpm.cn/motivation) 和 [🔺 turbo](https://turborepo.org)) 是一个用于 **JavaScript/TypeScript Monorepos** 的快速构建系统的产品，由单个代码库里包含了多个项目的代码。

## 什么是 Monorepo

Monorepo 不是某个库或者软件，而是一种项目代码管理方式的称呼，即将多个项目放在一个仓库里面进行统一管理，每个项目可以单独发布到npm。

作为前端工作者，可能听说过微前端，也听说过 Monorepo。有时候我们会混为一谈。

**简单的说，微前端是「聚」，Monorepo 是「分」。**

微前端解决的问题是，将多个以不同技术完成，但是拥有相同业务逻辑的 app 聚合到一起。而 Monorepo 却相反，是将一个 app 中相对比较独立的逻辑，拆分成独立的  package，减少相互的耦合和制约，并且使用同一个 Repo。

![](https://gd-hbimg.huaban.com/9885a1f000a5054fb7092826521d88c4d46a8157637c2-q5p2uk)

## 📦️ 安装使用

- 获取项目代码

```bash
git clone https://github.com/xuhongling/gui-admin-monorepo.git
```

- 安装依赖

```bash
cd gui-admin-monorepo

pnpm install

```

- 运行

```bash
pnpm run dev
```

- 打包

```bash
pnpm build
```

- 清除 **`node_modules`**

```bash
pnpm run clean
```
