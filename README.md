<p align='center'>
  <img src='https://github.com/Ares-Chang/vitepress-auto-sidebar-plugin/assets/36911513/1113f4d7-d674-4f41-aefa-1970afc26a8e' alt='Uni Vitesse - Opinionated Vite Starter Template' width='800'/>
</p>

<p align='center'>
  <b>English</b> | <a href="https://github.com/Ares-Chang/vitepress-auto-sidebar-plugin/blob/master/README.zh-CN.md">简体中文</a>
</p>

# vitepress-auto-sidebar-plugin

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Automatically generates the sidebar configuration based on the file structure

## ✨ Feature

- 🎨 Easy to use, fully configurable and can be tailored to your needs

- 📑 Multi-level sidebar, collapsible, you can configure it

- ✅ File hiding can be configured

- 🤖 Support Frontmatter configuration

- 😃 Custom sorting, title name mapping can be customized

- 📦 Built-in file name index sorting

- 🦾 TypeScript, of course

## 🚀 Install

```bash
pnpm add vitepress-auto-sidebar-plugin --save-dev
```

## ⚡️ Usage

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

## 🌟 More Configuration

More configuration can be found in the [vitepress-auto-sidebar-plugin](https://vitepress-auto-sidebar-plugin.netlify.app/) documentation

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
