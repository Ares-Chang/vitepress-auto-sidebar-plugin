import { defineConfig } from 'vitepress'
import AutoSidebarPlugin from '../../src/index.ts'

export default defineConfig({
  title: 'VitePress Auto SideBar Plugin',
  description: '强大的自动侧栏生成器',
  themeConfig: {
    nav: [
      { text: '介绍', link: '/' },
      { text: 'Api', link: '/api' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ares-Chang/vitepress-auto-sidebar-plugin' },
    ],
  },

  vite: {
    plugins: [
      AutoSidebarPlugin({
        useH1Title: false,
        title: {
          mode: 'uppercase',
        },
      }),
    ],
  },
})
