import { defineConfig } from 'vitepress'
import AutoSidebarPlugin from '../../src/index.ts'

export default defineConfig({
  title: 'VitePress Auto SideBar Plugin',
  description: '强大的自动侧栏生成器',
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
        title: {
          mode: 'titlecase',
        },
      }),
    ],
  },
})
