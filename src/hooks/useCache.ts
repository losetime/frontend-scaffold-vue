import { useAppStore } from '@/store/modules/app'

const useCache = () => {
  const appStore = useAppStore()

  appStore.$subscribe((_mutation: any, state: any) => {
    if (state.token) {
      sessionStorage.setItem('appStore', JSON.stringify(state))
    } else {
      sessionStorage.removeItem('appStore')
    }
  })
}

export default useCache
