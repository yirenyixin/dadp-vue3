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
          ref="custEditForm"
          :model="editForm"
          :rules="editFormRules"
          label-width="130px"
        >
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="ID:" prop="custId">
                <el-input
                    v-model="editForm.custId"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="ECIF客户ID:" prop="ecifCustId">
                <el-input
                    v-model="editForm.ecifCustId"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户名称:" prop="custName">
                <el-input
                    v-model="editForm.custName"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="法人机构号:" prop="lawOrgId">
                <el-input
                    v-model="editForm.lawOrgId"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人机构名称:" prop="lawOrgName">
                <el-input
                    v-model="editForm.lawOrgName"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户状态:" prop="custState">
                <el-select
                    v-model="editForm.custState"
                    filterable
                    placeholder="客户状态"
                >
                  <el-option
                      v-for="item in getCodeList['custState']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="证件类型" prop="certType">
                <el-select
                    v-model="editForm.certType"
                    filterable
                    placeholder="证件类型"
                >
                  <el-option
                      v-for="item in getCodeList['certType']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码:" prop="certNo">
                <el-input
                    v-model="editForm.certNo"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码归属地:" prop="certAddr">
                <el-input
                    v-model="editForm.certAddr"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="手机号:" prop="tel">
                <el-input
                    v-model="editForm.tel"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话:" prop="mobile">
                <el-input
                    v-model="editForm.mobile"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系地址:" prop="address">
                <el-input
                    v-model="editForm.address"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="性别:" prop="sex">
                <el-select
                    v-model="editForm.sex"
                    filterable
                    placeholder="性别"
                >
                  <el-option
                      v-for="item in getCodeList['sex']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况:" prop="marStat">
                <el-select
                    v-model="editForm.marStat"
                    filterable
                    placeholder="婚姻状况"
                >
                  <el-option
                      v-for="item in getCodeList['marStat']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期:" prop="birthday">
                <el-input
                    v-model="editForm.birthday"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="民族:" prop="nation">
                <el-select
                    v-model="editForm.nation"
                    filterable
                    placeholder="民族"
                >
                  <el-option
                      v-for="item in getCodeList['nation']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="国籍:" prop="country">
                <el-select
                    v-model="editForm.country"
                    filterable
                    placeholder="国籍"
                >
                  <el-option
                      v-for="item in getCodeList['country']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="居住性质:" prop="livingType">
                <el-select
                    v-model="editForm.livingType"
                    filterable
                    placeholder="居住性质"
                >
                  <el-option
                      v-for="item in getCodeList['livingType']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="是否拥有车辆:" prop="isOwnCar">
                <el-select
                    v-model="editForm.isOwnCar"
                    filterable
                    placeholder="家庭是否拥有车辆"
                >
                  <el-option
                      v-for="item in getCodeList['yesOrNo']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否拥有房地产:" prop="isOwnHouse">
                <el-select
                    v-model="editForm.isOwnHouse"
                    filterable
                    placeholder="家庭是否拥有房地产"
                >
                  <el-option
                      v-for="item in getCodeList['yesOrNo']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="家庭年收入:" prop="homeIntTotal">
                <el-input
                    v-model="editForm.homeIntTotal"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="最高学历:" prop="highestEdu">
                <el-select
                    v-model="editForm.highestEdu"
                    filterable
                    placeholder="最高学历"
                >
                  <el-option
                      v-for="item in getCodeList['highestEdu']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="爱好:" prop="hobby">
                <el-input
                    v-model="editForm.hobby"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行业:" prop="trade">
                <el-select
                    v-model="editForm.trade"
                    filterable
                    placeholder="行业"
                >
                  <el-option
                      v-for="item in getCodeList['trade']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="职业:" prop="profession">
                <el-select
                    v-model="editForm.profession"
                    filterable
                    placeholder="职业"
                >
                  <el-option
                      v-for="item in getCodeList['profession']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职务:" prop="position">
                <el-select
                    v-model="editForm.position"
                    filterable
                    placeholder="职务"
                >
                  <el-option
                      v-for="item in getCodeList['position']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工作单位:" prop="unitNm">
                <el-input
                    v-model="editForm.unitNm"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="黑名单客户:" prop="isBlacklist">
                <el-select
                    v-model="editForm.isBlacklist"
                    filterable
                    placeholder="黑名单客户"
                >
                  <el-option
                      v-for="item in getCodeList['yesOrNo']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="黑名单来源:" prop="blacklistSource">
                <el-input
                    v-model="editForm.blacklistSource"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注:" prop="remark">
                <el-input
                    v-model="editForm.remark"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="备注人:" prop="remarkUser">
                <el-input
                    v-model="editForm.remarkUser"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄:" prop="age">
                <el-input
                    v-model="editForm.age"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄范围:" prop="ageArea">
                <el-input
                    v-model="editForm.ageArea"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="地区编号:" prop="areaNo">
                <el-input
                    v-model="editForm.areaNo"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否商户:" prop="isMerchant">
                <el-select
                    v-model="editForm.isMerchant"
                    filterable
                    placeholder="是否商户"
                >
                  <el-option
                      v-for="item in getCodeList['yesOrNo']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否股东:" prop="isStock">
                <el-select
                    v-model="editForm.isStock"
                    filterable
                    placeholder="是否股东"
                >
                  <el-option
                      v-for="item in getCodeList['yesOrNo']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="单位地址:" prop="unitAddr">
                <el-input
                    v-model="editForm.unitAddr"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位电话:" prop="unitTel">
                <el-input
                    v-model="editForm.unitTel"
                    :readonly="opType === 'view'"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否本行员工:" prop="isEmployee">
                <el-select
                    v-model="editForm.isEmployee"
                    filterable
                    placeholder="是否本行员工"
                >
                  <el-option
                      v-for="item in getCodeList['yesOrNo']"
                      :key="item.value"
                      :label="item.content"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
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
import * as pcmApi from '@/apis/pcm';
import {RowType, custCommonRules} from './cust-hook';
import baseOrgAuth from '@/components/business/org/authOrg/base-org-auth.vue';
import { useGetters } from '@/utils/hooks/store-hooks';
import { getNameByCode } from '@/utils/plugin/global';
// import {
//   selectCertTypes, selectCustStates, selectSexs,
//   selectMarStats, selectNations, selectCountrys,
//   selectLivingTypes, selectYesOrNo, selectHighestEdus,
//   selectProfessions, selectTrades, selectPositions,
// } from "@/views/pcm/cust/cust-hook";

