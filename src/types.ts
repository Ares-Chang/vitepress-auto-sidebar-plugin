import type { SiteConfig } from 'vitepress'

export interface UserConfig {
  vitepress: SiteConfig
}

export interface Options {
  /**
   * 页面的目录, 相对于项目根目录
   *
   * default: vitepress.srcDir || ./
   */
  srcDir?: string
  /**
   * fast-glob 匹配表达式 {@link https://github.com/mrmlnc/fast-glob}
   *
   * 会匹配 [srcDir] 目录下, 除 [srcExclude] 外满足表达式的 md 文件
   *
   * 默认：**.md
   */
  pattern?: string | string[]
  /**
   * 排除扫描的文件
   *
   * default: vitepress.srcExclude || []
   */
  ignoreList?: string[]
  /**
   * 是否使用文内 h1 作为标题(级别低于文内 title)
   *
   * default: true
   */
  useH1Title?: boolean
  /**
   * 文件夹标题设置
   */
  title?: TitleOptions
  /**
   * 侧边栏排序
   */
  sort?: (a: Item, b: Item) => number
}

export interface TitleOptions {
  /**
   * 标题模式
   *
   * default: 'titlecase'
   */
  mode?: TitleMode
  /**
   * 标题映射
   *
   * 例: { "web/js/": "🎉JavaScript🎉" }
   */
  map?: Record<string, string>
}

// #region TitleMode
export type TitleMode = false | 'lowercase' | 'uppercase' | 'capitalize' | 'kebabcase' | 'titlecase' | ((text: string) => string)
// #endregion TitleMode

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
   * 文件索引, 于文件名称或文内配置中提取，用于排序
   * 文内配置优先
   *
   * 文件名称例: web/1.index.md
   */
  index?: number
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
   * 分组标题
   */
  groupTitle?: string
  /**
   * 分组索引
   */
  groupIndex?: number
  /**
   * 是否添加可折叠按钮，默认不显示
   * false 情况下折叠为打开状态，如果希望加载时关闭，将 collapsed 设置为 true
   *
   * @default undefined
   */
  collapsed?: boolean
}

export type Cache = Record<string, ArticleOptions>
