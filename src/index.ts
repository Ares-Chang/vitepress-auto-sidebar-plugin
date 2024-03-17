import { normalize, sep } from 'node:path'
import glob from 'fast-glob'

import type { Plugin } from 'vite'
import type { Options, UserConfig } from './types'

export default function autoSidebarPlugin(options: Options): Plugin {
  return {
    name: 'vitepress-auto-sidebar-plugin',
    config: async (config) => {
      console.warn('The Auto Sidebar is being generated...')

      const { vitepress: { userConfig } } = config as UserConfig

      const pattern = options.pattern || '**.md'
      const cwd = options.srcDir || userConfig.srcDir || './'
      const ignoreList = options.ignoreList || userConfig.srcExclude || []

      // 读取目录下文件
      const paths = (
        await glob(pattern, {
          cwd,
          ignore: [
            '**/node_modules/**',
            '**/dist/**',
            'index.md',
            ...ignoreList,
          ],
        })
      ).map(path => normalize(path))

      const sidebar = generateSidebar(paths)
      ;(config as UserConfig).vitepress.site.themeConfig.sidebar = sidebar
    },
  }
}

// [
//   'web/index.md',
//   'web/js.md',
//   'web/css/background.md',
//   'web/css/index.md'
// ]

// {
//   '/web/': [
//     {
//       text: 'Web',
//       items: [
//         {
//           text: 'index',
//           link: '/web/index',
//         },
//         {
//           text: 'js',
//           link: '/web/js',
//         },
//         {
//           text: 'css',
//           items: [
//             {
//               text: 'background',
//               link: '/web/css/background',
//             },
//           ]
//         },
//       ],
//     },
//   ],
// }

interface Item {
  text: string
  link?: string
  items?: Item[]
}

function generateSidebar(paths: string[]) {
  const root: Record<string, Item[]> = {}

  paths.forEach((path) => {
    const isMD = path.endsWith('.md')
    // 去除 .md 后缀
    if (isMD)
      path = path.slice(0, -3)

    const dirList = path.split(sep)

    dirList.forEach((dir, index) => {
      const pre = dirList.slice(0, index).join(sep)

      if (!pre)
        root[dir] = root[dir] || []

      // const dirPath = dirList.slice(0, index + 1).join(sep)

      // root[dirPath] = root[dirPath] || []
      // console.log(dir, dirPath)
    })
  })
}
