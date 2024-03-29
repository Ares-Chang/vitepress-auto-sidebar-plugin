import { describe, expect, it } from 'vitest'
import { generateSidebar, setDataFormat, setItem } from '../src'

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
    expect(setItem('web/css/background.md'.split('/')))
      .toMatchInlineSnapshot(`
        {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "isFile": true,
                  "text": "background",
                },
              ],
              "isFile": false,
              "text": "css",
            },
          ],
          "isFile": false,
          "text": "web",
        }
      `)
  })

  it('设置数据体列表', () => {
    expect(setDataFormat(cwd, paths, {}))
      .toMatchInlineSnapshot(`
        [
          {
            "children": [
              {
                "children": [],
                "isFile": true,
                "text": "index",
              },
              {
                "children": [],
                "isFile": true,
                "text": "js",
              },
              {
                "children": [
                  {
                    "children": [],
                    "isFile": true,
                    "text": "index",
                  },
                  {
                    "children": [],
                    "isFile": true,
                    "text": "background",
                  },
                ],
                "isFile": false,
                "text": "css",
              },
            ],
            "isFile": false,
            "text": "web",
          },
          {
            "children": [
              {
                "children": [],
                "isFile": true,
                "text": "index",
              },
              {
                "children": [],
                "isFile": true,
                "text": "wsl",
              },
            ],
            "isFile": false,
            "text": "linux",
          },
        ]
      `)
  })

  it.todo('使用文件 H1 标题', () => {
    expect(setDataFormat(cwd, paths, { useH1Title: true }))
      .toMatchInlineSnapshot()
  })
})

describe.todo('整理边栏返回体', () => {

})

describe.todo('生成侧边栏', () => {
  it('生成默认配置', () => {
    expect(generateSidebar()).toMatchInlineSnapshot()
  })
})
