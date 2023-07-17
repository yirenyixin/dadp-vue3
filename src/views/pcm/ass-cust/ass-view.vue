<template>
  <el-header class="el-header" ><el-divider direction="vertical" /><span>经理信息</span></el-header>
  <div class="common-layout">
    <div class="common-layout-top">
      <el-row :gutter="16" justify="space-evenly">
        <el-col :span="7">
          <el-card style="height: 200px;align: middle;">
            <el-row justify="center" class="el-row_1">
              <el-avatar :size="70" :src="icon" /></el-row>
            <el-row justify="center" class="el-row_1">{{managerInfo.userName}}<el-divider direction="vertical" border-style="solid"/>{{"客户经理"}}</el-row>
        </el-card>
        </el-col>
        <el-col :span="15">
          <el-card style="height: 200px">
            <el-row :gutter="12">
              <el-col :span="8">
                <el-form-item label="经理ID：" prop="userId">
                  <span class="MySpan">{{managerInfo.userId}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号：" prop="tel">
                  <span class="MySpan">{{managerInfo.tel}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别：" prop="sex">
                  <span class="MySpan">{{managerInfo.sex}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="8">
                <el-form-item label="所属机构：" prop="orgId">
                  <span class="MySpan">{{managerInfo.orgId}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构地址：" prop="tel">
                  <span class="MySpan">{{managerInfo.tel}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人机构号：" prop="lawOrgId">
                  <span class="MySpan">{{managerInfo.lawOrgId}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="8">
                <el-form-item label="身份证号：" prop="idCardNo">
                  <span class="MySpan">{{managerInfo.idCardNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系地址：" prop="addr">
                  <span class="MySpan">{{managerInfo.addr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮箱：" prop="email">
                  <span class="MySpan">{{managerInfo.email}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="8">
                <el-form-item label="从业年限：" prop="workingYears">
                  <span class="MySpan">{{managerInfo.workingYears}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="微信号：" prop="wechatNo">
                  <span class="MySpan">{{managerInfo.wechatNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="柜员号：" prop="tellerNo">
                  <span class="MySpan">{{managerInfo.tellerNo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="common-layout-main">
      <el-header class="el-header"><el-divider direction="vertical" />分配操作</el-header>
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
      >
        <template #tableBtns>
          <div class="me-button-left">
            <el-button type="primary"
            ><el-icon><circle-plus /></el-icon> 新增</el-button
            >
            <el-button type="danger"
            ><el-icon><delete-filled /></el-icon> 删除</el-button
            >
          </div>
        </template>
        <template #table-column-end>
          <el-table-column fixed="right" label="操作" width="100">
            <template #default="scope">
              <el-button type="text" @click.stop="editCust(scope.row)"
              ><el-icon><edit /></el-icon> 修改
              </el-button>
            </template>
          </el-table-column>
        </template>
      </v-dynamic-grid>

      <ass-cust-dialog
          v-if="dialogVisible"
          v-model:visible="dialogVisible"
          :title="dialogTitle"
          :opType="optionType"
          :custInfo="dialogInfo"
          :manager-id="managerInfo.userId"
          @updateList="queryManagerInfo"
      >
      </ass-cust-dialog>


    </div>


  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue';
import {useGetters} from "@/utils/hooks/store-hooks";
import icon from '@/assets/image/icon.png';
import {custTableColumns} from "@/views/pcm/ass-cust/ass-cust-hook";
import * as pcmApi from "@/apis/pcm";
import * as sysApi from '@/apis/sys';
import {RowType} from "@/views/pcm/cust/cust-hook";
import AssCustDialog from "@/views/pcm/ass-cust/ass-cust-dialog.vue";
import UserDialog from "@/views/sys/user/user-dialog.vue";
import {getUserCodeInfo} from "@/apis/sys";
export default defineComponent({
  components: {UserDialog, AssCustDialog},

  props: {
    userId:{
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    opType: {
      type: String,
      default: '',
    },
  },


  setup(props, { emit }){
    const appGetters = useGetters('app', ['getCodeList']);
    const dataMap = reactive({
      managerInfo: {
        userId: "", // 用户ID
        userName: "", // 用户姓名
        loginName: "", // 登陆名
        tel: "", // 手机号
        password: "", // 密码
        sex: "", // 性别
        orgId: "", // 所属机构
        orgAddr: "", // 所属机构地址
        lawOrgId: "", // 法人机构号
        idCardNo: "", // 身份证号码
        addr: "", // 联系地址
        email: "", // 邮箱
        tellerNo: "", // 柜员号
        workingYears: "", // 从业年限
        wechatNo: "", // 微信号
        roleId: "", // 当前角色
        roleIds: "", // 拥有的全部角色
        status: "", // 用户状态
        sortNo: "", // 排序号
        remark: "", // 备注
        ver: "", // 数据版本
      },





      tableColumns: custTableColumns,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],

      selectRows:[],

      icon: icon,


      dialogVisible: false,
      dialogTitle: '',
      optionType: '',
      dialogInfo: {},







    });
    const methodsMap = reactive({
      queryManagerInfo:async () => {
        let params = {
          pageNo: 1,
          pageSize: 1,
          userId: props.userId
        };
        const { data: res } = await sysApi.getUserList(params)
        dataMap.managerInfo = {...res.rows[0]}
        // console.log(res.rows);
        methodsMap.queryCustByLawOrgId();
      },
      queryCustByLawOrgId:async (doInit = false) => {
        dataMap.pageNo = doInit ? 1 : dataMap.pageNo;
        dataMap.pageSize = doInit ? 10 : dataMap.pageSize;
        let params = {
          pageNo: dataMap.pageNo,
          pageSize: dataMap.pageSize,
          belongMgrId: props.userId
        };
        const { data: res } = await pcmApi.getUserRel(params)
        dataMap.tableData = res.rows;
        dataMap.total = res.total;
      },


      editCust: (row: RowType) =>{
        dataMap.dialogTitle = '修改客户经理';
        dataMap.optionType = 'update';
        dataMap.dialogInfo = {...row};
        dataMap.dialogVisible = true;

      },
      viewCust: (row: RowType) =>{
        console.log(row)
      },
      handleSelectionChange(val: any) {
        dataMap.selectRows = val;
      },

    });




    onMounted(() => {
      methodsMap.queryManagerInfo();

    });
    return {
      //
      // ...toRefs(propsMap),
      ...toRefs(dataMap),
      ...toRefs(methodsMap),
      ...appGetters,
    };
  },
});
</script>
<style lang="scss" scoped>
.common-layout {
  height: 100%;
  width: 100%;
  .common-layout-top {
    height: 33%;
  }
  .common-layout-main {
    height: 67%;
  }
}
.el-row_1 {
  margin-top: 10px;
  margin-bottom: 15px;
}
.el-row_2 {
  margin-left:30px;
  margin-right:30px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap
}
.el-header{
  height: 30px;
  font-size: 22px;
  margin-bottom:10px;
}
.image_inner{
  width: 70%;
  height: 80%;
}


.MySpan {
  display: inline-block;
  white-space: nowrap;
}
</style>