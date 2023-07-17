<template>
  <el-dialog
      :title="dialogTitle"
      v-model="visible"
      width="800px"
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
          <el-col :span="12">
            <el-form-item label="ID:" prop="depFixedId">
              <el-input
                  v-model="editForm.depFixedId"
                  :disabled="optionType != 'add'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户ID:" prop="custId">
              <el-input
                  v-model="editForm.custId"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="ECIF客户ID:" prop="ecifCustId">
              <el-input
                  v-model="editForm.ecifCustId"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称:" prop="custName">
              <el-input
                  v-model="editForm.custName"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人机构号:" prop="lawOrgId">
              <el-input
                  type="text"
                  v-model="editForm.lawOrgId"
                  :disabled="optionType === 'view'"
                  maxlength="8"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品代码:" prop="prodCode">
              <el-input
                  v-model="editForm.prodCode"
                  :disabled="optionType == 'view'"
                  width="100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品名称:" prop="prodName">
              <el-input
                  v-model="editForm.prodName"
                  :disabled="optionType == 'view'"
                  width="100%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号:" prop="acctNo">
              <el-input
                  v-model="editForm.acctNo"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="子账号:" prop="subAcctNo">
              <el-input
                  v-model="editForm.subAcctNo"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存款类型:" prop="acctType">
              <el-select
                  v-model="editForm.acctType"
                  :disabled="optionType == 'view'"
              >
                <el-option label="存单" value="1"></el-option>
                <el-option label="一本通子账户" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="浮动比率:" prop="floatRate">
              <el-input
                  v-model="editForm.floatRate"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="协议利率:" prop="rate">
              <el-input
                  v-model="editForm.rate"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="币种:" prop="currNo">
              <el-input
                  v-model="editForm.currNo"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上日余额:" prop="bal">
              <el-input
                  v-model="editForm.bal"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="存期:" prop="term">
              <el-input
                  v-model="editForm.term"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期日期:" prop="endDate">
              <el-input
                  v-model="editForm.endDate"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="账户状态:" prop="acctSts">
              <el-select
                  v-model="editForm.acctSts"
                  :disabled="optionType == 'view'"
              >
                <el-option label="销户" value="1"></el-option>
                <el-option label="挂失结清" value="2"></el-option>
                <el-option label="不动户" value="3"></el-option>
                <el-option label="转收益" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户机构号:" prop="openOrgNo">
              <el-input
                  v-model="editForm.openOrgNo"
                  :disabled="optionType == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="起存日期:" prop="startDt">
              <el-input
                  type="text"
                  v-model="editForm.startDt"
                  :disabled="optionType === 'view'"
                  maxlength="8"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="凭证号:" prop="voucherNo">
              <el-input
                  v-model="editForm.voucherNo"
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
        <el-button type="primary" v-if="optionType != 'view'" @click="onConfirm">确 定</el-button>
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
import { codeInfoFromRules } from './dep-fixed-hook';

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
        depFixedId: '',
        custId: '',
        ecifCustId: '',
        custName: '',
        lawOrgId: '',
        prodCode: '',
        prodName: '',
        acctNo: '',
        subAcctNo: '',
        acctType: '',
        floatRate: '',
        rate: '',
        currNo: '',
        bal: '',
        term: '',
        endDate: '',
        acctSts: '',
        openOrgNo: '',
        startDt: '',
        voucherNo: '',
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
      //保存
      onConfirm() {
        console.log(dataMap.editForm);
        (refCodeInfoForm.value as any).validate(async (valid: any) => {
          if (valid) {
            props.optionType === 'add'
                ? await pcmApi.addDepFixed({ ...dataMap.editForm })
                : await pcmApi.updDepFixed({ ...dataMap.editForm });
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
      initForm() {
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
      methodsMap.initForm();
    });

    return {
      refCodeInfoForm,
      ...toRefs(methodsMap),
      ...toRefs(dataMap),
    };
  },
});
</script>