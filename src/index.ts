import { join, sep } from 'pathe'
import glob from 'fast-glob'
import { debounce } from 'throttle-debounce'

import type { Plugin, ViteDevServer } from 'vite'
import type { DefaultTheme } from 'vitepress'
import type { Options, UserConfig } from './types'

import { log } from './log'

export default function autoSidebarPlugin(options: Options): Plugin {
  return {
    name: 'vitepress-auto-sidebar-plugin',
    config: async (config) => {
      log.start('The Auto Sidebar is being generated...')

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
      )

      const sidebar = generateSidebar(paths)
      ;(config as UserConfig).vitepress.site.themeConfig.sidebar = sidebar

      log.success('The Auto Sidebar has been generated successfully!')

      return config
    },
    configureServer({
      watcher,
      restart,
    }: ViteDevServer) {
      /**
       * 监听 md 文件变动
       * 排除修改操作，进行服务重启
       * 800ms 防抖处理，防止大量更新频繁触发重启
       */
      watcher.add('*.md').on('all', debounce(800, async (type: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir') => {
        if (type !== 'change') {
          try {
            await restart()
            log.info('Update the sidebar...')
          }
          catch {
            log.error('Failed to update sidebar')
          }
        }
      }))
    },
  }
}

export function generateSidebar(paths: string[]): DefaultTheme.Sidebar[] {
  const root: DefaultTheme.SidebarItem[] = []

  paths.forEach((path) => {
    let currentNode = root
    let link = '/'

    if (path.endsWith('.md'))
      path = path.slice(0, -3)

    const pathParts = path.split(sep)

    pathParts.forEach((text, index) => {
      link = join(link, text)

      let childNode = currentNode.find(node => node.text === text)

      // 若未处理过，整理数据并添加到数组
      if (!childNode) {
        childNode = {
          text,
          link,
          items: [],
        }

        // 移除多余字符配置
        const isEnd = index + 1 === pathParts.length
        if (!isEnd)
          delete childNode.link
        else delete childNode.items

        currentNode.push(childNode)
      }

      currentNode = childNode.items!
    })
  })

  return root.reduce((acc, item) => {
    (acc as unknown as Record<string, DefaultTheme.Sidebar[]>)[`/${item.text}/`] = [item] as DefaultTheme.Sidebar[]
    return acc
  }, {}) as DefaultTheme.Sidebar[]
}
