/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-03-07 15:51:32
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-08 11:36:30
 */
import type { Directive, DirectiveBinding } from 'vue'
import { localCache } from '@/utils/cache'
import { BUTTON_PERMISSIONS } from '@/global/constants'

const permission: Directive = {
  // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    const all_permission = '*:*:*'
    const permissions = localCache.getCache(BUTTON_PERMISSIONS)

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some((permission: string) => {
        return (
          all_permission === permission || permissionFlag.includes(permission)
        )
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
        // 或者：el.style.display = 'none'
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}

export default permission
