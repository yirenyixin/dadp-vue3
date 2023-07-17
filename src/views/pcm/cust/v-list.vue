<template>
  <div class="me-layout">
    <div class="me-layout-header-three">
      <div class="me-layout-form">
        <el-form width="100%" :model="queryParams" label-width="120px">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="客户名称" prop="custName">
                <el-input v-model="queryParams.custName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户ID" prop="custState">
                <el-input v-model="queryParams.custId" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户经理名称" prop="custState">
                <el-input v-model="queryParams.belongMgrName" clearable></el-input>
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
          @row-click="viewCust"
          @selection-change="handleSelectionChange"
          @size-change="doQuery"
          @current-change="doQuery"
      >
        <template #tableBtns>
          <div class="me-button-left">
            <el-button type="primary" @click="addCust"
            ><el-icon><circle-plus /></el-icon> 新增</el-button
            >
            <el-button type="danger" @click="deleteCust"
            ><el-icon><delete-filled /></el-icon> 删除</el-button
            >
          </div>
        </template>
        <template #table-column-end>
          <el-table-column fixed="right" label="操作" width="100">
            <template #default="scope">
              <el-button type="text" @click.stop="editCust(scope.row)"
              >修改
              </el-button>
              <el-button type="text" size="small" @click.stop="viewUserInfo(scope.row)">查看
              </el-button>
            </template>
          </el-table-column>
        </template>
      </v-dynamic-grid>
      <cust-dialog
          v-if="dialogVisible"
          v-model:visible="dialogVisible"
          :title="dialogTitle"
          :opType="optionType"
          :custId="custId"
          @updateList="doQuery"
      ></cust-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import * as pcmApi from '@/apis/pcm';
import { RowType, custTableColumns } from './cust-hook';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import BaseOrgAuth from '@/components/business/org/authOrg/base-org-auth.vue';
import { useGetters } from '@/utils/hooks/store-hooks';

import custDialog from './cust-dialog.vue';
import { resetFields } from '@/utils/plugin/global';
import {useRouter} from "vue-router";
export default defineComponent({
  name: 'pcmCust',
  components: { custDialog },
  setup() {
    const router = useRouter();
    // const appGetters = useGetters('user', ['getUserInfo']);
    const appGetters = useGetters('app', ['getCodeList']);
    const dataMap = reactive({
      queryParams: {
        userRelId: '',
        custId: '',
        lawOrgId:'',
        ecifCustId:'',
        custName:'',
        belongMgrId:'',
        belongMgrName:'',
        mainMgrType:'',
        assignType:'',
        beginDate:'',
        endDate:'',
        assignUserId:'',
        assignDate:'',
      },
      tableColumns: custTableColumns,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      selectRows: Array<RowType>(),
      dialogVisible: false,
      dialogTitle: '',
      optionType: '',
      dialogInfo: {},
      custId:'',





      // loginUserName: '',
      // loginOrgId: '',
      // loginLawOrgID: '',

    });

    const methodsMap = reactive({
      handleSelectionChange(val: any) {
        dataMap.selectRows = val;
      },
      //重置
      resetForm: () => {
        resetFields(dataMap.queryParams);
        methodsMap.doQuery(true);
      },
      //删除
      deleteCust() {
        if (dataMap.selectRows.length > 0) {
          const selectRows: Array<string> = [];
          dataMap.selectRows.forEach((k) => {
            selectRows.push(k.custId as string);
          });
          ElMessageBox.confirm(
              `确认删除客户id为${selectRows.join(',')}的客户吗？`,
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }
          )
              .then(async () => {
                await pcmApi.delCust({ custIds: selectRows.join(',') });
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
      editCust: (row: RowType) => {
        dataMap.dialogTitle = '修改客户';
        dataMap.optionType = 'update';
        dataMap.custId = row.custId;
        dataMap.dialogVisible = true;
      },
      //新增客户
      addCust: () => {
        dataMap.dialogTitle = '新增客户';
        dataMap.optionType = 'add';
        dataMap.dialogInfo = { ...dataMap.queryParams, passward: '123456' };
        dataMap.dialogVisible = true;
      },
      //查看客户
      viewCust: (row: RowType) => {
        dataMap.dialogTitle = '查看客户';
        dataMap.optionType = 'view';
        dataMap.custId = row.custId;
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
        const { data: res } = await pcmApi.getUserRel(params);
        dataMap.tableData = res.rows;
        dataMap.total = res.total;
      },
      //查看用户信息新页面
      viewUserInfo: (row: RowType)=> {
        router.push({
          name: 'ViewCust',
          params:{
            viewCustId:row.custId,
          }
        })
      },


    });
    onMounted(() => {
      //const userInfo:any = sessionStorage.getItem("userInfo")
      //dataMap.loginUserName = JSON.parse(userInfo)['userName']
      //dataMap.loginOrgId = JSON.parse(userInfo)['orgId']
      // dataMap.loginLawOrgID = JSON.parse(userInfo)['lawOrgId']
      //dataMap.loginLawOrgID = dataMap.loginOrgId
      //console.log(userInfo);

      // console.log(dataMap.loginUserName);
      //console.log(dataMap.loginOrgId);
      // console.log(dataMap.loginLawOrgID);



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
