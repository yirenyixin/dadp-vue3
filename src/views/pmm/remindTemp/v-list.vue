<template>
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
                        <el-col :span="8">
                            <el-form-item label="状态" prop="isOk">
                                <el-select v-model="queryParams.isOk" size="large" clearable>
                                    <el-option
                                            v-for="item in getCodeList['isOk']"
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
                    @row-click="viewRemindTemp"
                    @selection-change="handleSelectionChange"
                    @size-change="doQuery"
                    @current-change="doQuery"
            >
                <template #tableBtns>
                    <div class="me-button-left">
                        <el-button type="primary" @click="addRemindTemp"
                        ><el-icon><circle-plus /></el-icon> 新增</el-button
                        >
                        <el-button type="danger" @click="deleteRemindTemp"
                        ><el-icon><delete-filled /></el-icon> 删除</el-button
                        >
                    </div>
                </template>
                <template #table-column-end>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template #default="scope">
                            <el-button type="text" @click.stop="editRemindTemp(scope.row)"
                            ><el-icon><edit /></el-icon> 修改
                            </el-button>
                        </template>
                    </el-table-column>
                </template>
            </v-dynamic-grid>
            <remindTemp-dialog
                    v-if="dialogVisible"
                    v-model:dialogVisible="dialogVisible"
                    :dialogTitle="dialogTitle"
                    :optionType="optionType"
                    :dialogInfo="dialogInfo"
                    @updateList="doQuery"
            ></remindTemp-dialog>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
    import * as pmmApi from '@/apis/pmm' ;
    import { RowType, RemindTempColumns } from './remindTemp-hook';
    import { ElForm, ElMessage, ElMessageBox, ElNotification } from 'element-plus';
    import RemindTempDialog from './remindTemp-dialog.vue';
    import { resetFields } from '@/utils/plugin/global';
    import {useGetters} from "@/utils/hooks/store-hooks";
    export default defineComponent({
        name: 'pmmRemindTemp',
        components: { RemindTempDialog },
        setup() {
            const appGetters = useGetters('app', ['getCodeList']);
            const refSearchForm = ref(ElForm);
            const dataMap = reactive({
                queryParams: {
                    remindTempId: '',
                    eventType: '',
                    eventSmallType: '',
                    thresholdMon: '',
                    dayNum: '',
                    remindRoleId: '',
                    isOk: '',
                    validDay: '',
                    modifyUserId: '',
                    modifyTime: '',
                    modifyOrgId: '',
                },
                tableColumns: RemindTempColumns,
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
                //选中的行
                handleSelectionChange(val: any) {
                    dataMap.selectRows = val;
                },
                //重置
                resetForm: () => {
                    resetFields(dataMap.queryParams);
                    methodsMap.doQuery(true);
                },
                //查看
                viewRemindTemp: (row: RowType) => {
                    dataMap.dialogTitle = '查看事件参数';
                    dataMap.optionType = 'view';
                    dataMap.dialogInfo = { ...row };
                    dataMap.dialogVisible = true;
                },
                //新增
                addRemindTemp: () => {
                    dataMap.dialogTitle = '新增事件参数';
                    dataMap.optionType = 'add';
                    dataMap.dialogInfo = {} as RowType;
                    dataMap.dialogVisible = true;
                },
                //编辑
                editRemindTemp: (row: RowType) => {
                    dataMap.dialogTitle = '修改事件参数';
                    dataMap.optionType = 'update';
                    dataMap.dialogInfo = { ...row };
                    dataMap.dialogVisible = true;
                },
                //删除
                deleteRemindTemp: () => {
                    if (dataMap.selectRows.length > 0) {
                        const selectRows: Array<string> = [];
                        dataMap.selectRows.forEach((k) => {
                            selectRows.push(k.remindTempId as string);
                        });
                        ElMessageBox.confirm(
                            `确认删除id为${selectRows.join(',')}的事件参数吗？`,
                            '提示',
                            {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                            }
                        )
                            .then(async () => {
                                await pmmApi.delRemindTemp({ remindTempIds: selectRows.join(',') });
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
                //查询列表数据
                doQuery: async (doInit = false) => {
                    dataMap.pageNo = doInit ? 1 : dataMap.pageNo;
                    dataMap.pageSize = doInit ? 10 : dataMap.pageSize;

                    let params = {
                        pageNo: dataMap.pageNo,
                        pageSize: dataMap.pageSize,
                        ...dataMap.queryParams,
                    };
                    const { data: res } = await pmmApi.getRemindTempList(params);
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
                refSearchForm,
            };
        },
    });
</script>
