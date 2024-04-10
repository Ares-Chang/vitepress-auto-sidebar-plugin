---
collapsed: false
---

# 开始

VitePress Auto Sidebar Plugin 是一个 VitePress 自动生成侧边栏的插件，可自动读取目录并生成配置。

本页将引导您安装并使用该插件。

## 安装

首先，在使用此模块之前，您可能需要预先配置 [VitePress](https://vitepress.dev/)。

您需要使用 NPM 或任何其他 Node 模块包管理器安装模块。本 Package 应安装在 `devDependencies` 其中，因为它仅在开发人员环境中使用。使用以下命令：

::: code-group

```bash [pnpm]
pnpm add vitepress-auto-sidebar-plugin --save-dev
```

```bash [npm]
npm install vitepress-auto-sidebar-plugin --save-dev
```

```bash [yarn]
yarn add vitepress-auto-sidebar-plugin --dev
```

```bash [bun]
bun add vitepress-auto-sidebar-plugin --development
```

:::

## 如何使用

插件开箱即用，几乎无需任何配置，基础功能已默认包含于插件中，您可以直接使用它。

您可以在您的 VitePress 配置文件中引入插件，如下所示:

::: code-group

```ts [config.ts]
import { defineConfig } from 'vitepress'
import AutoSidebarPlugin from 'vitepress-auto-sidebar-plugin'

export default defineConfig({
  /* Options... */

  vite: {
    plugins: [
      AutoSidebarPlugin({
        // 如果不指定 `srcDir`，则默认使用 `vitepress` 的 `srcDir`
        srcDir: './docs',
      }),
    ],
  },
})
```

:::

## 运行

接下来，运行代码，享爱自动化侧边栏。

::: code-group

```bash [pnpm]
pnpm dev
```

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

```bash [bun]
bun run dev
```

:::

其它配置项可以参考 [插件配置](./config)。
