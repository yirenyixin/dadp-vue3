<template>
  <div class="me-layout">
    <el-container style="width: 100%;height: 100%">
      <el-aside width="200px">

        <el-input
            placeholder="输入关键字进行搜索"
            class="filter"
            v-model="filterText"
        >
        </el-input>
        <!--            <template #append>-->
        <!--              <el-button @click="orgSelectVisible = true"-->
        <!--              >-->
        <!--                <el-icon>-->
        <!--                  <search/>-->
        <!--                </el-icon-->
        <!--                >-->
        <!--              </el-button>-->
        <!--            </template>-->

        <el-scrollbar height="50vh">
          <el-tree
              :data="orgTreeData"
              :show-checkbox="multiple"
              :check-strictly="true"
              node-key="id"
              ref="orgSelectTreeRef"
              highlight-current
              :default-expanded-keys="defaultExpandedKeys"
              :default-checked-keys="defaultCheckedKeys"
              :filter-node-method="filterNode"
              :props="defaultProps"
              @node-click="handleNodeClick"
          ></el-tree>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <div class="me-layout">
          <div class="me-layout-header-two">
            <div class="me-layout-form">
              <el-form width="100%" :model="queryParams" label-width="120px">
                <el-row :gutter="12">
                  <el-col :span="8">
                    <el-form-item label="用户名" prop="userName">
                      <el-input v-model="queryParams.userName" clearable></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="手机号" prop="tel">
                      <el-input v-model="queryParams.tel" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别" prop="sex">
                      <el-select v-model="queryParams.sex" size="large" clearable>
                        <el-option
                            v-for="item in getCodeList['userSex']"
                            :key="item.value"
                            :label="item.content"
                            :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="12">
                  <!--                  <el-col :span="8">-->
                  <!--                    <el-form-item label="所属机构" prop="orgName">-->
                  <!--                      <el-input-->
                  <!--                          type="text"-->
                  <!--                          v-model="queryParams.orgName"-->
                  <!--                          readonly-->
                  <!--                          clearable-->
                  <!--                      >-->
                  <!--                        <template #append>-->
                  <!--                          <el-button @click="orgSelectVisible = true"-->
                  <!--                          >-->
                  <!--                            <el-icon>-->
                  <!--                              <search/>-->
                  <!--                            </el-icon-->
                  <!--                            >-->
                  <!--                          </el-button>-->
                  <!--                        </template>-->
                  <!--                      </el-input>-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-col>-->
                  <el-col :span="8">
                    <el-form-item label="当前角色" prop="roleId">
                      <el-select v-model="queryParams.roleId" size="large" clearable>
                        <el-option
                            v-for="item in getCodeList['roleId']"
                            :key="item.value"
                            :label="item.content"
                            :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="用户状态" prop="status">
                      <el-select v-model="queryParams.status" size="large" clearable>
                        <el-option
                            v-for="item in getCodeList['userStatus']"
                            :key="item.value"
                            :label="item.content"
                            :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="me-butons-center">
                    <el-button type="primary" @click="doQuery(true)"
                    >
                      <el-icon>
                        <search/>
                      </el-icon>
                      查询
                    </el-button
                    >
                    <el-button @click="resetForm"
                    >
                      <el-icon>
                        <refresh-right/>
                      </el-icon>
                      重置
                    </el-button
                    >
                  </el-col>

                </el-row>
                <!--                <el-row>-->
                <!--                  <el-col :span="24" class="me-butons-center">-->
                <!--                    <el-button type="primary" @click="doQuery(true)"-->
                <!--                    >-->
                <!--                      <el-icon>-->
                <!--                        <search/>-->
                <!--                      </el-icon>-->
                <!--                      查询-->
                <!--                    </el-button-->
                <!--                    >-->
                <!--                    <el-button @click="resetForm"-->
                <!--                    >-->
                <!--                      <el-icon>-->
                <!--                        <refresh-right/>-->
                <!--                      </el-icon>-->
                <!--                      重置-->
                <!--                    </el-button-->
                <!--                    >-->
                <!--                  </el-col>-->
                <!--                </el-row>-->
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
                @row-click="viewUser"
                @selection-change="handleSelectionChange"
                @size-change="doQuery"
                @current-change="doQuery"
            >
              <template #tableBtns>
