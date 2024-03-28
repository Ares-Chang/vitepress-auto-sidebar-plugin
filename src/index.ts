import { normalize } from 'pathe'
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

      setDataFormat(cwd, paths, options)
      // const sidebar = setDataFormat(cwd, paths, options)
      // ;(config as UserConfig).vitepress.site.themeConfig.sidebar = sidebar

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
 * 设置数据格式
 * @param cwd cwd 路径
 * @param paths 文件路径
 * @returns 侧边栏数据
 */
export function setDataFormat(
// cwd: string,
// paths: string[],
// {
//   useH1Title = true,
// }: Options,
): Item[] {
  const root: Item[] = []

  // paths.forEach((path) => {
  //   const list = path.split(sep)
  // })

  return root
}

// export function setItemList(list: string[]): Item[] {
export function setItemList(): Item[] {
  // const root = []
  // list.forEach((path) => {
  // const list = path.split(sep)
  // console.log(JSON.stringify(setItem(root, list), null, 2))
  // })
  return []
}

export function setItem(root: Item, list: string[]): Item | undefined {
  if (!list.length)
    return
  // console.log(root, list)

  // const text = list.shift()!
  // const node = root.find((node: Item) => node.text === text)

  // const obj = {
  //   text,
  //   isFile: Boolean(extname(text)),
  //   children: [setItem(node, list)].filter(Boolean),
  // }

  // if (!node)
  //   root.push(obj)
  // else node.children?.push(obj)

  // console.log(obj)

  return root
}

/**
 * 生成侧边栏
 */
export function generateSidebar(): DefaultTheme.Sidebar[] {
  return []
}
