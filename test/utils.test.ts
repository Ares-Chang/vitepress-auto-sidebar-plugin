import { describe, expect, it } from 'vitest'
import { resolve } from 'pathe'
import {
  getArticleData,
  getArticleTitle,
  getFileIndex,
  useIndexSort,
  useSortIndexName,
  useTextFormat,
} from '../src/utils'
import type { Item } from '../src/types.ts'

const cwd = './playground'

describe('处理文件数据', () => {
  it('获取文件数据', () => {
    expect(getArticleData(resolve(cwd, 'web/index.md')))
      .toMatchInlineSnapshot(`
        {
          "collapsed": false,
          "h1": "web",
          "index": undefined,
          "title": "Web Title",
        }
      `)
  })

  it('提取 h1 标题', () => {
    expect(getArticleTitle(`# web\r\n## h2\r\nhahahahaha\r\n### h3\r\n哈哈哈哈哈`))
      .toBe(`web`)
  })

  describe('提取文件名数字下标', () => {
    it('存在下标', () => {
      expect(getFileIndex('/web/1.index.md')).toBe(1)
    })

    it('不存在下标', () => {
      expect(getFileIndex('/web/index.md')).toBe(undefined)
    })

    it('数字下标数为 100', () => {
      expect(getFileIndex('/web/100.index.md')).toBe(100)
    })

    it('多个下标', () => {
      expect(getFileIndex('/web/1.2.3.index.md')).toBe(1)
    })
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

  it('自定义函数', () => {
    expect(useTextFormat('WebA', text => text.toUpperCase())).toBe('WEBA')
  })
})

describe('提取 index.md 文件至第一位排序', () => {
  it('单层排序', () => {
    expect(useSortIndexName(['web/js.md', 'web/index.md']))
      .toMatchObject(['web/index.md', 'web/js.md'])
  })

  it('多层排序', () => {
    expect(useSortIndexName([
      'web/js.md',
      'web/index.md',
      'web/css/background.md',
      'web/css/index.md',
      'web/css/less/index.md',
    ]))
      .toMatchObject([
        'web/index.md',
        'web/css/index.md',
        'web/css/less/index.md',
        'web/js.md',
        'web/css/background.md',
      ])
  })
})

describe('根据下标排序', () => {
  it('乱序', () => {
    expect(useIndexSort([{ index: 3 }, { index: 2 }, { index: 1 }] as Item[]).map(({ index }) => index))
      .toMatchObject([1, 2, 3])
  })

  it('夹杂无下标内容', () => {
    expect(useIndexSort([
      { index: 3 },
      { name: 'u1', index: undefined },
      { index: 1 },
      { name: 'u2', index: undefined },
    ] as Item[])).toMatchInlineSnapshot(`
      [
        {
          "index": 1,
        },
        {
          "index": 3,
        },
        {
          "index": undefined,
          "name": "u1",
        },
        {
          "index": undefined,
          "name": "u2",
        },
      ]
    `)
  })
})
