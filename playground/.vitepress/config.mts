import { defineConfig } from 'vitepress'
import AutoSidebarPlugin from '../../src/index.ts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Web', link: '/web/' },
      { text: 'Linux', link: '/linux/' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
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
