import { readFileSync } from 'node:fs'
import matter from 'gray-matter'
import type { ArticleOptions, TitleMode } from './types'

/**
 * 获取文件数据
 * @param path 文件绝对路径
 * @return 文件数据
 */
export function getArticleData(path: string): ArticleOptions {
  const file = readFileSync(path, 'utf-8')

  const { content, data } = matter(file)

  return {
    ...data,
    h1: getArticleTitle(content) || '',
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
