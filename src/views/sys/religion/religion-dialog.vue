<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    width="80vw"
    destroy-on-close
    @closed="onClose"
  >
    <div class="base-dialog-form">
      <el-scrollbar height="65vh">
        <el-form
          ref="religionEditForm"
          :model="editForm"
          :rules="editFormRules"
          label-width="100px"
        >
          <el-row :gutter="6">
            <el-col :span="8">
              <el-form-item label="宗教ID:" prop="religionId">
                <el-input
                  v-model="editForm.religionId"
                  :readonly="opType != 'add'"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宗教名称:" prop="religionName">
                <el-input
                  v-model="editForm.religionName"
                  :readonly="opType === 'view'"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="排序号:" prop="sortNo">
                <el-input-number
                    style="width: 100%"
                    v-model="editForm.sortNo"
                    :min="0"
                    :max="2147483647"
                    :disabled="opType === 'view'"
                    clearable
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6">
            <el-col :span="24">
              <el-form-item label="备注:" prop="remark">
                <el-input
                  :rows="4"
                  type="textarea"
                  v-model="editForm.remark"
                  :readonly="opType === 'view'"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-scrollbar>
    </div>
    <template #footer>
      <span class="func-dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" v-if="opType != 'view'" @click="onConfirm"
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
import * as sysApi from '@/apis/sys';
import {RowType, religionCommonRules} from './religion-hook';
import baseOrgAuth from '@/components/business/org/authOrg/base-org-auth.vue';
import { useGetters } from '@/utils/hooks/store-hooks';
import { getNameByCode } from '@/utils/plugin/global';

export default defineComponent({
  name: 'ReligionDialog',
  components: {
    //baseOrgAuth,
  },
  props: {
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
    religionInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:visible', 'updateList'],
  setup(props, { emit }) {
    const appGetters = useGetters('app', ['getCodeList']);
    const religionEditForm = ref(null);
    const { opType, religionInfo } = { ...props };
    const propsMap = reactive({
      businessType: opType,
      dialogData: religionInfo,
      dialogVisible: computed({
        get: () => props.visible,
        set: (val: boolean) => {
          emit('update:visible', val);
        },
      }),
    });
    const dataMap = reactive({
      editForm: {
        religionId: '',
        religionName: '',
        sortNo: 0,
        ver: 0,
        remark: '',
      },
      editFormRules: religionCommonRules,
    });
    const methodsMap = reactive({
      // getOrgSelectData: async (val: any) => {
      //   dataMap.editForm.orgId = val.id;
      //   dataMap.editForm.orgName = val.name;
      // },
      resetForm() {
        (religionEditForm.value as any).resetFields();
      },
      onUpdata() {
        emit('updateList');
      },
      onClose() {
        propsMap.dialogVisible = false;
      },
      //保存
      onConfirm() {
        (religionEditForm.value as any).validate(async (valid: any) => {
          if (valid) {
            let params = { ...dataMap.editForm };
            let queryParams = {} as RowType;
            Object.keys(params).forEach((item) => {
              queryParams[item] = params[item];
            });
            propsMap.businessType === 'add'
              ? await sysApi.addReligion(queryParams)
              : await sysApi.updReligion(queryParams);
            let msg =
              propsMap.businessType === 'add' ? '新增成功！' : '修改成功！';
            ElMessage({
              type: 'success',
              message: msg,
            });
            methodsMap.onClose();
            methodsMap.onUpdata();
          } else {
            return false;
          }
          return valid ? true : false;
        });
      },
      //初始化数据
      initFrom: () => {
        nextTick(() => {
          Object.keys(dataMap.editForm).forEach((item) => {
            propsMap.dialogData[item]
                ? (dataMap.editForm[item] = propsMap.dialogData[item])
                : '';
          });
        });
      },
    });
    onMounted(() => {
      methodsMap.initFrom();
    });
    return {
      religionEditForm,
      ...toRefs(propsMap),
      ...toRefs(dataMap),
      ...toRefs(methodsMap),
      ...appGetters,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
