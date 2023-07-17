<template>
<!--  <div class="demo-box">-->
<!--    <v-empty v-if="showDialog">-->
<!--      <div>Hello</div>-->
<!--    </v-empty>-->
<!--  </div>-->
    <div class="me-layout">
        <div class="me-layout-header-two">
            <div class="me-layout-form">
                <el-form ref="refSearchForm" :model="queryParams" label-width="120px">
                    <el-row :gutter="12">
                        <el-col :span="8">
                            <el-form-item label="事件大类" prop="eventType">
                                <el-select v-model="queryParams.eventType" size="large" clearable>
                                    <el-option
                                            v-for="item in getCodeList['eventType']"
                                            :key="item.value"
                                            :label="item.content"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="事件细类" prop="eventSmallType">
                                <el-select v-model="queryParams.eventSmallType" size="large" clearable>
                                    <el-option
                                            v-for="item in getCodeList['eventSmallType']"
                                            :key="item.value"
                                            :label="item.content"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="me-butons-center">
                            <el-button type="primary" @click="doQuery(true)"
                            ><el-icon><search /></el-icon>查询</el-button
                            >
                            <el-button @click="resetForm"
                            ><el-icon><refresh-right /></el-icon> 重置</el-button
                            >
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="me-layout-content-two">

            <v-dynamic-grid
                    ref="dynamicGirdRef"
                    :tableData="tableData"
                    :tableColumns="tableColumns"
                    :total="total"
                    :isSelect="true"
                    v-model:currentPage="pageNo"
                    v-model:pageSize="pageSize"
                    @row-click="viewRemind"
                    @selection-change="handleSelectionChange"
                    @size-change="doQuery"
                    @current-change="doQuery"
            >
                <template #tableBtns>
                    <div class="me-button-left">
<!--                        <el-button type="primary" @click="addProduct"-->
<!--                        ><el-icon><circle-plus /></el-icon> 新增</el-button-->
<!--                        >-->
                        <el-button type="danger" @click="deleteRemind"
                        ><el-icon><delete-filled /></el-icon> 已读</el-button
                        >
                    </div>
                </template>
<!--                <template #table-column-end>-->
<!--                    <el-table-column fixed="right" label="操作" width="120">-->
<!--                        <template #default="scope">-->
<!--                          <el-button type="text" @click.stop="editRemind(scope.row)">-->
<!--                            <el-icon icon="el-icon-edit"></el-icon>-->
<!--                            已读-->
<!--                          </el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                </template>-->
            </v-dynamic-grid>
            <remind-dialog
                    v-if="dialogVisible"
                    v-model:dialogVisible="dialogVisible"
                    :dialogTitle="dialogTitle"
                    :optionType="optionType"
                    :dialogInfo="dialogInfo"
                    @updateList="doQuery"
            ></remind-dialog>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
    import * as pmmApi from '@/apis/pmm';
    import { RowType, RemindColumns } from './remind-hook';
    import { ElForm, ElMessage, ElMessageBox, ElNotification } from 'element-plus';
    import RemindDialog from './remind-dialog.vue';
    import { resetFields } from '@/utils/plugin/global';
    import {useGetters} from "@/utils/hooks/store-hooks";
    import * as pcmApi from "@/apis/pcm";
    // import { HttpListQuery } from 'path-to-http-list-query';

    export default defineComponent({

        name: 'pmmRemind',
        components: { RemindDialog},
        setup() {
          // // 在组件mounted钩子函数中显示弹窗
          // const showMessage = () => {
          //   ElMessage({
          //     message: '你有'+dataMap.total+"条提醒未读",
          //     type: 'success',
          //     offset: 100, // 设置偏移量，让弹窗显示在界面正上方
          //   });
          // };
            const appGetters = useGetters('app', ['getCodeList']);
            const refSearchForm = ref(ElForm);
            const dataMap = reactive({
                queryParams: {
                    remindId: '',
                    remindIds:'',
                    remindContent: '',
                    validDay: '',
                    createDate: '',
                    receiverUserId: '',
                    custId: '',
                    lawOrgId: '',
                    eventType: '',
                    eventSmallType: '',
                },
                tableColumns: RemindColumns,
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
              //编辑用户信息
              // editRemind: async (row: RowType) => {
              //   dataMap.dialogTitle = '查看消息';
              //   dataMap.optionType = 'view';
              //   // dataMap.dialogInfo = { ...row };
              //   // dataMap.queryParams.remindIds = row.remindId!.toString();
              //   // console.log(row.remindId);
              //   const query: HttpListQuery = {
              //     remindId: row.remindId!.toString(),
              //     // 添加其他属性
              //   };
              //
              //   await pmmApi.delRemind(query);
              //   // dataMap.queryParams.remindId=row.remindId;
              //   // dataMap.dialogVisible = true;
              // },
                //选中的行
                handleSelectionChange(val: any) {
                    dataMap.selectRows = val;
                },
              //删除
              deleteRemind() {
                if (dataMap.selectRows.length > 0) {
                  const selectRows: Array<string> = [];
                  dataMap.selectRows.forEach((k) => {
                    selectRows.push(k.remindId as string);
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
                        await pmmApi.delRemind({ remindIds: selectRows.join(',') });
                        methodsMap.doQuery();
                        location.reload()//刷新页面

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
                //重置
                resetForm: () => {
                    resetFields(dataMap.queryParams);
                    methodsMap.doQuery(true);
                },
                //查看
                viewRemind: (row: RowType) => {
                    dataMap.dialogTitle = '查看消息';
                    dataMap.optionType = 'view';
                    dataMap.dialogInfo = { ...row };
                    dataMap.dialogVisible = true;
                },

                doQuery: async (doInit = false) => {
                    dataMap.pageNo = doInit ? 1 : dataMap.pageNo;
                    dataMap.pageSize = doInit ? 10 : dataMap.pageSize;

                    let params = {
                        pageNo: dataMap.pageNo,
                        pageSize: dataMap.pageSize,
                        ...dataMap.queryParams,
                    };
                    const { data: res } = await pmmApi.getRemindList(params);
                    dataMap.tableData = res.rows;
                    dataMap.total = res.total;
                  // showMessage();
                },
            });
            onMounted(() => {
                methodsMap.doQuery(true);
              // showMessage();
            });
            return {
                ...toRefs(dataMap),
                ...toRefs(methodsMap),
                ...appGetters,
                refSearchForm,
            };
        },
    });
</script>
