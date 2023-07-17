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
          ref="refCodeInfoForm"
          :rules="editFormRules"
          :model="editForm"
          label-width="112px"
      >
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="ID" prop="loanId">
              <el-input v-model="editForm.loanId" style="width: 100%" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户ID" prop="custId">
              <el-input v-model="editForm.custId" style="width: 100%" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="ECIF客户ID" prop="ecifCustId">
              <el-input v-model="editForm.ecifCustId" style="width: 100%" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="custName">
              <el-input v-model="editForm.custName" style="width: 100%" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="法人机构号" prop="lawOrgId">
              <el-input v-model="editForm.lawOrgId" style="width: 100%" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品代码" prop="prodCode">
              <el-input v-model="editForm.prodCode" style="width: 100%" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="产品名称" prop="prodName">
              <el-input v-model="editForm.prodName" style="width: 100%" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款账号" prop="loanAcct">
              <el-input v-model="editForm.loanAcct" style="width: 100%" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="账号名称" prop="loanAcctName">
              <el-input v-model="editForm.loanAcctName" style="width: 100%" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="loanContNo">
              <el-input v-model="editForm.loanContNo" style="width: 100%" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <!-- 贷款币种下拉框 -->
            <el-form-item label="贷款币种" prop="loanCurrency">
              <el-select v-model="editForm.loanCurrency" placeholder="请选择贷款币种">
                <el-option label="人民币" value="CNY"></el-option>
                <el-option label="欧元" value="EUR"></el-option>
                <el-option label="英镑" value="GBP"></el-option>
                <el-option label="日元" value="JPY"></el-option>
                <el-option label="美元" value="USD"></el-option>
                <el-option label="法国法郎" value="FRF"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 五级分类标志下拉框 -->
            <el-form-item label="五级分类标志" prop="loanFiveForm">
              <el-select v-model="editForm.loanFiveForm" placeholder="请选择五级分类标志">
                <el-option label="未分类" value="00"></el-option>
                <el-option label="正常" value="10"></el-option>
                <el-option label="关注" value="20"></el-option>
                <el-option label="次级" value="30"></el-option>
                <el-option label="可疑" value="40"></el-option>
                <el-option label="损失" value="50"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
          <el-form-item label="下期还款日期" prop="nextRepaymentDate">
            <el-input v-model="editForm.nextRepaymentDate" placeholder="请输入日期"></el-input>
          </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="func-dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" v-if="optionType !== 'view'" @click="onConfirm">确 定</el-button>
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
import { codeInfoFromRules } from './dep-loan-hook';

export default defineComponent({
  name: 'CodeTypeDialog',
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
        loanId: '',
        custId: '',
        ecifCustId: '',
        custName: '',
        lawOrgId: '',
        prodCode: '',
        prodName: '',
        loanAcct: '',
        loanAcctName: '',
        loanContNo: '',
        voucherNo: '',
        loanMon: '',
        grantMon: '',
        loanBal: '',
        badBal: '',
        loanType: '',
        loanSts: '',
        startDate: '',
        endDate: '',
        rate: '',
        loanTerm: '',
        loanCurrency: '',
        nextRepaymentMon: '',
        nextRepaymentDate: '',
        loanFiveForm: '',
        openOrgNo: '',
        mgrId: '',
        repayAcct: '',
        repayName: '',
        loanUse: '',
        sortNo: 1,
        ver: 0,
      },
      editFormRules: codeInfoFromRules,
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
      // 保存
      onConfirm() {
        console.log(dataMap.editForm);
        (refCodeInfoForm.value as any).validate(async (valid: any) => {
          if (valid) {
            const apiMethod = props.optionType === 'add' ? pcmApi.addLoan : pcmApi.updLoan;
            await apiMethod({ ...dataMap.editForm });
            const msg = props.optionType === 'add' ? '新增成功！' : '修改成功！';
            ElMessage({ type: 'success', message: msg });
            methodsMap.onUpdata();
            methodsMap.onClose();
          } else {
            return false;
          }
          return valid ? true : false;
        });
      },
      // 初始化
      initFrom() {
        if (props.optionType === 'add') return;
        nextTick(() => {
          Object.keys(dataMap.editForm).forEach((item) => {
            if (dataMap.initInfo[item]) {
              dataMap.editForm[item] = dataMap.initInfo[item];
            }
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