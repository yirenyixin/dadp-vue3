<template>
  <el-dialog
      :title="dialogTitle"
      v-model="visible"
      width="450px"
      destroy-on-close
      @closed="onClose"
  >
    <div class="base-dialog-form">
      <el-form
          ref="refCodeInfoForm"
          :rules="editFormRules"
          :model="editForm"
          label-width="112px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="代码类别ID:" prop="depCurrId">
              <el-input
                  v-model="editForm.depCurrId"
                  :disabled="optionType != 'add'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="客户ID:" prop="custId">
              <el-input
                  v-model="editForm.custId"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="法人机构:" >
              <el-input
                  type="text"
                  v-model="editForm.lawOrgId"
                  :disabled="optionType === 'view'"
                  maxlength="8"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="当前余额:" >
              <el-input-number
                  v-model="editForm.currentBal"
                  :disabled="optionType == 'view'"
                  width="100%"
                  :precision="2"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="产品代码:" >
              <el-input
                  v-model="editForm.prodCode"
                  :disabled="optionType == 'view'"
                  width="100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="产品名称:" >
              <el-input
                  v-model="editForm.prodName"
                  :disabled="optionType == 'view'"
                  width="100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="账号/卡号:" >
              <el-input
                  v-model="editForm.acctNo"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="币种:" >
              <el-select
                  v-model="editForm.currNo"
                  :disabled="optionType == 'view'"
              >
                <el-option label="人民币" value="CNY"></el-option>
                <el-option label="欧元" value="EUR"></el-option>
                <el-option label="英镑" value="GBP"></el-option>
                <el-option label="日元" value="JPY"></el-option>
                <el-option label="美元" value="USD"></el-option>
                <el-option label="法国法郎" value="FRF"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上日余额:" >
              <el-input-number
                  v-model="editForm.bal"
                  :disabled="optionType == 'view'"
                  width="100%"
                  :precision="2"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="账户状态:" >
              <el-input
                  v-model="editForm.acctSts"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="子账户开户行:" >
              <el-input
                  v-model="editForm.openOrgNo"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="开户日期:" >
              <el-input
                  type="text"
                  v-model="editForm.startDt"
                  :disabled="optionType === 'view'"
                  maxlength="8"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="凭证号:" >
              <el-input
                  v-model="editForm.voucherNo"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="活期子账户:" >
              <el-input
                  v-model="editForm.subAcctNo"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <span class="func-dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" v-if="optionType != 'view'" @click="onConfirm"
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
import * as pcmApi from '@/apis/pcm';
import { depCurrFromRules } from './dep-curr-hook';

export default defineComponent({
  name: 'DepCurrDialog',
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
    const { dialogInfo } = { ...props };
    const refCodeInfoForm = ref(null);
    const dataMap = reactive({
      editForm: {
        codeTypeId: '1',
        codeTypeName: '1',
        isPinyin: '0',
        depCurrId: '',
        custId: '',
        ecifCustId: '',
        custName: '',
        lawOrgId: '',
        prodCode: '',
        prodName: '',
        acctNo: '',
        currNo: '',
        bal: '',
        acctSts: '',
        openOrgNo: '',
        startDt: '',
        voucherNo: '',
        subAcctNo: '',
        currentBal: 0.0,
        sortNo: 1,
        ver: 0,
      },
      editFormRules: depCurrFromRules,
      visible: computed({
        get: () => props.dialogVisible,
        set: (val: boolean) => {
          emit('update:dialogVisible', val);
        },
      }),
      initInfo: dialogInfo,
    });

    const methodsMap = reactive({
      resetForm() {
        (refCodeInfoForm.value as any).resetFields();
      },
      onUpdata() {
        emit('updateList');
      },
      onClose() {
        dataMap.visible = false;
      },
      //保存
      onConfirm() {
        console.log(dataMap.editForm);
        (refCodeInfoForm.value as any).validate(async (valid: any) => {
          if (valid) {
            props.optionType === 'add'
                ? await pcmApi.addDepCurr({ ...dataMap.editForm })
                : await pcmApi.updDepCurr({ ...dataMap.editForm });
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
        if (props.optionType === 'add') return;
        nextTick(() => {
          Object.keys(dataMap.editForm).forEach((item) => {
            dataMap.initInfo[item]
                ? (dataMap.editForm[item] = dataMap.initInfo[item])
                : '';
          });
        });
      },
    });

    onMounted(() => {
      methodsMap.initFrom();
    });

    return {
      refCodeInfoForm,
      ...toRefs(methodsMap),
      ...toRefs(dataMap),
    };
  },
});
</script>
<style lang="scss" scoped></style>