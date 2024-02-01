<template>
  <div class="route-history-wrapper">
    <a-tabs
      v-bind:activeKey="activeRouter.name"
      tab-position="top"
      type="editable-card"
      hideAdd
      @change="handleCheckRoute"
      @edit="handleDelete"
    >
      <a-tab-pane v-for="item in routeHistory" :key="item.routerName" :tab="item.title" :closable="item.closable" />
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useRouter } from 'vue-router'

const appStore = useAppStore()

const router = useRouter()

const routeHistory = computed(() => appStore.routeHistory)

const activeRouter = computed(() => appStore.activeRouter)

const handleCheckRoute = (key: string) => {
  const findItem = routeHistory.value.find((item: any) => item.routerName === key)
  router.push({ name: key, query: findItem?.query })
}

const handleDelete = (key: string) => {
  const routeHistory = appStore.routeHistory
  const findIndex = routeHistory.findIndex((item: any) => item.routerName === key)
  appStore.routeHistory.splice(findIndex, 1)
  // 如果删除的是当前菜单，则导航到前一个菜单
  if (activeRouter.value.name === key) {
    const findItem = routeHistory[findIndex - 1]
    router.push({ name: findItem.routerName, query: findItem?.query })
  }
}
</script>

<style lang="less" scoped>
.route-history-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  margin-bottom: 14px;
  background-color: #ffffff;
  border-top: 4px solid #009688;
  ::v-deep(.ant-tabs) {
    height: 40px;
    width: calc(100vw - 200px);
    .ant-tabs-tab-active {
      background-color: #009688;
      .ant-tabs-tab-btn {
        color: #ffffff;
      }
    }
  }
}
</style>