<!--                <div class="me-button-left">-->
<!--                  <el-button type="primary" @click="addUser"-->
<!--                  >-->
<!--                    <el-icon>-->
<!--                      <circle-plus/>-->
<!--                    </el-icon>-->
<!--                    新增-->
<!--                  </el-button-->
<!--                  >-->
<!--                  <el-button type="danger" @click="deleteUser"-->
<!--                  >-->
<!--                    <el-icon>-->
<!--                      <delete-filled/>-->
<!--                    </el-icon>-->
<!--                    删除-->
<!--                  </el-button-->
<!--                  >-->
<!--                </div>-->
              </template>
              <template #table-column-end>
                <el-table-column fixed="right" label="操作" width="120">
                  <template #default="scope">
<!--                    <el-button type="text" @click.stop="editUser(scope.row)"-->
<!--                    >修改-->
<!--                    </el-button>-->
                    <el-button type="text" size="small" @click.stop="assCust(scope.row)">客户管理
                    </el-button>
                  </template>
                </el-table-column>
              </template>
            </v-dynamic-grid>
<!--            <user-dialog-->
<!--                v-if="dialogVisible"-->
<!--                v-model:visible="dialogVisible"-->
<!--                :title="dialogTitle"-->
<!--                :opType="optionType"-->
<!--                :userInfo="dialogInfo"-->
<!--                @updateList="doQuery"-->
<!--            ></user-dialog>-->
            <!--            <base-org-auth-->
            <!--                v-if="orgSelectVisible"-->
            <!--                v-model:orgSelectVisible="orgSelectVisible"-->
            <!--                @getOrgSelectData="getOrgSelectData"-->
            <!--            >-->
            <!--            </base-org-auth>-->

          </div>
        </div>

      </el-main>
    </el-container>
  </div>

</template>
<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, toRefs, watch} from 'vue';
import * as sysApi from '@/apis/sys';
import {RowType, userTableColumns} from './ass-cust-hook';
import {ElMessage, ElMessageBox, ElNotification, ElTree} from 'element-plus';
import BaseOrgAuth from '@/components/business/org/authOrg/base-org-auth.vue';
import {useGetters} from '@/utils/hooks/store-hooks';
import UserDialog from './ass-cust-dialog.vue';
import {resetFields} from '@/utils/plugin/global';


