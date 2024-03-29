import { extname, normalize, sep } from 'pathe'
import glob from 'fast-glob'
import { debounce } from 'perfect-debounce'

import type { Plugin, ViteDevServer } from 'vite'
import type { DefaultTheme } from 'vitepress'
import type { Item, Options, UserConfig } from './types'

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

      const sidebar = setDataFormat(cwd, paths, options)
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

export function setItem(list: string[]): Item | undefined {
  if (!list.length)
    return undefined

  let text = list.shift()!

  // 判断是否为文件
  const isFile = Boolean(extname(text))

  // 移除文件后缀
  if (isFile)
    text = text.replace(extname(text), '')

  return {
    text,
    isFile,
    children: [setItem(list)].filter(Boolean) as Item[],
  }
}

/**
 * 设置数据格式
 * @param cwd cwd 路径
 * @param paths 文件路径
 * @returns 侧边栏数据
 */
export function setDataFormat(
  cwd: string,
  paths: string[],
  {
    // eslint-disable-next-line unused-imports/no-unused-vars
    useH1Title = true,
  }: Options,
): Item[] {
  const root: Item[] = []

  paths.forEach((path) => {
    const list = path.split(sep)
    const obj = setItem(list)!
    deep(root, obj)
  })

  // 递归处理每一项
  function deep(list: Item[], obj: Item) {
    const node = list.find(node => node.text === obj.text)
    if (node) {
      obj.children.forEach((child) => {
        node.children = deep(node.children, child)
      })
    }
    else { list.push(obj) }

    return list
  }

  return root
}

/**
 * 生成侧边栏
 */
export function generateSidebar(): DefaultTheme.Sidebar[] {
  return []
}
