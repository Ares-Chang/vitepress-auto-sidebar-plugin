import { describe, expect, it } from 'vitest'
import { resolve } from 'pathe'
import { getArticleData, getArticleTitle } from '../src/utils'

const cwd = './playground'

describe('utils 工具', () => {
  it('获取文件数据', async () => {
    expect(await getArticleData(resolve(cwd, 'web/index.md')))
      .toMatchInlineSnapshot(`
        {
          "h1": "web",
          "title": "Web Title",
        }
      `)
  })

  it('提取 h1 标题', () => {
    expect(getArticleTitle(`# web\r\n## h2\r\nhahahahaha\r\n### h3\r\n哈哈哈哈哈`))
      .toBe(`web`)
  })
})
