<template>
  <div class="menu-item">
    <template v-if="!item.children || !item.children.length">
      <menu-item-link :to="item.path">
        <el-menu-item :index="item.path">
          <span style="width: 58px; position: relative">
            <v-svg-icon
                v-if="item.meta.icon"
                :iconName="item.meta.icon ? `#${item.meta.icon}` : '#menu-default'"
            />
            {{ item.meta.title}}
            <span v-if="showBadge" class="badge">{{ badgeValue }}</span>
          </span>
        </el-menu-item>
      </menu-item-link>
    </template>
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <span>
          <v-svg-icon
              :iconName="item.meta.icon ? `#${item.meta.icon}` : '#menu-default'"
          />
          {{ item.meta.title }}
        </span>
      </template>
      <template v-if="item.children && item.children.length">
        <menu-item
            v-for="child in item.children"
            :key="child.path"
            :item="child"
            :is-collapse="isCollapse"
            class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, toRefs } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import MenuItemLink from './menu-item-link.vue';
import * as pmmApi from '@/apis/pmm';
import { RemindColumns, RowType } from '@/views/pmm/remind/remind-hook';

const total = reactive({ value: 0 });

const methodsMap = {
  total: toRefs(total),
  doQuery: async (doInit = false, callback: (arg0: number) => void) => {
    let params = {
      pageNo: 1,
      pageSize: 100,
    };
    console.log("qq")
    const { data: res } = await pmmApi.getRemindList(params);
    total.value = res.total;
    // console.log(total.value);
    if (callback) {
      if(total.value<100){
          callback(total.value);
      }
      else{
          callback('99+' as any);
      }
    }
  },
};

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    isCollapse: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    MenuItemLink,
  },
  data() {
    return {
      badgeValue: 1,
    };
  },
  methods: {
    updateBadgeValue(value: number) {
      this.badgeValue = value;
    },
  },
  mounted() {//会造成多次请求
    if (this.item?.meta?.title === '提醒表') {
      methodsMap.doQuery(true, this.updateBadgeValue);
    }
  },
  computed: {
    showBadge(): boolean {
      return this.item?.meta?.title === '提醒表';
    },
  },
});
</script>

<style lang="scss" scoped>
.badge {
  position: absolute;
  top: -4px;
  right: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto; //宽度自适应
  height: 10px;
  border-radius: 50%;
  background-color: blue;
  color: white;
  font-size: 12px;
  padding: 4px; // 添加一些内边距，让徽章不至于太拥挤

}
</style>