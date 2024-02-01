import { router } from '../index'
import { useAppStoreWithOut } from '@/store/modules/app'
import type { RouteLocationNormalized } from 'vue-router'
import { getPublicKey, generateClientKey } from '@/service/http/encipherHelper'
import { isNeedRouterHistory } from '@/enums/envEnum'

export const beforeGuard = () => {
  router.beforeEach(async (to: RouteLocationNormalized, _from, next) => {
    const appStore = useAppStoreWithOut()
    if (to.name === 'Login') {
      await generateClientKey()
      await getPublicKey()
      next()
    } else {
      if (isNeedRouterHistory) {
        setRouteHistory(to)
      }
      if (appStore.token) {
        next()
      } else {
        await generateClientKey()
        await getPublicKey()
        const appStoreCache = sessionStorage.getItem('appStore')
        if (appStoreCache) {
          appStore.$state = JSON.parse(appStoreCache)
          await appStore.GetRoutersInfo()
          await appStore.GetUserInfo()
          if (to.name === 'Login') {
            const currentRoute = router.getRoutes().filter((val: any) => val.meta.level === 1)
            const routerName = currentRoute[0].name
            next({ name: routerName })
          } else {
            next({ path: to.path })
          }
        } else {
          next({ name: 'Login' })
        }
      }
    }
  })
}

/**
 * @desc 设置路由历史并记录当前路由
 */
const setRouteHistory = (to: RouteLocationNormalized) => {
  const appStore = useAppStoreWithOut()
  appStore.activeRouter = { name: to.name }
  const routeHistory = appStore.routeHistory
  const findIndex = routeHistory.findIndex((item: any) => item.routerName === to.name)
  if (findIndex === -1 && to.name) {
    appStore.routeHistory.push({
      title: to.meta.title as string,
      routerName: to.name as string,
      closable: routeHistory.length > 0 ? true : false,
      query: to.query,
    })
  }
}
