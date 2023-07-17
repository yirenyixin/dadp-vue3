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
                    ref="remindTempEditForm"
                    :rules="editFormRules"
                    :model="editForm"
                    label-width="100px"
            >
                <el-row gutter="6">
<!--                    <el-col :span="8">-->
<!--                        <el-form-item label="事件ID:" prop="remindTempId">-->
<!--                            <el-input-->
<!--                                    v-model="editForm.remindTempId"-->
<!--                                    :readonly="optionType != 'add'"-->
<!--                            ></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
                    <!--                </el-row>-->
                    <!--                <el-row>-->
                    <el-col :span="8">
                        <el-form-item label="事件大类:" prop="eventType">
                            <el-select v-model="editForm.eventType"  clearable>
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
<!--                    <el-col :span="8">-->
<!--                        <el-form-item label="事件细类:" prop="eventSmallType">-->
<!--                            <el-input-->
<!--                                    v-model="editForm.eventSmallType"-->
<!--                                    :readonly="optionType === 'view'"-->
<!--                            ></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
                    <!--                </el-row>-->
                    <!--                <el-row>-->
                </el-row>
                <el-row gutter="6">
                    <el-col :span="8">
                        <el-form-item label="金额（元）:" prop="thresholdMon">
                            <el-input
                                    v-model="editForm.thresholdMon"
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="提前提醒天数:" prop="dayNum">
                            <el-input
                                    v-model="editForm.dayNum"
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <!--                </el-row>-->
                    <!--                <el-row>-->
                    <el-col :span="8">
                        <el-form-item label="提醒角色:" prop="remindRoleId">
                            <el-input
                                    v-model="editForm.remindRoleId"
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <!--                </el-row>-->
                    <!--                <el-row>-->
                </el-row>
                <el-row gutter="6">
                    <el-col :span="8">
                        <el-form-item label="状态" prop="isOk">
                            <el-select v-model="editForm.isOk" size="large" clearable>
                                <el-option
                                        v-for="item in getCodeList['isOk']"
                                        :key="item.value"
                                        :label="item.content"
                                        :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
<!--                    <el-col :span="8">-->
<!--                        <el-form-item label="状态:" prop="isOk">-->
<!--                            <el-input-->
<!--                                    v-model="editForm.isOk"-->
<!--                                    :readonly="optionType === 'view'"-->
<!--                            ></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
                    <el-col :span="8">
                        <el-form-item label="有效天数:" prop="validDay">
                            <el-input
                                    v-model="editForm.validDay"
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <!--                </el-row>-->
                    <!--                <el-row>-->
                    <el-col :span="8">
                        <el-form-item label="维护人:" prop="modifyUserId">
                            <el-input
                                    v-model="editForm.modifyUserId"
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                    <!--                <el-row>-->
                <el-row gutter="6">
                    <el-col :span="8">
                        <el-form-item label="修改时间:" prop="modifyTime">
                            <el-input
                                    v-model="editForm.modifyTime"
                                    :readonly="optionType === 'view'"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="维护人所在机构:" prop="modifyOrgId">
                            <el-input
                                    v-model="editForm.modifyOrgId"
                                    :readonly="optionType === 'view'"
                            ></el-input>
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
    import * as pmmApi from '@/apis/pmm'
    import { remindTempFromRules } from './remindTemp-hook';
    import {useGetters} from "@/utils/hooks/store-hooks";
    export default defineComponent({
        name: 'RemindTempDialog',
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
            const remindTempEditForm = ref(null);
            const { dialogInfo } = { ...props };
            const dataMap = reactive({
                editForm: {
                    remindTempId: '',
                    eventType: '',
                    eventSmallType:'',
                    thresholdMon: '',
                    dayNum: '',
                    remindRoleId: '',
                    isOk: '',
                    validDay: '',
                    modifyUserId: '',
                    modifyTime: '',
                    modifyOrgId: '',
                },
                editFormRules: remindTempFromRules,
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
                    (remindTempEditForm.value as any).resetFields();
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
                    (remindTempEditForm.value as any).validate(async (valid: any) => {
                        if (valid) {
                            props.optionType === 'add'
                                ? await pmmApi.addRemindTemp({ ...dataMap.editForm })
                                : await pmmApi.updRemindTemp({ ...dataMap.editForm });
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
                remindTempEditForm,
                ...toRefs(dataMap),
                ...toRefs(methodsMap),
                ...appGetters,
            };
        },
    });
</script>
