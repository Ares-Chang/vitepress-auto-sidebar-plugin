import { extname, join, normalize, resolve, sep } from 'pathe'
import glob from 'fast-glob'
import { debounce } from 'perfect-debounce'

import type { Plugin, ViteDevServer } from 'vite'
import type { DefaultTheme } from 'vitepress'
import type { ArticleOptions, Item, Options, UserConfig } from './types'

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

      const list = setDataFormat(cwd, paths, options)
      const sidebar = generateSidebar(list)
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

export function setItem(
  cwd: string,
  list: string[],
  options: Options,
  link = '',
): Item | undefined {
  if (!list.length)
    return undefined

  let name = list.shift()!

  // 合成 link
  link = join(link, name)

  // 判断是否为文件
  const isFile = Boolean(extname(name))

  let text = name
  let fileOptions = {} as ArticleOptions
  // 移除文件后缀
  if (isFile) {
    name = name.replace(extname(name), '')

    fileOptions = getArticleData(resolve(cwd, link))

    // 设置显示 title , 优先级：配置 title > 文内 h1 > 文件名
    text = fileOptions.title || (options.useH1Title ? fileOptions.h1 : name) || name
  }

  return {
    name,
    text,
    link,
    isFile,
    children: [setItem(cwd, list, options, link)].filter(Boolean) as Item[],
    ...fileOptions,
  }
}

/**
 * 设置数据格式
 * @param cwd cwd 路径
 * @param paths 文件路径
 * @param options 配置
 * @returns 侧边栏数据
 */
export function setDataFormat(
  cwd: string,
  paths: string[],
  options: Options,
): Item[] {
  const root: Item[] = []

  paths.forEach((path) => {
    const list = path.split(sep)
    const obj = setItem(cwd, list, options)!
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
export function generateSidebar(list: Item[]): DefaultTheme.Sidebar {
  const root = list.reduce((acc, cur) => {
    acc[`/${cur.link}/`] = {
      base: '',
      items: deep(cur.children),
    }
    return acc
  }, {} as DefaultTheme.SidebarMulti)

  function deep(list: Item[]): DefaultTheme.SidebarItem[] {
    return list.map((
      { text, link, isFile, children },
    ): DefaultTheme.SidebarItem => {
      if (isFile) {
        return {
          text,
          link,
        }
      }
      else {
        return {
          text,
          items: deep(children),
        }
      }
    })
  }

  return root
}
