import { describe, expect, it } from 'vitest'
import { resolve } from 'pathe'
import { getArticleData } from '../src/utils'

const cwd = './playground'

describe('utils 工具', () => {
  it('获取文件数据', async () => {
    expect(await getArticleData(resolve(cwd, 'web/index.md')))
      .toMatchInlineSnapshot(`
        {
          "title": "Web Title",
        }
      `)
  })
})
