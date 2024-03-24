import { readFile } from 'node:fs/promises'
import matter from 'gray-matter'

/**
 * 获取文件数据
 * @param path 文件绝对路径
 * @return 文件数据
 */
export async function getArticleData(path: string) {
  const file = await readFile(path, 'utf-8')

  const { content, data } = matter(file)

  data.h1 = getArticleTitle(content)

  return data
}

/**
 * 解析文章标题
 * @param content 文章内容
 * @returns 文章标题
 */
export function getArticleTitle(content: string) {
  const match = content.match(/^#\s*(.+)/m)
  return match?.[1].trim() || ''
}
