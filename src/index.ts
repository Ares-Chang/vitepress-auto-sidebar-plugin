import { normalize } from 'node:path'
import glob from 'fast-glob'

import type { Plugin } from 'vite'
import type { Options, SidebarItem, UserConfig } from './types'

import { start, warn } from './utils'

export default function autoSidebarPlugin(options: Options): Plugin {
  return {
    name: 'vitepress-auto-sidebar-plugin',
    config: async (config) => {
      start('The Auto Sidebar is being generated...')

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
        ; (config as UserConfig).vitepress.site.themeConfig.sidebar = sidebar
    },
  }
}

export async function generateSidebar(paths: string[]): Promise<Record<string, SidebarItem[]>> {
  const sidebar: Record<string, SidebarItem[]> = {}

  paths.forEach((path) => {
    if (path.endsWith('.md'))
      path = path.slice(0, -3)

    const pathParts = path.split('/')

    if (!sidebar[`/${pathParts[0]}/`])
      sidebar[`/${pathParts[0]}/`] = []
    const obj = sidebar[`/${pathParts[0]}/`]

    pathParts.forEach((part) => {
      const _obj = obj.find(item => item.text === part)
      if (!_obj) {
        obj.push({
          text: part,
          link: `/${pathParts.slice(0, pathParts.indexOf(part) + 1).join('/')}`,
        })
        return
      }

      if (pathParts.length - 1 === pathParts.indexOf(part))
        _obj.link = `/${pathParts.slice(0, pathParts.indexOf(part) + 1).join('/')}`
    })
  })

  warn(sidebar)
  return sidebar
}
