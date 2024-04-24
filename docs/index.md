---
layout: home

hero:
  name: "Auto SideBar"
  text: "强大的自动侧栏生成器"
  tagline: 一个 VitePress 自动侧边栏插件，可自动读取目录并生成配置
  image:
    src: /logo.png
    alt: Auto SideBar
  actions:
    - theme: brand
      text: 开始
      link: /guide/index
    - theme: alt
      text: API
      link: /guide/config/index
    - theme: alt
      text: GitHub
      link: https://github.com/Ares-Chang/vitepress-auto-sidebar-plugin
    - theme: alt
      text: 最佳实践
      link: https://github.com/Ares-Chang/notes

features:
  - icon: 🚀
    title: 全自动可配置
    details: 读取目录并生成相应配置，支持同级多个侧边栏、Frontmatter 配置
  - icon: 🔌
    title: 内置排序
    details: 默认开启文件名称下标排序，同时支持自定义排序
  - icon: 🦾
    title: 安全可靠
    details: Typescript + Vitest 开发测试，强有力的保障
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(220deg, #bd34fe 20%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-90deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
