import { defineConfig } from 'vitepress'
import AutoSidebarPlugin from '../../src/index.ts'

export default defineConfig({
  title: 'VitePress Auto SideBar Plugin',
  description: '强大的自动侧栏生成器',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }],
    ['meta', { name: 'og:site_name', content: 'VitePress Auto SideBar Plugin' }],
    ['meta', { name: 'og:image', content: 'https://vitepress-auto-sidebar-plugin.netlify.app/logo.png' }],
  ],

  themeConfig: {
    nav: [
      { text: '介绍', link: '/guide/index' },
      { text: 'Api', link: '/guide/config/index' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ares-Chang/vitepress-auto-sidebar-plugin' },
    ],
  },

  vite: {
    plugins: [
      AutoSidebarPlugin({
        srcDir: './docs',
      }),
    ],
  },
})
