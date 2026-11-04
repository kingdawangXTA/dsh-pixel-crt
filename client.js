window.__ModuleLoader__.load({
  id: 'dsh-pixel-crt',
  factory(require) {
    const STYLE_ID = 'dsh-pixel-crt-style'

    /* 只作用于会话框的两个容器；容器外（侧边栏、顶部栏、别的面板）一律不碰。
       颜色/圆角全走 CSS 变量，变量会继承，所以里面用变量的组件自动跟着变。 */
    const CSS = `
@font-face {
  font-family: "DSH Pixel";
  src: local("Unifont"), local("Unifont-JP"), local("Unifont Sample"),
       local("WenQuanYi Zen Hei Sharp"), local("Zpix");
  font-display: swap;
}

/* ---------- 配色与圆角：只在这两个容器上重新赋值 ---------- */
[data-conversation-region="chat"],
[data-conversation-region="composer"] {
  --dsw-alias-bg-base: #0f141c;
  --dsw-alias-bg-layer-1: #141b25;
  --dsw-alias-bg-layer-2: #1a2330;
  --dsw-alias-bg-overlay: #1a2330;
  --dsw-alias-bg-skeleton: #1a2330;
  --dsw-alias-border-l1: #26415a;
  --dsw-alias-border-l2: #3f6382;
  --dsw-alias-border-inverted: #0b1017;
  --dsw-alias-label-primary: #cfe6ea;
  --dsw-alias-label-secondary: #8fb0bd;
  --dsw-alias-brand-primary: #39d0c8;
  --dsw-alias-brand-text: #39d0c8;
  --dsw-alias-button-primary-fill: #39d0c8;
  --dsw-alias-button-primary-hover: #4ee0d8;
  --dsw-alias-interactive-bg-hover: rgba(57, 208, 200, 0.10);
  --dsw-alias-interactive-bg-active: rgba(57, 208, 200, 0.18);

  /* 输入卡、气泡、菜单走的是「specific」变量，不在主题那 14 个 token 里。
     漏掉它们就会出现白底 + 浅字：输入区底色还是白的，字却被改成了浅色。 */
  --dsw-specific-input-major: #101822;
  --dsw-specific-bubble: #16202c;
  --dsw-specific-bubble-highlight: #1e2e3d;
  --dsw-specific-menu: #16202c;
  --dsw-specific-selector: #1a2330;
  --dsw-specific-tip: #16202c;

  --dsw-alias-label-caption: #7f98a6;
  --dsw-alias-label-tertiary: #6a8494;
  --dsw-alias-state-business-primary: #39d0c8;
  --dsw-alias-button-info-fill: #2aa8a1;
  --dsw-radius-xs: 0px;
  --dsw-radius-sm: 0px;
  --dsw-radius-md: 0px;
  --dsw-radius-lg: 0px;
  --dsw-radius-xl: 0px;
  --dsw-radius-panel: 0px;

  background-color: #0f141c;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.18) 0px,
    rgba(0, 0, 0, 0.18) 1px,
    transparent 1px,
    transparent 3px
  );
  color: #cfe6ea;
}

/* ---------- 直角：容器里所有圆角归零 ---------- */
[data-conversation-region="chat"] *,
[data-conversation-region="composer"] * {
  border-radius: 0 !important;
}

/* ---------- 点阵字：只给大字号（标题、按钮、代码块标题） ---------- */
[data-conversation-region="chat"] h1,
[data-conversation-region="chat"] h2,
[data-conversation-region="chat"] h3,
[data-conversation-region="chat"] h4,
[data-conversation-region="chat"] h5,
[data-conversation-region="chat"] h6,
[data-conversation-region="composer"] button,
[data-conversation-region="chat"] button {
  font-family: "DSH Pixel", ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  font-weight: normal;
}

/* 输入区：卡片本身（包着滚动区的那层）压深，字保持浅色才看得清 */
[data-conversation-region="composer"] :has(> [data-input-scroll]) {
  border: 2px solid var(--dsw-alias-border-l2);
  box-shadow: 3px 3px 0 #05080c;
}

[data-conversation-region="composer"] textarea,
[data-conversation-region="composer"] input,
[data-conversation-region="composer"] [contenteditable="true"] {
  background: transparent;
  color: var(--dsw-alias-label-primary);
  caret-color: #39d0c8;
}

/* ---------- 按钮：硬边 + 方块阴影 ---------- */
[data-conversation-region="composer"] button,
[data-conversation-region="chat"] button {
  border: 2px solid var(--dsw-alias-border-l2) !important;
  box-shadow: 3px 3px 0 #05080c;
  transition: none;
}

[data-conversation-region="composer"] button:active,
[data-conversation-region="chat"] button:active {
  box-shadow: 1px 1px 0 #05080c;
  transform: translate(2px, 2px);
}

/* ---------- 代码块 / 行内代码 ---------- */
[data-conversation-region="chat"] pre {
  background: #0b1017 !important;
  border: 2px solid var(--dsw-alias-border-l1);
  box-shadow: 3px 3px 0 #05080c;
  color: #a7e0c8;
  padding: 10px 12px;
}

[data-conversation-region="chat"] :not(pre) > code {
  background: rgba(57, 208, 200, 0.12);
  border: 1px solid rgba(57, 208, 200, 0.35);
  color: #9fe8dd;
  padding: 0 3px;
}

/* ---------- 引用、分隔线、表格 ---------- */
[data-conversation-region="chat"] blockquote {
  border-left: 4px solid var(--dsw-alias-border-l2) !important;
  background: rgba(63, 99, 130, 0.12);
  color: #a9c3cf;
  padding: 4px 10px;
}

[data-conversation-region="chat"] hr {
  border: none;
  border-top: 2px dashed var(--dsw-alias-border-l1);
}

[data-conversation-region="chat"] table {
  border-collapse: collapse;
  border: 2px solid var(--dsw-alias-border-l1);
}

[data-conversation-region="chat"] th,
[data-conversation-region="chat"] td {
  border: 1px solid var(--dsw-alias-border-l1) !important;
  padding: 4px 8px;
}

/* ---------- 选字、焦点 ---------- */
[data-conversation-region="chat"] ::selection,
[data-conversation-region="composer"] ::selection {
  background: #39d0c8;
  color: #08211f;
}

[data-conversation-region="chat"] :focus-visible,
[data-conversation-region="composer"] :focus-visible {
  outline: 2px dashed #39d0c8;
  outline-offset: 1px;
}

/* ---------- 滚动条：方块滑块 ---------- */
[data-conversation-region="chat"]::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

[data-conversation-region="chat"]::-webkit-scrollbar-track {
  background: #0b1017;
}

[data-conversation-region="chat"]::-webkit-scrollbar-thumb {
  background: #3f6382;
  border: 2px solid #0b1017;
  border-radius: 0;
}
`

    /* 有些组件把底色写死在局部变量里（--deliverable-fill、color-mix(#fff 50%) …），
       变量覆盖不到。这里做一次兜底：只处理「浅底 + 浅字」这种真看不清的组合。 */
    const PATCH = 'data-px-fixed'

    function rgbaOf(value) {
      const m = /^rgba?\(([^)]+)\)$/.exec((value || '').trim())
      if (!m) return null
      const parts = m[1].split(/[\s,/]+/).filter(Boolean).map(Number)
      if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) return null
      return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 }
    }

    function luminance({ r, g, b }) {
      const f = (c) => {
        const v = c / 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      }
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
    }

    const REGIONS = '[data-conversation-region="chat"], [data-conversation-region="composer"]'

    function fixContrast(root) {
      if (!root || !root.querySelectorAll) return 0
      let fixed = 0
      for (const el of root.querySelectorAll('*')) {
        if (el.hasAttribute(PATCH)) continue
        const cs = getComputedStyle(el)
        const bg = rgbaOf(cs.backgroundColor)
        const fg = rgbaOf(cs.color)
        if (!bg || !fg) continue
        if (bg.a >= 0.4 && luminance(bg) > 0.5 && luminance(fg) > 0.42) {
          el.style.setProperty('background-color', '#1a2330', 'important')
          el.setAttribute(PATCH, 'bg')
          fixed += 1
        } else if (bg.a < 0.1 && luminance(fg) < 0.14) {
          el.style.setProperty('color', '#cfe6ea', 'important')
          el.setAttribute(PATCH, 'fg')
          fixed += 1
        }
      }
      return fixed
    }

    function mount() {
      // 热更时同一个 id 的 <style> 会被复用：不能直接 return，否则改完的 CSS 不会生效。
      let style = document.getElementById(STYLE_ID)
      if (!style) {
        style = document.createElement('style')
        style.id = STYLE_ID
        style.dataset.plugin = 'dsh-pixel-crt'
        document.head.appendChild(style)
      }
      style.textContent = CSS

      let timer = 0
      const sweep = () => {
        timer = 0
        for (const region of document.querySelectorAll(REGIONS)) fixContrast(region)
      }
      const schedule = () => {
        if (timer) return
        timer = window.setTimeout(sweep, 180)
      }
      // 会话区是后挂载的，整棵树都听着；只在有会话区时扫，聊天流式输出也不至于卡。
      const observer = new MutationObserver(schedule)
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'data-conversation-region'],
      })
      schedule()

      return () => {
        observer.disconnect()
        if (timer) window.clearTimeout(timer)
        // 只有还是自己这份 CSS 时才移除；被新实例接管的不要误删
        if (style.textContent === CSS) style.remove()
      }
    }

    return {
      inject: [],
      apply(ctx) {
        ctx.effect(() => mount())
      },
    }
  },
})
