import { extname, join, normalize, resolve, sep } from 'pathe'
import glob from 'fast-glob'
import { debounce } from 'perfect-debounce'

import type { Plugin, ViteDevServer } from 'vite'
import type { DefaultTheme } from 'vitepress'
import type { ArticleOptions, Cache, Item, Options, UserConfig } from './types'

import { log } from './log'
import {
  getArticleData,
  getPathIndex,
  useIndexSort,
  usePrevNextSort,
  useSortIndexName,
  useTextFormat,
} from './utils'

export default function autoSidebarPlugin(options: Options = {}): Plugin {
  let cwd = './'
  const cache: Cache = {}
  const defaultOptions: Options = {
    useH1Title: true,
  }

  return {
    name: 'vitepress-auto-sidebar-plugin',
    config: async (config) => {
      log.start('The Auto Sidebar is being generated...')

      const { vitepress: { userConfig } } = config as UserConfig

      cwd = options.srcDir || userConfig.srcDir || './'
      const pattern = options.pattern || '**.md'
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

      const list = setDataFormat(cwd, paths, { ...defaultOptions, ...options }, cache)
      const sidebar = generateSidebar(list);
      (config as UserConfig).vitepress.site.themeConfig.sidebar = sidebar

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
      watcher.add('*.md').on('all', debounce(async (type, path) => {
        if (type === 'change') {
          // 提取文件相对 link
          const url = resolve(cwd) + sep
          const link = path.split(url).pop()!

          const obj = cache[link]
          const data = getArticleData(path)

          // 对比 obj 和 data，文件如果未发生变化，直接返回
          if (obj && JSON.stringify(obj) === JSON.stringify(data))
            return
        }

        try {
          await restart()
          log.info('Update the sidebar...')
        }
        catch {
          log.error('Failed to update sidebar')
        }
      }, 800))
    },
  }
}

export function setItem(
  cwd: string,
  list: string[],
  options: Options,
  cache: Cache = {},
  link = '',
): Item | undefined {
  if (!list.length)
    return undefined

  let name = list.shift()!

  // 合成 link
  link = join(link, name)

  // 判断是否为文件
  const isFile = !list.length && Boolean(extname(name))

  let text = name
  let index: number | undefined = getPathIndex(link)
  let fileOptions = {} as ArticleOptions
  // 移除文件后缀
  if (isFile) {
    name = name.replace(extname(name), '')

    fileOptions = getArticleData(resolve(cwd, link))

    // 缓存文件内数据
    cache[link] = fileOptions

    // 设置显示 title , 优先级：配置 title > 文内 h1 > 文件名
    text = fileOptions.title || (options.useH1Title ? fileOptions.h1 : name) || name
  }
  else {
    // 设置 title 映射
    if (options?.title?.map)
      text = options.title.map[`${link}/`] || text
    else text = useTextFormat(text, options?.title?.mode || 'titlecase') // 设置 title 格式化
  }

  const children = [setItem(cwd, list, options, cache, link)].filter(Boolean) as Item[]

  let groupConfig = {}
  if (!isFile) {
    // 获取分组名下 index 文件中的配置
    const { group, groupTitle, groupIndex, groupAlone, collapsed } = children.find(item => item.name === 'index') || {}

    // 设置分组名
    if (groupTitle)
      text = groupTitle

    if (groupIndex)
      index = groupIndex // 设置分组索引

    groupConfig = {
      group,
      groupAlone, // 设置分组是否独立
      collapsed, // 设置折叠分组配置，默认不开启，单独设置后开启
    }
  }

  return {
    index,
    name,
    text,
    link,
    isFile,
    children,
    ...groupConfig,
    ...fileOptions,
  }
}

/**
 * 设置数据格式
 * @param cwd cwd 路径
 * @param paths 文件路径
 * @param options 配置
 * @param options.sort 排序方法
 * @param cache 缓存
 * @returns 侧边栏数据
 */
export function setDataFormat(
  cwd: string,
  paths: string[],
  {
    sort = () => 0,
    ...options
  }: Options,
  cache: Cache = {},
): Item[] {
  let root: Item[] = []

  const list = useSortIndexName(paths)

  list.forEach((path) => {
    const list = path.split(sep)
    const obj = setItem(cwd, list, options, cache)!
    root = deep(root, obj, root)
  })

  // 递归处理每一项
  function deep(list: Item[], obj: Item, root: Item[]) {
    const node = [...list, ...root].find(node => node.name === obj.name)
    if (node) {
      obj.children.forEach((child) => {
        node.children = deep(node.children, child, root)
      })
    }
    else {
      // Group 分组提升至对应顶层
      if (obj.group && !obj.isFile)
        root.push(obj)
      else list.push(obj)
    }

    // 根据 Index 下标排序
    list = useIndexSort(list)
    // 根据 Prev | Next 插值排序
    list = usePrevNextSort(list)

    // 返回排过序的数据
    return list.sort(sort)
  }

  return root
}

/**
 * 生成侧边栏
 */
export function generateSidebar(list: Item[]): DefaultTheme.Sidebar {
  const root = list.reduce((acc, { text, link, children, collapsed, groupAlone }) => {
    const items = deep(children).filter(Boolean) as DefaultTheme.SidebarItem[]
    const obj = {
      text,
      items,
      collapsed,
    }

    const key = `/${groupAlone ? link : link.split(sep)[0] || link}/`

    // 分组一级目录为空初始化
    if (!acc[key])
      acc[key] = [];

    (acc[key] as DefaultTheme.SidebarItem[]).push(obj)

    return acc
  }, {} as DefaultTheme.SidebarMulti)

  function deep(list: Item[]): (DefaultTheme.SidebarItem | null)[] {
    return list.map((
      { text, link, isFile, children, hide, collapsed },
    ): DefaultTheme.SidebarItem | null => {
      if (hide)
        return null

      if (isFile) {
        return {
          text,
          link: `/${link}`,
        }
      }
      else {
        return {
          text,
          collapsed,
          items: deep(children).filter(Boolean) as DefaultTheme.SidebarItem[],
        }
      }
    })
  }

  return root
}
