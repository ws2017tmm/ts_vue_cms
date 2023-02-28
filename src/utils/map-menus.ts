/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 15:03:26
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-02-28 14:42:34
 */
import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1.动态获取所有的路由对象, 放到数组中
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []

  // 1.1.读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  // 1.2.将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export function mapMenusToRoutes(menus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()
  // 返回的路由
  const routes: RouteRecordRaw[] = []
  // 根据菜单去匹配路由
  // 递归，children有值一直遍历
  const ergodic = (list: any[]) => {
    for (const menu of list) {
      if (menu.children?.length > 0) {
        const route = menu.children[0]
        // 重定向
        if (route.url) {
          // 过滤非路由children
          routes.push({ path: menu.url, redirect: route.url })
          ergodic(menu.children)
        } else {
          const route = localRoutes.find((item) => item.path === menu.url)
          if (route) {
            routes.push(route)
          }
        }
      } else {
        const route = localRoutes.find((item) => item.path === menu.url)
        if (route) {
          routes.push(route)
        }
      }
    }
  }
  ergodic(menus)
  // 重定向/mian的路由
  routes.unshift({ path: '/main', redirect: routes[0].path })
  return routes
}

interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []

  // 2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1.顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 2.匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
