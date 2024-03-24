import { join, normalize, resolve, sep } from 'pathe'
import glob from 'fast-glob'
import { debounce } from 'perfect-debounce'

import type { Plugin, ViteDevServer } from 'vite'
import type { DefaultTheme } from 'vitepress'
import type { Options, UserConfig } from './types'

import { log } from './log'
import { getArticleData } from './utils'

export default function autoSidebarPlugin(options: Options): Plugin {
  return {
    name: 'vitepress-auto-sidebar-plugin',
    config: async (config) => {
      log.start('The Auto Sidebar is being generated...')

      const { vitepress: { userConfig } } = config as UserConfig

      const pattern = options.pattern || '**.md'
      const cwd = options.srcDir || userConfig.srcDir || './'
      const ignoreList = options.ignoreList || userConfig.srcExclude || []

      // 读取目录下文件，并统一路由格式
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

      const sidebar = generateSidebar(cwd, paths, options)
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
      watcher.add('*.md').on('all', debounce(async (type: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir') => {
        if (type !== 'change') {
          try {
            await restart()
            log.info('Update the sidebar...')
          }
          catch {
            log.error('Failed to update sidebar')
          }
        }
      }, 800))
    },
  }
}

/**
 * 生成侧边栏
 * @param cwd cwd 路径
 * @param paths 文件路径
 * @returns 侧边栏数据
 */
export function generateSidebar(
  cwd: string,
  paths: string[],
  { useH1Title = true }: Options,
): DefaultTheme.Sidebar[] {
  const root: DefaultTheme.SidebarItem[] = []

  for (const path of paths) {
    let currentNode = root
    let link = '/'

    // 获取路径中名称数组
    const pathParts = path.split(sep)

    for (let text of pathParts) {
      let isFile = false

      // 移除文件后缀
      if (text.endsWith('.md')) {
        text = text.slice(0, -3)
        isFile = true
      }

      link = join(link, text)

      // 获取文件数据，须绝对路径
      if (isFile) {
        const data = getArticleData(resolve(cwd, path))

        text = data.title || (useH1Title ? data.h1 : text) || text

        if (data.hide)
          continue
      }

      let childNode = currentNode.find(node => node.text === text)

      // 若未处理过，整理数据并添加到数组
      if (!childNode) {
        childNode = {
          text,
          ...(
            isFile
              ? { link }
              : { items: [] }
          ),
        }
        currentNode.push(childNode)
      }

      currentNode = childNode.items!
    }
  }

  return root.reduce((acc, item) => {
    (acc as unknown as Record<string, DefaultTheme.Sidebar[]>)[`/${item.text}/`] = [item] as DefaultTheme.Sidebar[]
    return acc
  }, {}) as DefaultTheme.Sidebar[]
}
