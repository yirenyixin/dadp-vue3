<template>
    <el-dialog
            :title="dialogTitle"
            v-model="visible"
            width="950px"
            destroy-on-close
            @closed="onClose"
    >
        <div class="base-dialog-form">
            <el-form
                    ref="remindEditForm"
                    :rules="editFormRules"
                    :model="editForm"
                    label-width="80px"
            >
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="主键" prop="remindId">
                            <el-input
                                    v-model="editForm.remindId"
                                    style="width: 100%"
                                    clearable
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="提醒内容" prop="remindContent">
                            <el-input
                                    v-model="editForm.remindContent"
                                    style="width: 100%"
                                    clearable
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="有效天数" prop="validDay">
                            <el-input
                                    v-model="editForm.validDay"
                                    style="width: 100%"
                                    clearable
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="提醒日期" prop="createDate">
                            <el-input
                                    v-model="editForm.createDate"
                                    style="width: 100%"
                                    clearable
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="接收人" prop="receiverUserId">
                            <el-input
                                    v-model="editForm.receiverUserId"
                                    style="width: 100%"
                                    clearable
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="客户号" prop="custId">
                            <el-input
                                    v-model="editForm.custId"
                                    style="width: 100%"
                                    clearable
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="客户归属法人机构" prop="lawOrgId">
                            <el-input
                                    v-model="editForm.lawOrgId"
                                    style="width: 100%"
                                    clearable
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="事件大类:" prop="eventType">
                            <el-select v-model="editForm.eventType"
                                       clearable>
                                <el-option
                                        v-for="item in getCodeList['eventType']"
                                        :key="item.value"
                                        :label="item.content"
                                        :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="事件细类" prop="eventSmallType">
                            <el-select v-model="editForm.eventSmallType" size="large" clearable>
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

            </el-form>
        </div>
        <template #footer>
      <span class="role-dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onConfirm" v-if="optionType != 'view'"
        >确 定</el-button
        >
      </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
    import { ElMessage } from 'element-plus';
    import {
        defineComponent,
        ref,
        toRefs,
        reactive,
        onMounted,
        nextTick,
        computed,
    } from 'vue';
    import * as pmmApi from '@/apis/pmm';
    import { remindFromRules } from './remind-hook';
    import {useGetters} from "@/utils/hooks/store-hooks";
    export default defineComponent({
        name: 'RemindDialog',
        props: {
            dialogVisible: {
                type: Boolean,
                default: false,
            },
            dialogTitle: {
                type: String,
                default: '',
            },
            optionType: {
                type: String,
                default: '',
            },
            dialogInfo: {
                type: Object,
                default: () => ({}),
            },
        },
        emits: ['update:dialogVisible', 'updateList'],
        setup(props, { emit }) {
            const appGetters = useGetters('app', ['getCodeList']);
            const remindEditForm = ref(null);
            const { dialogInfo } = { ...props };
            const dataMap = reactive({
                editForm: {
                    remindId: '',
                    remindContent: '',
                    validDay: '',
                    createDate: '',
                    receiverUserId: '',
                    custId: '',
                    lawOrgId: '',
                    eventType: '',
                    eventSmallType: ''
                },
                editFormRules: remindFromRules,
                visible: computed({
                    get: () => props.dialogVisible,
                    set: (val: boolean) => {
                        emit('update:dialogVisible', val);
                    },
                }),
                initInfo: dialogInfo,
            });
            const methodsMap = reactive({
                //重置
                resetForm() {
                    (remindEditForm.value as any).resetFields();
                },
                //更新
                onUpdata() {
                    emit('updateList');
                },
                //关闭
                onClose() {
                    dataMap.visible = false;
                },
                //保存
                onConfirm() {
                    (remindEditForm.value as any).validate(async (valid: any) => {
                        if (valid) {
                            props.optionType === 'add'
                                ? await pmmApi.addRemind({ ...dataMap.editForm })
                                : await pmmApi.updRemind({ ...dataMap.editForm });
                            const msg =
                                props.optionType === 'add' ? '新增成功！' : '修改成功！';
                            ElMessage({ type: 'success', message: msg });
                            methodsMap.onUpdata();
                            methodsMap.onClose();
                        } else {
                            return false;
                        }
                        return valid ? true : false;
                    });
                },
                //初始化
                initFrom() {
                    if (props.optionType != 'add') {
                        nextTick(() => {
                            Object.keys(dataMap.editForm).forEach((item) => {
                                dataMap.initInfo[item]
                                    ? (dataMap.editForm[item] = dataMap.initInfo[item])
                                    : '';
                            });
                        });
                    }
                },
            });
            onMounted(() => {
                methodsMap.initFrom();
            });
            return {
                remindEditForm,
                ...toRefs(dataMap),
                ...toRefs(methodsMap),
                ...appGetters,
            };
        },
    });
</script>
