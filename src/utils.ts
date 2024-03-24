import { readFileSync } from 'node:fs'
import matter from 'gray-matter'
import type { ArticleOptions } from './types'

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