export default defineComponent({
  name: 'CustDialog',
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
    custInfo: {
      type: Object,
      default: () => ({}),
    },
    custId:{
      type: String,
      default: '',
    }
  },
  emits: ['update:visible', 'updateList'],
  setup(props, { emit }) {
    const appGetters = useGetters('app', ['getCodeList']);
    const custEditForm = ref(null);
    const { opType, custInfo , custId} = { ...props };
    const propsMap = reactive({
      businessType: opType,
      dialogData: custInfo,
      dialogVisible: computed({
        get: () => props.visible,
        set: (val: boolean) => {
          emit('update:visible', val);
        },
      }),
    });
    const dataMap = reactive({
      editForm: {
        custId: "",
        ecifCustId: "",
        custName: "",
        lawOrgId: "",
        lawOrgName: "",
        custState: "",
        certType: "",
        certNo: "",
        certAddr: "",
        mobile: "",
        tel: "",
        address: "",
        sex: "",
        marStat: "",
        birthday: "",
        nation: "",
        country: "",
        livingType: "",
        isOwnCar: "",
        isOwnHouse: "",
        homeIntTotal: "",
        highestEdu: "",
        hobby: "",
        trade: "",
        profession: "",
        position: "",
        unitNm: "",
        isBlacklist: "",
        blacklistSource: "",
        remark: "",
        remarkUser: "",
        age: null,
        ageArea: "",
        areaNo: "",
        isMerchant: "",
        isStock: "",
        unitAddr: "",
        unitTel: "",
        isEmployee: ""
      },
      editFormRules: custCommonRules,

      // certTypes: selectCertTypes,
      // custStates: selectCustStates,
      // sexs: selectSexs,
      // marStats: selectMarStats,
      // nations: selectNations,
      // countrys: selectCountrys,
      // livingTypes: selectLivingTypes,
      // yesOrNo: selectYesOrNo,
      // highestEdus: selectHighestEdus,
      // trades: selectTrades,
      // professions: selectProfessions,
      // positions: selectPositions,



    });
    const methodsMap = reactive({
      // getOrgSelectData: async (val: any) => {
      //   dataMap.editForm.orgId = val.id;
      //   dataMap.editForm.orgName = val.name;
      // },
      resetForm() {
        (custEditForm.value as any).resetFields();
      },
      onUpdata() {
        emit('updateList');
      },
      onClose() {
        propsMap.dialogVisible = false;
      },
      //保存
      onConfirm() {
        (custEditForm.value as any).validate(async (valid: any) => {
          if (valid) {
            let params = { ...dataMap.editForm };
            let queryParams = {} as RowType;
            Object.keys(params).forEach((item) => {
              queryParams[item] = params[item];
            });
            propsMap.businessType === 'add'
              ? await pcmApi.addCust(queryParams)
              : await pcmApi.updCust(queryParams);
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
      queryCust:async() =>{
        const {data: res} = await pcmApi.getCustList({
          pageSize:1,
          pageNo:1,
          custId: props.custId
        })
        propsMap.dialogData = {...res.rows[0]};
        methodsMap.initFrom();


      },
    });


    onMounted(() => {
      methodsMap.queryCust();
    });
    return {
      custEditForm,
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
