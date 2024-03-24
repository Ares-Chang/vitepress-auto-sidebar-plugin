import { readFile } from 'node:fs/promises'
import matter from 'gray-matter'

/**
 * 获取文件数据
 * @param path 文件绝对路径
 */
export async function getArticleData(path: string) {
  const file = await readFile(path, 'utf-8')

  const { data } = matter(file)

  return data
}
