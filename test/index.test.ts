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
              "group": undefined,
              "isFile": false,
              "link": "web/css",
              "name": "css",
              "text": "css",
            },
          ],
          "group": undefined,
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
                "group": undefined,
                "isFile": false,
                "link": "web/css",
                "name": "css",
                "text": "css",
              },
            ],
            "group": undefined,
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
            "group": undefined,
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
              "group": undefined,
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
              "group": undefined,
              "isFile": false,
              "link": "web",
              "name": "web",
              "text": "Web",
            },
          ]
        `)
    })

    it('设置 Title Map', () => {
      expect(setDataFormat(cwd, ['web/css/index.md'], { title: { map: { 'web/css/': '🎉CSS World🎉' } } }))
        .toMatchInlineSnapshot(`
          [
            {
              "children": [
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
                  ],
                  "group": undefined,
                  "isFile": false,
                  "link": "web/css",
                  "name": "css",
                  "text": "🎉CSS World🎉",
                },
              ],
              "group": undefined,
              "isFile": false,
              "link": "web",
              "name": "web",
              "text": "web",
            },
          ]
        `)
    })

    it('设置排序', () => {
      expect(setDataFormat(cwd, list, { sort: (a, b) => a.text.localeCompare(b.text) }))
        .toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [],
                  "h1": "js",
                  "isFile": true,
                  "link": "web/js.md",
                  "name": "js",
                  "text": "js",
                },
                {
                  "children": [],
                  "h1": "web",
                  "isFile": true,
                  "link": "web/index.md",
                  "name": "index",
                  "text": "Web Title",
                  "title": "Web Title",
                },
              ],
              "group": undefined,
              "isFile": false,
              "link": "web",
              "name": "web",
              "text": "web",
            },
          ]
        `)
    })
  })

  describe('文章内配置', () => {
    it('文章分组', () => {
      expect(setDataFormat(cwd, ['web/js.md', 'web/vue/index.md'], {}))
        .toMatchInlineSnapshot(`
          [
            {
              "children": [
                {
                  "children": [],
                  "h1": "js",
                  "isFile": true,
                  "link": "web/js.md",
                  "name": "js",
                  "text": "js",
                },
              ],
              "group": undefined,
              "isFile": false,
              "link": "web",
              "name": "web",
              "text": "web",
            },
            {
              "children": [
                {
                  "children": [],
                  "group": true,
                  "h1": "Vue",
                  "isFile": true,
                  "link": "web/vue/index.md",
                  "name": "index",
                  "text": "index",
                },
              ],
              "group": true,
              "isFile": false,
              "link": "web/vue",
              "name": "vue",
              "text": "vue",
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

  describe('参与文件配置', () => {
    it('隐藏文件', () => {
      expect(generateSidebar(setDataFormat(cwd, ['web/hide.md'], {})))
        .toMatchInlineSnapshot(`
          {
            "/web/": [
              {
                "items": [],
                "text": "web",
              },
            ],
          }
        `)
    })

    it('文章分组', () => {
      expect(generateSidebar(setDataFormat(cwd, ['web/js.md', 'web/vue/index.md'], {})))
        .toMatchInlineSnapshot(`
          {
            "/web/": [
              {
                "items": [
                  {
                    "link": "web/js.md",
                    "text": "js",
                  },
                ],
                "text": "web",
              },
              {
                "items": [
                  {
                    "link": "web/vue/index.md",
                    "text": "index",
                  },
                ],
                "text": "vue",
              },
            ],
          }
        `)
    })
  })
})
