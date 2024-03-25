import { describe, expect, it } from 'vitest'
import { generateSidebar } from '../src'

describe('生成侧边栏', () => {
  const paths = [
    'web/index.md',
    'web/js.md',
    'web/css/index.md',
    'web/css/background.md',
    'linux/index.md',
    'linux/wsl.md',
  ]

  it('生成默认配置', () => {
    expect(generateSidebar('./playground', paths, {})).toMatchInlineSnapshot(`
      {
        "/linux/": [
          {
            "items": [
              {
                "link": "/linux/index",
                "text": "Linux",
              },
              {
                "link": "/linux/wsl",
                "text": "WSL",
              },
            ],
            "text": "linux",
          },
        ],
        "/web/": [
          {
            "items": [
              {
                "link": "/web/index",
                "text": "Web Title",
              },
              {
                "link": "/web/js",
                "text": "js",
              },
              {
                "items": [
                  {
                    "link": "/web/css/background",
                    "text": "background",
                  },
                ],
                "text": "css",
              },
            ],
            "text": "web",
          },
        ],
      }
    `)
  })

  it('使用文件 H1 标题', () => {
    expect(generateSidebar('./playground', paths, { useH1Title: true })).toMatchInlineSnapshot(`
      {
        "/linux/": [
          {
            "items": [
              {
                "link": "/linux/index",
                "text": "Linux",
              },
              {
                "link": "/linux/wsl",
                "text": "WSL",
              },
            ],
            "text": "linux",
          },
        ],
        "/web/": [
          {
            "items": [
              {
                "link": "/web/index",
                "text": "Web Title",
              },
              {
                "link": "/web/js",
                "text": "js",
              },
              {
                "items": [
                  {
                    "link": "/web/css/background",
                    "text": "background",
                  },
                ],
                "text": "css",
              },
            ],
            "text": "web",
          },
        ],
      }
    `)
  })
})
