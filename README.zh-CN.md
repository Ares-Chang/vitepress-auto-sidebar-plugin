# vitepress-auto-sidebar-plugin

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

<p>
  <b>简体中文</b> | <a href="https://github.com/Ares-Chang/vitepress-auto-sidebar-plugin/blob/master/README.md">English</a>
</p>

根据文件结构自动生成侧边栏配置信息。

## ✨ 特性

- 🎨 易于使用，完全可配置，可以根据自己的需求量身定制

- 📑 多级侧边栏，可折叠，任你配置

- ✅ 文件隐藏可配置

- 🤖 支持文内 Frontmatter 配置

- 😃 自定义排序，Title 名称自定义映射

- 📦 内置文件名称下标排序

- 🦾 TypeScript 编写，强有力的保障

## 🚀 安装

```bash
pnpm add vitepress-auto-sidebar-plugin --save-dev
```

## ⚡️ 配置

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import AutoSidebarPlugin from 'vitepress-auto-sidebar-plugin'

export default defineConfig({
  vite: {
    plugins: [
      AutoSidebarPlugin(),
    ],
  },
})
```

## License

[MIT](./LICENSE) License © 2023-PRESENT [Ares Chang](https://github.com/Ares-Chang)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/vitepress-auto-sidebar-plugin?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/vitepress-auto-sidebar-plugin
[npm-downloads-src]: https://img.shields.io/npm/dm/vitepress-auto-sidebar-plugin?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/vitepress-auto-sidebar-plugin
[bundle-src]: https://img.shields.io/bundlephobia/minzip/vitepress-auto-sidebar-plugin?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=vitepress-auto-sidebar-plugin
[license-src]: https://img.shields.io/github/license/Ares-Chang/vitepress-auto-sidebar-plugin.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/Ares-Chang/vitepress-auto-sidebar-plugin/blob/master/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/vitepress-auto-sidebar-plugin
