<template>
  <div class="me-layout">
    <div class="me-layout-header-three">
      <div class="me-layout-form">
        <el-form width="100%" :model="queryParams" label-width="120px">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="宗教名称" prop="religionName">
                <el-input v-model="queryParams.religionName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宗教ID" prop="religionId">
                <el-input v-model="queryParams.religionId" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="queryParams.remark" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" class="me-butons-center">
              <el-button type="primary" @click="doQuery(true)"
              ><el-icon><search /></el-icon>查询</el-button
              >
              <el-button @click="resetForm"
              ><el-icon><refresh-right /></el-icon>重置</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>

    <div class="me-layout-content-three">
      <v-dynamic-grid
          ref="dynamicGirdRef"
          :tableData="tableData"
          :tableColumns="tableColumns"
          :total="total"
          :isSelect="true"
          v-model:currentPage="pageNo"
          v-model:pageSize="pageSize"
          @row-click="viewReligion"
          @selection-change="handleSelectionChange"
          @size-change="doQuery"
          @current-change="doQuery"
      >
        <template #tableBtns>
          <div class="me-button-left">
            <el-button type="primary" @click="addReligion"
            ><el-icon><circle-plus /></el-icon> 新增</el-button
            >
            <el-button type="danger" @click="deleteReligion"
            ><el-icon><delete-filled /></el-icon> 删除</el-button
            >
          </div>
        </template>
        <template #table-column-end>
          <el-table-column fixed="right" label="操作" width="100">
            <template #default="scope">
              <el-button type="text" @click.stop="editReligion(scope.row)"
              ><el-icon><edit /></el-icon> 修改
              </el-button>
            </template>
          </el-table-column>
        </template>
      </v-dynamic-grid>
      <religion-dialog
          v-if="dialogVisible"
          v-model:visible="dialogVisible"
          :title="dialogTitle"
          :opType="optionType"
          :religionInfo="dialogInfo"
          @updateList="doQuery"
      ></religion-dialog>
<!--      <base-org-auth-->
<!--          v-if="orgSelectVisible"-->
<!--          v-model:orgSelectVisible="orgSelectVisible"-->
<!--          @getOrgSelectData="getOrgSelectData"-->
<!--      >-->
<!--      </base-org-auth>-->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import * as sysApi from '@/apis/sys';
import { RowType, religionTableColumns } from './religion-hook';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import BaseOrgAuth from '@/components/business/org/authOrg/base-org-auth.vue';
import { useGetters } from '@/utils/hooks/store-hooks';
import ReligionDialog from './religion-dialog.vue';
import { resetFields } from '@/utils/plugin/global';
export default defineComponent({
  name: 'sysReligion',
  components: { ReligionDialog },
  setup() {
    const appGetters = useGetters('app', ['getCodeList']);
    const dataMap = reactive({
      queryParams: {
        religionId: '',
        religionName: '',
        sortNo: 0,
        remark: '',
        ver: 0,
      },
      tableColumns: religionTableColumns,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      selectRows: Array<RowType>(),
      dialogVisible: false,
      dialogTitle: '',
      optionType: '',
      dialogInfo: {},
    });

    const methodsMap = reactive({
      //获取机构
      // getOrgSelectData(val: any) {
      //   dataMap.queryParams.orgId = val.id;
      //   dataMap.queryParams.orgName = val.label;
      // },
      handleSelectionChange(val: any) {
        dataMap.selectRows = val;
      },
      //重置
      resetForm: () => {
        resetFields(dataMap.queryParams);
        methodsMap.doQuery(true);
      },
      //删除
      deleteReligion() {
        if (dataMap.selectRows.length > 0) {
          const selectRows: Array<string> = [];
          dataMap.selectRows.forEach((k) => {
            selectRows.push(k.religionId as string);
          });
          ElMessageBox.confirm(
              `确认删除宗教id为${selectRows.join(',')}的宗教吗？`,
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }
          )
              .then(async () => {
                await sysApi.delReligion({ religionIds: selectRows.join(',') });
                methodsMap.doQuery();
              })
              .catch(() => {
                ElNotification({
                  type: 'info',
                  message: '已取消删除',
                });
              });
        } else {
          ElMessage({
            type: 'warning',
            message: '请选择需要删除的项',
          });
        }
      },
      //编辑用户信息
      editReligion: (row: RowType) => {
        dataMap.dialogTitle = '修改宗教';
        dataMap.optionType = 'update';
        dataMap.dialogInfo = { ...row };
        dataMap.dialogVisible = true;
      },
      //新增宗教
      addReligion: () => {
        dataMap.dialogTitle = '新增宗教';
        dataMap.optionType = 'add';
        dataMap.dialogInfo = { ...dataMap.queryParams, passward: '123456' };
        dataMap.dialogVisible = true;
      },
      //查看宗教
      viewReligion: (row: RowType) => {
        dataMap.dialogTitle = '查看宗教';
        dataMap.optionType = 'view';
        dataMap.dialogInfo = { ...row };
        dataMap.dialogVisible = true;
      },
      //查询列表数据
      doQuery: async (doInit = false) => {
        dataMap.pageNo = doInit ? 1 : dataMap.pageNo;
        dataMap.pageSize = doInit ? 10 : dataMap.pageSize;

        let params = {
          pageNo: dataMap.pageNo,
          pageSize: dataMap.pageSize,
          ...dataMap.queryParams,
        };
        const { data: res } = await sysApi.getReligionList(params);
        dataMap.tableData = res.rows;
        dataMap.total = res.total;
      },
    });
    onMounted(() => {
      methodsMap.doQuery(true);
    });
    return {
      ...appGetters,
      ...toRefs(dataMap),
      ...toRefs(methodsMap),
    };
  },
});
</script>
<style lang="scss" scoped>
.me-layout-content-three {
  margin-top: 20px;
}
</style>
