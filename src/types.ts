import type { SiteConfig } from 'vitepress'

export interface UserConfig {
  vitepress: SiteConfig
}

export interface Options {
  /**
   * glob 匹配表达式
   *
   * 会匹配 [srcDir] 目录下, 除 [srcExclude] 外满足表达式的 md 文件
   *
   * 默认：**.md
   */
  pattern?: string | string[]
  /**
   * 页面的目录, 相对于项目根目录
   *
   * default: vitepress.srcDir || ./
   */
  srcDir?: string
  /**
   * 排除扫描的文件
   *
   * default: vitepress.srcExclude || []
   */
  ignoreList?: string[]
  /**
   * 是否使用一级标题代替 title, (级别低于 title)
   *
   * default: false
   */
  useH1Title?: boolean
  title?: {
    /**
     * 标题模式
     *
     * default: 'default'
     */
    mode?: TitleMode
    /**
     * 标题映射
     *
     * 例:
     * { "web/js/": "🎉JavaScript🎉" }
     *
     * default: {}
     */
    map?: Record<string, string>
  }
  /**
   * 侧边栏排序
   */
  sort?: (a: Item, b: Item) => number
}

export type TitleMode = 'default' | 'lowercase' | 'uppercase' | 'capitalize' | 'kebabcase' | 'titlecase' | ((text: string) => string)

export interface Item extends ArticleOptions {
  /**
   * 文件名称
   */
  name: string
  /**
   * 最终显示名称 优先级：配置 title > 文内 h1 > 文件名
   */
  text: string
  /**
   * 地址链接
   */
  link: string
  /**
   * 是否为文件
   */
  isFile: boolean
  /**
   * 子级
   */
  children: Item[]
}

export interface ArticleOptions {
  /**
   * 文章是否隐藏
   */
  hide?: boolean
  /**
   * 文章 Title
   */
  title?: string
  /**
   * 文章的 h1 标题(自动提取，如无设置 title 备选)
   */
  h1?: string
  /**
   * 是否为分组
   */
  group?: boolean
  /**
   * 是否添加可折叠，默认不显示
   * 默认情况下折叠为打开状态，如果希望加载时关闭，将 collapsed 设置为 true
   */
  collapsed?: boolean
}
