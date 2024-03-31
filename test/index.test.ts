import { describe, expect, it } from 'vitest'
import { generateSidebar, setDataFormat, setItem } from '../src'

const cwd = './playground'
const paths = [
  'web/index.md',
  'web/js.md',
  'web/css/index.md',
  'web/css/background.md',
  'linux/index.md',
  'linux/wsl.md',
]

describe('处理文件数据', () => {
  it('设置数据体', () => {
    expect(setItem(cwd, 'web/css/background.md'.split('/'), {}))
      .toMatchInlineSnapshot(`
        {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "h1": "background",
                  "isFile": true,
                  "link": "web/css/background.md",
                  "name": "background",
                  "text": "background",
                },
              ],
              "isFile": false,
              "link": "web/css",
              "name": "css",
              "text": "css",
            },
          ],
          "isFile": false,
          "link": "web",
          "name": "web",
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
                "h1": "web",
                "isFile": true,
                "link": "web/index.md",
                "name": "index",
                "text": "Web Title",
                "title": "Web Title",
              },
              {
                "children": [],
                "h1": "js",
                "isFile": true,
                "link": "web/js.md",
                "name": "js",
                "text": "js",
              },
              {
                "children": [
                  {
                    "children": [],
                    "h1": "css",
                    "hide": true,
                    "isFile": true,
                    "link": "web/css/index.md",
                    "name": "index",
                    "text": "index",
                  },
                  {
                    "children": [],
                    "h1": "background",
                    "isFile": true,
                    "link": "web/css/background.md",
                    "name": "background",
                    "text": "background",
                  },
                ],
                "isFile": false,
                "link": "web/css",
                "name": "css",
                "text": "css",
              },
            ],
            "isFile": false,
            "link": "web",
            "name": "web",
            "text": "web",
          },
          {
            "children": [
              {
                "children": [],
                "h1": "Linux",
                "isFile": true,
                "link": "linux/index.md",
                "name": "index",
                "text": "index",
              },
              {
                "children": [],
                "h1": "WSL",
                "isFile": true,
                "link": "linux/wsl.md",
                "name": "wsl",
                "text": "wsl",
              },
            ],
            "isFile": false,
            "link": "linux",
            "name": "linux",
            "text": "linux",
          },
        ]
      `)
  })

  describe('参与用户配置', () => {
    const list = paths.slice(0, 2)

    it('使用文件 H1 标题', () => {
      expect(setDataFormat(cwd, list, { useH1Title: true }))
        .toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [],
                  "h1": "web",
                  "isFile": true,
                  "link": "web/index.md",
                  "name": "index",
                  "text": "Web Title",
                  "title": "Web Title",
                },
                {
                  "children": [],
                  "h1": "js",
                  "isFile": true,
                  "link": "web/js.md",
                  "name": "js",
                  "text": "js",
                },
              ],
              "isFile": false,
              "link": "web",
              "name": "web",
              "text": "web",
            },
          ]
        `)
    })

    it('设置 Title Mode', () => {
      expect(setDataFormat(cwd, list, { title: { mode: 'titlecase' } }))
        .toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [],
                  "h1": "web",
                  "isFile": true,
                  "link": "web/index.md",
                  "name": "index",
                  "text": "Web Title",
                  "title": "Web Title",
                },
                {
                  "children": [],
                  "h1": "js",
                  "isFile": true,
                  "link": "web/js.md",
                  "name": "js",
                  "text": "js",
                },
              ],
              "isFile": false,
              "link": "web",
              "name": "web",
              "text": "Web",
            },
          ]
        `)
    })
  })
})

describe('生成侧边栏', () => {
  it('生成默认配置', () => {
    expect(generateSidebar(setDataFormat(cwd, paths, {
      useH1Title: true,
      title: { mode: 'uppercase' },
    })))
      .toMatchInlineSnapshot(`
        {
          "/linux/": [
            {
              "items": [
                {
                  "link": "linux/index.md",
                  "text": "Linux",
                },
                {
                  "link": "linux/wsl.md",
                  "text": "WSL",
                },
              ],
              "text": "LINUX",
            },
          ],
          "/web/": [
            {
              "items": [
                {
                  "link": "web/index.md",
                  "text": "Web Title",
                },
                {
                  "link": "web/js.md",
                  "text": "js",
                },
                {
                  "items": [
                    {
                      "link": "web/css/index.md",
                      "text": "css",
                    },
                    {
                      "link": "web/css/background.md",
                      "text": "background",
                    },
                  ],
                  "text": "CSS",
                },
              ],
              "text": "WEB",
            },
          ],
        }
      `)
  })
})
