import { describe, expect, it } from 'vitest'
import { generateSidebar, setDataFormat, setItem, setItemList } from '../src'
import type { Item } from '../src/types'

describe('处理文件数据', () => {
  const cwd = './playground'
  const paths = [
    'web/index.md',
    'web/js.md',
    'web/css/index.md',
    'web/css/background.md',
    'linux/index.md',
    'linux/wsl.md',
  ]

  it('设置数据体', () => {
    const list: Item[] = []
    setItem(list, 'web/css/background.md'.split('/'))
    expect(list)
      .toMatchInlineSnapshot(`[]`)
  })

  it.skip('设置数据体列表', () => {
    expect(setItemList(paths))
      .toMatchInlineSnapshot(`[]`)
  })

  it.todo('返回数据体结构', () => {
    expect(setDataFormat(cwd, paths, {})).toMatchInlineSnapshot(`[]`)
  })

  it.todo('使用文件 H1 标题', () => {
    expect(setDataFormat(cwd, paths, { useH1Title: true }))
      .toMatchInlineSnapshot()
  })
})

describe.skip('生成侧边栏', () => {
  it('生成默认配置', () => {
    expect(generateSidebar()).toMatchInlineSnapshot()
  })
})
