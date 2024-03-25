import { describe, expect, it } from 'vitest'
import { resolve } from 'pathe'
import { getArticleData, getArticleTitle, useTextFormat } from '../src/utils'

const cwd = './playground'

describe('处理文件数据', () => {
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

describe('格式化标题', () => {
  describe('小写', () => {
    it('驼峰', () => {
      expect(useTextFormat('WebA', 'lowercase')).toBe('weba')
    })

    it('连字符', () => {
      expect(useTextFormat('Web-A', 'lowercase')).toBe('web-a')
    })
  })

  describe('大写', () => {
    it('驼峰', () => {
      expect(useTextFormat('WebA', 'uppercase')).toBe('WEBA')
    })

    it('连字符', () => {
      expect(useTextFormat('Web-A', 'uppercase')).toBe('WEB-A')
    })
  })

  describe('首字母大写', () => {
    it('驼峰', () => {
      expect(useTextFormat('WebA', 'capitalize')).toBe('Weba')
    })

    it('连字符', () => {
      expect(useTextFormat('Web-a', 'capitalize')).toBe('Web-a')
    })
  })

  describe('kebab-case', () => {
    it('驼峰', () => {
      expect(useTextFormat('WebA', 'kebabcase')).toBe('web-a')
    })

    it('空格分隔', () => {
      expect(useTextFormat('Web A', 'kebabcase')).toBe('web-a')
    })
  })

  describe('title-case', () => {
    it('空格分隔', () => {
      expect(useTextFormat('web a', 'titlecase')).toBe('Web A')
    })

    it('连字符', () => {
      expect(useTextFormat('Web-A', 'titlecase')).toBe('Web A')
    })
  })

  describe('默认', () => {
    it('驼峰', () => {
      expect(useTextFormat('WebA', 'default')).toBe('WebA')
    })

    it('连字符', () => {
      expect(useTextFormat('Web-A', 'default')).toBe('Web-A')
    })
  })
})
