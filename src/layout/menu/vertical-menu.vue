<template>
  <div class="vertical-menu">
    <el-scrollbar height="100%">
      <el-menu
          :default-active="activeMenu"
          :collapse="!isCollapse"
          :collapse-transition="false"
          :unique-opened="true"
      >
        <menu-item
            v-for="item in getAuthMenuList"
            :key="item.path"
            :item="item"
            :is-collapse="isCollapse"
            :notification-count="getNotificationCount(item.path)"
        ></menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { AppActionType } from '@/store/modules/app/action-types';
import { useActions, useGetters, useState } from '@/utils/hooks/store-hooks';
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import MenuItem from './menu-item.vue';

export default defineComponent({
  components: {
    MenuItem,
  },
  setup() {
    const appStates = useState('app', ['sidebarStatus', 'activeMenu']);
    const permissionGetters = useGetters('permission', ['getAuthMenuList']);
    const appActions = useActions('app', {
      setActiveMenu: AppActionType['ACTION_SET_ACTIVEMENU'],
    });
    const route = useRoute();
    const dataMap = reactive({
      isCollapse: computed(() => {
        return appStates.sidebarStatus.value;
      }),
      activeMenu: computed(() => {
        const { path } = route;
        return path;
      }),
    });

    const notificationCounts = reactive({
      '/dashboard': 3, // 设置不同菜单的数字
      '/users': 5,
      // ...
    });

    const getNotificationCount = (path: string) => {
      return notificationCounts[path] || 0;
    };

    return {
      ...appStates,
      ...permissionGetters,
      appActions,
      ...toRefs(dataMap),
      getNotificationCount,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/theme-chalk/layout/menu/menu-vertical.scss';
</style>