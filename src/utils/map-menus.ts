/*
 * @Description:
 * @Version: 1.0
 * @Autor: StevenWu
 * @Date: 2023-02-27 15:03:26
 * @LastEditors: StevenWu
 * @LastEditTime: 2023-03-06 16:14:08
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
  // 2.遍历获取面包屑层级
  const searchParent = (path: string, menus: any[]) => {
    // 定义面包屑
    let breadcrumbs: IBreadcrumbs[] = []
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i]
      if (menu.url === path) {
        //若查询到对应的节点，则直接返回
        breadcrumbs.push({ name: menu.name, path: menu.url })
        break
      } else if (menu.children?.length > 0) {
        const subMenu = menu.children[0]
        if (subMenu.url?.length > 0) {
          //判断是否还有子节点，若有对子节点进行循环调用
          const p = searchParent(path, menu.children)
          //若p的长度不为0，则说明子节点在该节点的children内，记录此节点，并终止循环
          if (p.length !== 0) {
            p.unshift({ name: menu.name, path: menu.url })
            breadcrumbs = p
            break
          }
        } else {
          continue
        }
      }
    }
    return breadcrumbs
  }
  return searchParent(path, userMenus)
}

/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}
