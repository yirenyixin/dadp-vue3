<template>
  <el-dialog
      :title="title"
      v-model="dialogVisible"
      width="950px"
      destroy-on-close
      @closed="onClose"
  >
    <div class="base-dialog-form">
      <el-form
          ref="wealthEditForm"
          :rules="editFormRules"
          :model="editForm"
          label-width="100px"
      >
        <el-row gutter="6">
          <!--                    <el-col :span="24">-->
          <el-col :span="8">
            <el-form-item label="对私理财 ID:" prop="wealthId">
              <el-input
                  v-model="editForm.wealthId"
                  :readonly="optionType != 'add'"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--                </el-row>-->
          <!--                <el-row>-->
          <el-col :span="8">
            <el-form-item label="客户ID:" prop="custId">
              <el-input
                  v-model="editForm.custId"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--                </el-row>-->
          <!--                <el-row>-->
          <el-col :span="8">
            <el-form-item label="ECIF客户ID:" prop="ecifCustId">
              <el-input
                  v-model="editForm.ecifCustId"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="6">
          <el-col :span="8">
            <el-form-item label="客户名称:" prop="custName">
              <el-input
                  v-model="editForm.custName"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--                </el-row>-->
          <!--                <el-row>-->
          <el-col :span="8">
            <el-form-item label="法人机构号:" prop="lawOrgId">
              <el-input
                  v-model="editForm.lawOrgId"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--                </el-row>-->
          <!--                <el-row>-->
          <el-col :span="8">
            <el-form-item label="开户机构号:" prop="openOrgId">
              <el-input
                  v-model="editForm.openOrgId"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="6">
          <el-col :span="8">
            <el-form-item label="产品代码:" prop="prodCode">
              <el-input
                  v-model="editForm.prodCode"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--                </el-row>-->
          <!--                <el-row>-->
          <el-col :span="8">
            <el-form-item label="产品名称:" prop="prodName">
              <el-input
                  v-model="editForm.prodName"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--                </el-row>-->
          <!--                <el-row>-->
          <el-col :span="8">
            <el-form-item label="产品类型:" prop="prodType">
              <el-input
                  v-model="editForm.prodType"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="6">
          <el-col :span="8">
            <el-form-item label="风险等级:" prop="riskLevel">
              <el-input
                  v-model="editForm.riskLevel"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--                </el-row>-->
          <!--                <el-row>-->
          <el-col :span="8">
            <el-form-item label="发行方:" prop="publicOrg">
              <el-input
                  v-model="editForm.publicOrg"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--                </el-row>-->
          <!--                <el-row>-->
          <el-col :span="8">
            <el-form-item label="业绩比较基准:" prop="perfCompareBase">
              <el-input
                  v-model="editForm.perfCompareBase"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="6">
          <el-col :span="8">
            <el-form-item label="当前余额:" prop="currentBal">
              <el-input
                  v-model="editForm.currentBal"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--                </el-row>-->
          <!--                <el-row>-->
          <el-col :span="8">
            <el-form-item label="起息日期:" prop="interestDate">
              <el-input
                  v-model="editForm.interestDate"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--                </el-row>-->
          <!--                <el-row>-->
          <el-col :span="8">
            <el-form-item label="产品到期日:" prop="endDate">
              <el-input
                  v-model="editForm.endDate"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="6">
          <el-col :span="8">
            <el-form-item label="持有收益:" prop="holdProfit">
              <el-input
                  v-model="editForm.holdProfit"
                  :readonly="optionType === 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--                </el-row>-->
          <!--                <el-row>-->
          <el-col :span="8">
            <el-form-item label="持有收益率:" prop="holdProfitRate">
              <el-input
                  v-model="editForm.holdProfitRate"
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
import * as pcmApi from '@/apis/pcm'
import { wealthFromRules } from './wealth-hook';
export default defineComponent({
  name: 'WealthDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
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
  emits: ['update:visible', 'updateList'],
  setup(props, { emit }) {
    const wealthEditForm = ref(null);
    const { dialogInfo } = { ...props };
    const dataMap = reactive({
      editForm: {
        wealthId: '',
        custId: '',
        ecifCustId:'',
        custName: '',
        lawOrgId: '',
        openOrgId: '',
        prodCode: '',
        prodName: '',
        prodType: '',
        riskLevel: '',
        publicOrg: '',
        perfCompareBase: '',
        currentBal: '',
        interestDate: '',
        endDate: '',
        holdProfit: '',
        holdProfitRate: '',
      },
      editFormRules: wealthFromRules,
      dialogVisible: computed({
        get: () => props.visible,
        set: (val: boolean) => {
          emit('update:visible', val);
        },
      }),
      initInfo: dialogInfo,
    });
    const methodsMap = reactive({
      //更新
      onUpdata() {
        emit('updateList');
      },
      //关闭
      onClose() {
        dataMap.dialogVisible = false;
      },
      //保存
      onConfirm() {
        (wealthEditForm.value as any).validate(async (valid: any) => {
          if (valid) {
            props.optionType === 'add'
                ? await pcmApi.addWealth({ ...dataMap.editForm })
                : await pcmApi.updWealth({ ...dataMap.editForm });
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
      wealthEditForm,
      ...toRefs(dataMap),
      ...toRefs(methodsMap),
    };
  },
});
</script>