import {NodeTreeItem, ListToTree, nowData} from '@/utils/tools';
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'sysUser',
  components: {UserDialog,},

  props: {
    orgSelectVisible: {
      type: Boolean,
      default: false,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    parentOrgId: {
      type: String,
      default: '',
    },
    defaultCheckedKeys: {
      type: Array,
    },
    isLawOrg: {
      type: String,
      default: '',
    },
  },
  emits: ['update:orgSelectVisible', 'getOrgSelectData'],

  setup(props, { emit }) {
    const router = useRouter();
    const appGetters = useGetters('app', ['getCodeList']);
    const dataMap = reactive({
      queryParams: {
        userId: '',
        userName: '',
        loginName: '',
        tel: '',
        password: '',
        sex: '',
        orgId: '',
        roleId: '',
        roleIds: '',
        status: '',
        sortNo: 0,
        remark: '',
        ver: 0,
        roleName: '',
        orgName: '',
      },
      orgSelectVisible: false,
      tableColumns: userTableColumns,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      selectRows: Array<RowType>(),
      dialogVisible: false,
      dialogTitle: '',
      optionType: '',
      dialogInfo: {},



      visible: computed({
        get: () => props.orgSelectVisible,
        set: (val) => {
          emit('update:orgSelectVisible', val);
        },
      }),
      defaultExpandedKeys: Array<string>(),
      defaultProps: {
        label: 'name',
        children: 'children',
      },
      orgList: Array<NodeTreeItem>(),
      orgTreeData: Array<NodeTreeItem>(),
      filterText: '',
      //获取机构列表并转为树形结构展示
      getTreeData: async () => {
        await sysApi
            .getOrgList({
              topOrgId: props.parentOrgId,
              isLawOrg: props.isLawOrg,
            })
            .then((res) => {
              const { data } = res;
              dataMap.orgList = data;
              dataMap.orgTreeData = ListToTree(data);
              data.forEach((item: any) => {
                if (item.open) dataMap.defaultExpandedKeys.push(item.id);
              });
            });
      },
      //关键字过滤
      filterNode: (value: any, data: NodeTreeItem) => {
        if (!value) return true;
        return data.name.indexOf(value) > -1;
      },
      handleOk: () => {
        let _orgSelectData = orgSelectTreeRef.value?.getCurrentNode();
        if (props.multiple) {
          //若为多选
          //第一个表示不返回当前选择的子节点数组，第二个表示返回值不包含半中间的节点
          _orgSelectData = orgSelectTreeRef.value.getCheckedNodes(false, false);
        }
        //getOrgSelectData方法中  返回的  id为机构id   name为机构名
        emit('getOrgSelectData', _orgSelectData);
        emit('update:orgSelectVisible', false);
      },
      onClose() {
        emit('update:orgSelectVisible', false);
      },


    });


    const orgSelectTreeRef = ref(ElTree);
    watch(
        () => dataMap.filterText,
        (val) => {
          (orgSelectTreeRef.value as any).filter(val);
        }
    );

    const methodsMap = reactive({
      handleNodeClick() {
        // console.log(orgSelectTreeRef.value.getCurrentNode()['id'])
        dataMap.queryParams.orgId = orgSelectTreeRef.value.getCurrentNode()['id']
        methodsMap.doQuery(true);

      },
      //获取机构
      getOrgSelectData(val: any) {
        dataMap.queryParams.orgId = val.id;
        dataMap.queryParams.orgName = val.label;
      },
      handleSelectionChange(val: any) {
        dataMap.selectRows = val;
      },
      //重置
      resetForm: () => {
        resetFields(dataMap.queryParams);
        methodsMap.doQuery(true);
      },
      //删除
      deleteUser() {
        if (dataMap.selectRows.length > 0) {
          const selectRows: Array<string> = [];
          dataMap.selectRows.forEach((k) => {
            selectRows.push(k.userId as string);
          });
          ElMessageBox.confirm(
              `确认删除用户id为${selectRows.join(',')}的用户吗？`,
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }
          )
              .then(async () => {
                await sysApi.delUser({userIds: selectRows.join(',')});
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
      editUser: (row: RowType) => {
        dataMap.dialogTitle = '修改用户';
        dataMap.optionType = 'update';
        dataMap.dialogInfo = {...row};
        dataMap.dialogVisible = true;
      },
      //新增用户
      addUser: () => {
        dataMap.dialogTitle = '新增用户';
        dataMap.optionType = 'add';
        dataMap.dialogInfo = {...dataMap.queryParams, passward: '123456'};
        dataMap.dialogVisible = true;
      },
      //查看用户
      viewUser: (row: RowType) => {
        dataMap.dialogTitle = '查看用户';
        dataMap.optionType = 'view';
        dataMap.dialogInfo = {...row};
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
          roleId: 'manager',
        };
        const {data: res} = await sysApi.getUserList(params);
        dataMap.tableData = res.rows;
        dataMap.total = res.total;
      },


      //分配客户
      assCust: (row: RowType)=> {
        router.push({
          name: 'AssCust',
          params:{
            userId:row.userId,
          }
        })

      },







    });
    onMounted(() => {
      methodsMap.doQuery(true);
      dataMap.getTreeData();
    });
    return {
      ...appGetters,
      ...toRefs(dataMap),
      ...toRefs(methodsMap),
      orgSelectTreeRef,
    };
  },
});
</script>
<style lang="scss" scoped>
.me-layout-content-three {
  margin-top: 20px;
}
</style>
