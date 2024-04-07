import { readFileSync } from 'node:fs'
import { basename } from 'pathe'
import matter from 'gray-matter'
import type { ArticleOptions, Item, TitleMode } from './types'

/**
 * 获取文件数据
 * @param path 文件绝对路径
 * @return 文件数据
 */
export function getArticleData(path: string): ArticleOptions {
  const file = readFileSync(path, 'utf-8')

  const { content, data } = matter(file)

  const h1 = getArticleTitle(content) || ''
  // 设置 index，无值默认 -1
  const index = data.index || getFileIndex(path)

  return {
    ...data,
    h1,
    index,
  }
}

/**
 * 解析文章标题
 * @param content 文章内容
 * @returns 文章标题
 */
export function getArticleTitle(content: string) {
  const match = content.match(/^#\s*(.+)/m)
  return match?.[1].trim()
}

/**
 * 提取文件名中的数字下标
 * @param path 文件绝对路径
 * @returns 下标
 */
export function getFileIndex(path: string) {
  const name = basename(path)

  // 使用正则表达式匹配文件名中的数字前缀
  const match = name.match(/^(\d+)\./)

  let num
  if (match)
    num = Number(match[1])

  return num
}

/**
 * 格式化标题
 * @param text 字符
 * @param mode 运行模式
 * @returns 格式化后的标题
 */
export function useTextFormat(text: string, mode: TitleMode) {
  if (typeof mode === 'function')
    return mode(text)

  switch (mode) {
    case 'lowercase':
      return text.toLowerCase()
    case 'uppercase':
      return text.toUpperCase()
    case 'capitalize':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    case 'kebabcase':
      return text
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()
    case 'titlecase':
      return text
        .split(/[ -]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    default:
      return text
  }
}

/**
 * 文件路由排序, 提取 index.md 到第一位
 * 优先级：index.md > 其他
 * @param list 路由列表
 * @returns 排序后的路由
 */
export function useSortIndexName(list: string[]) {
  return list.sort((a, b) => {
    if (a.includes('index.md') && !b.includes('index.md'))
      return -1
    if (!a.includes('index.md') && b.includes('index.md'))
      return 1
    return 0
  })
}

/**
 * 根据 index 下标来排序
 * @param list 要排序的列表
 * @returns 排序后的列表
 */
export function useIndexSort(list: Item[]) {
  return list.sort((a, b) => {
    if (a.index === undefined && b.index === undefined)
      return 0
    else if (a.index === undefined)
      return 1
    else if (b.index === undefined)
      return -1
    else
      return a.index - b.index
  })
}
