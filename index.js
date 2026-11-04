/**
 * 纯前端皮肤包：宿主侧没有路由也没有状态，apply 不注册任何东西。
 * 真正的活都在 client.js 里，往 document.head 塞一段作用域 CSS。
 */
export const inject = []

export function apply() {}
