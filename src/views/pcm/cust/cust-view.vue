<template>
  <el-header class="el-header" ><el-divider direction="vertical" /><span>基础信息</span></el-header>
  <div class="common-layout">
    <div class="common-layout-top">
      <el-row :gutter="16" justify="space-evenly">
        <el-col :span="7"><el-card style="height: 200px;align: middle;">
          <el-row justify="center" class="el-row_1">
            <el-avatar :size="70" :src="icon" /></el-row>
          <el-row justify="center" class="el-row_1">{{ viewForm.custName }}<el-divider direction="vertical" border-style="solid"/>{{ "钻石用户" }}</el-row>
          <el-row justify="center" class="el-row_1"><el-button @click="doBlacklist()"><el-icon><UserFilled/></el-icon>
            <div v-if="canAddBlacklist">加入黑名单</div>
            <div v-else>移除黑名单</div>
          </el-button></el-row>
        </el-card></el-col>
        <el-col :span="15"><el-card style="height: 200px">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="客户号：" prop="custId">
                <span class="MySpan">{{viewForm.custId}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄：" prop="age">
                <span class="MySpan">{{viewForm.age}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别：" prop="sex">
                <span class="MySpan">{{viewForm.sex}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="证件类型：" prop="certType">
                <span class="MySpan">{{viewForm.certType}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：" prop="certNo">
                <span class="MySpan">{{viewForm.certNo}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码归属地：" prop="certAddr">
                <span class="MySpan">{{viewForm.certAddr}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="婚姻状态：" prop="marStat">
                <span class="MySpan">{{viewForm.marStat}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职业：" prop="profession">
                <span class="MySpan">{{viewForm.profession}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期：" prop="birthday">
                <span class="MySpan">{{viewForm.birthday}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="最高学历：" prop="highestEdu">
                <span class="MySpan">{{viewForm.highestEdu}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="名族：" prop="nation">
                <span class="MySpan">{{viewForm.nation}}</span>
              </el-form-item>
            </el-col>
<!--            <el-col :span="8">-->
<!--              <el-form-item label="出生日期：" prop="birthday">-->
<!--                <span class="MySpan">{{viewForm.birthday}}</span>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="手机号码：" prop="mobile">
                <span class="MySpan">{{viewForm.mobile}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="名族：" prop="nation">
                <span class="MySpan">{{viewForm.nation}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否商户：" prop="isMerchant">
                <span class="MySpan">{{viewForm.isMerchant}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card></el-col>
      </el-row>
    </div>
    <div class="common-layout-main">
      <el-header class="el-header"><el-divider direction="vertical" />持有产品</el-header>
      <el-row class="el-row_2" justify="space-evenly">
        <el-col span="3">
          <el-row class="el-row_1" justify="center"><el-image src="https://cdn-icons-png.flaticon.com/128/2769/2769560.png" class="image_inner" @click="imgClick(1)"></el-image></el-row>
          <el-row justify="center"><span style="font-size: 20px;text-align: center; " :class="{'blue-text': showType == 1}" >活期</span></el-row>
        </el-col>
        <el-col span="3">
          <el-row class="el-row_1" justify="center"><el-image src="https://cdn-icons-png.flaticon.com/128/3577/3577837.png" class="image_inner" @click="imgClick(2)"></el-image></el-row>
          <el-row justify="center"><span style="font-size: 20px;text-align: center" :class="{'blue-text': showType == 2}">定期</span></el-row>
        </el-col>
        <el-col span="3">
          <el-row class="el-row_1" justify="center"><el-image src="https://cdn-icons-png.flaticon.com/128/1611/1611261.png" class="image_inner" @click="imgClick(3)"></el-image></el-row>
          <el-row justify="center"><span style="font-size: 20px;text-align: center" :class="{'blue-text': showType == 3}">贷款</span></el-row>
        </el-col>
        <el-col span="3">
          <el-row class="el-row_1" justify="center"><el-image src="https://cdn-icons-png.flaticon.com/128/2806/2806331.png" class="image_inner" @click="imgClick(4)"></el-image></el-row>
          <el-row justify="center"><span style="font-size: 20px;text-align: center" :class="{'blue-text': showType == 4}">理财</span></el-row>
        </el-col>
      </el-row>

      <el-tabs v-model="holdTypeFlag" @tab-click="tabHandleClick" type="card" style="height: 160px;margin-left: 30px;margin-right: 30px;" >
        <el-tab-pane label="当前持有" name="0" ></el-tab-pane>
        <el-tab-pane label="历史持有" name="1"></el-tab-pane>
        <div style="height: 250px;">
          <v-dynamic-grid
              ref="dynamicGirdRef"
              :tableData="tableData"
              :tableColumns="tableColumns"
              :total="tableTotal"
              :isSelect="true"
              v-model:currentPage="tablePageNo"
              v-model:pageSize="tablePageSize"
              @row-click="viewAll"
              @selection-change="handleSelectionChange"
              @size-change="doQueryForView"
              @current-change="doQueryForView"


          >
            <template #tableBtns>
              <div class="me-button-left">
                <el-button type="primary" @click="viewProOwn"
                >
                  查看饼图
                </el-button
                >

              </div>
            </template>
            <template #table-column-end>
              <el-table-column fixed="right" label="操作" width="100">
                <template #default="scope">
                  <el-button type="text" @click.stop="editAll(scope.row)"
                  >修改
                  </el-button>
                  <el-button type="text" size="small" @click.stop="viewAll(scope.row)">查看
                  </el-button>
                </template>
              </el-table-column>
            </template>
          </v-dynamic-grid>
        </div>

      </el-tabs>
    </div>
  </div>






<!--  <div class="common-layout">-->
<!--    <el-row >-->
<!--      <el-container>-->
<!--        <el-aside width="200px" align="center">-->
<!--          <el-row>-->
<!--            <el-col :span="24"><div class="grid-content ep-bg-purple-dark" />-->
<!--              <el-image style="width: 100px; height: 100px" :src="require('@/assets/image/logo.png')" />-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="24"><div class="grid-content ep-bg-purple-dark" />-->
<!--              <span> {{ viewForm.custName }} ||钻石用户 </span>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="24"><div class="grid-content ep-bg-purple-dark" />-->
<!--              <el-button @click="doBlacklist()">-->
<!--                <div v-if="canAddBlacklist">-->
<!--                  加入黑名单-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  移除黑名单-->
<!--                </div>-->
<!--              </el-button>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </el-aside>-->
<!--        <el-main>-->
<!--          <div class="inputDeep">-->
<!--            <el-row :gutter="12">-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="客户号：" prop="custId">-->
<!--                  <el-input  v-model="viewForm.custId" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="年龄：" prop="age">-->
<!--                  <el-input v-model="viewForm.age" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="性别：" prop="sex">-->
<!--                  <el-input v-model="viewForm.sex" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="12">-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="证件类型：" prop="certType">-->
<!--                  <el-input  v-model="viewForm.certType" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="证件号码：" prop="certNo">-->
<!--                  <el-input v-model="viewForm.certNo" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="证件号码归属地：" prop="certAddr">-->
<!--                  <el-input v-model="viewForm.certAddr" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="12">-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="婚姻状态：" prop="marStat">-->
<!--                  <el-input  v-model="viewForm.marStat" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="职业：" prop="profession">-->
<!--                  <el-input v-model="viewForm.profession" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="出生日期：" prop="birthday">-->
<!--                  <el-input v-model="viewForm.birthday" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="12">-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="最高学历：" prop="highestEdu">-->
<!--                  <el-input  v-model="viewForm.highestEdu" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="名族：" prop="nation">-->
<!--                  <el-input v-model="viewForm.nation" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="出生日期：" prop="birthday">-->
<!--                  <el-input v-model="viewForm.birthday" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="12">-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="手机号码：" prop="mobile">-->
<!--                  <el-input  v-model="viewForm.mobile" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="名族：" prop="nation">-->
<!--                  <el-input v-model="viewForm.nation" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <el-form-item label="是否商户：" prop="isMerchant">-->
<!--                  <el-input v-model="viewForm.isMerchant" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </div>-->
<!--        </el-main>-->
<!--      </el-container>-->
<!--    </el-row>-->
<!--    <el-row>-->
<!--      <span>持有产品</span>-->
<!--    </el-row>-->
<!--    <el-row justify="center">-->
<!--      <el-col :span="3">-->
<!--&lt;!&ndash;        <span class="demonstration">活期</span>&ndash;&gt;-->
<!--        <el-image style="width: 100px; height: 100px" :src="require('@/assets/image/活期.png')" @click="imgClick(1)"/>-->
<!--      </el-col>-->
<!--      <el-col :span="3">-->
<!--&lt;!&ndash;        <span class="demonstration">定期</span>&ndash;&gt;-->
<!--        <el-image style="width: 100px; height: 100px" :src="require('@/assets/image/定期.png')" @click="imgClick(2)"/>-->
<!--      </el-col>-->
<!--      <el-col :span="3">-->
<!--&lt;!&ndash;        <span class="demonstration">贷款</span>&ndash;&gt;-->
<!--        <el-image style="width: 100px; height: 100px" :src="require('@/assets/image/贷款.png')" @click="imgClick(3)"/>-->
<!--      </el-col>-->
<!--      <el-col :span="3">-->
<!--&lt;!&ndash;        <span class="demonstration">理财</span>&ndash;&gt;-->
<!--        <el-image style="width: 100px; height: 100px" :src="require('@/assets/image/理财.png')" @click="imgClick(4)" />-->
<!--      </el-col>-->

<!--    </el-row>-->
<!--    <el-row justify="center">-->
<!--      <el-col :span="3">-->
<!--        <span class="demonstration">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;活期</span>-->
<!--      </el-col>-->
<!--      <el-col :span="3">-->
<!--        <span class="demonstration">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定期</span>-->
<!--      </el-col>-->
<!--      <el-col :span="3">-->
<!--        <span class="demonstration">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贷款</span>-->
<!--      </el-col>-->
<!--      <el-col :span="3">-->
<!--        <span class="demonstration">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;理财</span>-->
<!--      </el-col>-->
<!--    </el-row>-->

<!--  </div>-->
<!--  <div class="me-layout">-->
<!--    <v-dynamic-grid-->
<!--        ref="dynamicGirdRef"-->
<!--        :tableData="tableData"-->
<!--        :tableColumns="tableColumns"-->
<!--        :total="tableTotal"-->
<!--        :isSelect="true"-->
<!--        v-model:currentPage="tablePageNo"-->
<!--        v-model:pageSize="tablePageSize"-->
<!--        @row-click="viewAll"-->
<!--        @selection-change="handleSelectionChange"-->
<!--        @size-change="doQueryForView"-->
<!--        @current-change="doQueryForView"-->
<!--        style="height: 300px;"-->
<!--    >-->
<!--      <template #tableBtns>-->
<!--        <div v-if="showType != 1">-->
<!--          <div class="me-button-left">-->
<!--            <el-button class="button" :type="buttonCurType" @click="buttonClick(0)">当前持有</el-button>-->
<!--            <el-button class="button" :type="buttonHisType" @click="buttonClick(1)">历史持有</el-button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->


<!--      <template #table-column-end>-->
<!--        <el-table-column fixed="right" label="操作" width="100">-->
<!--          <template #default="scope">-->
<!--            <el-button type="text" @click.stop="editAll(scope.row)"-->
<!--            >修改-->
<!--            </el-button>-->
<!--            <el-button type="text" size="small" @click.stop="viewAll(scope.row)">查看-->
<!--            </el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </template>-->
<!--    </v-dynamic-grid>-->

<!--  </div>-->




  <div class="me-layout">
    <wealth-dialog
        v-if="wealthDialogVisible"
        v-model:visible="wealthDialogVisible"
        :title="dialogTitle"
        :optionType="optionType"
        :dialogInfo="dialogInfo"
        @updateList="doQueryForView"
    ></wealth-dialog>
  </div>

  <div class="me-layout">
    <dep-curr-dialog
        v-if="depCurrDialogVisible"
        v-model:dialogVisible="depCurrDialogVisible"
        :title="dialogTitle"
        :optionType="optionType"
        :dialogInfo="dialogInfo"
        @updateList="doQueryForView"
    ></dep-curr-dialog>
  </div>

  <div class="me-layout">
    <dep-fixed-dialog
        v-if="depFixedDialogVisible"
        v-model:dialogVisible="depFixedDialogVisible"
        :dialogTitle="dialogTitle"
        :optionType="optionType"
        :dialogInfo="dialogInfo"
        @updateList="doQueryForView"
    ></dep-fixed-dialog>
  </div>


  <div class="me-layout">
    <loan-dialog
        v-if="loanDialogVisible"
        v-model:dialogVisible="loanDialogVisible"
        :dialogTitle="dialogTitle"
        :optionType="optionType"
        :dialogInfo="dialogInfo"
        @updateList="doQueryForView"
    ></loan-dialog>
  </div>

  <div class="me-layout">
    <prod-own-dialog
        v-if="prodOwnDialogVisible"
        v-model:dialogVisible="prodOwnDialogVisible"
        :dialogTitle="dialogTitle"
        :cust-id="viewForm.custId"
    ></prod-own-dialog>
  </div>
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
import {depCurrColumns, depFixedColumns, loanColumns, wealthColumns, RowType} from './cust-hook';
import baseOrgAuth from '@/components/business/org/authOrg/base-org-auth.vue';
import { useGetters } from '@/utils/hooks/store-hooks';
import { getNameByCode } from '@/utils/plugin/global';
import icon from '@/assets/image/icon.png';
import type { TabsPaneContext } from 'element-plus';

import WealthDialog from '../wealth/wealth-dialog.vue';
import DepCurrDialog from "@/views/pcm/dep-curr/dep-curr-dialog.vue";
import DepFixedDialog from "@/views/pcm/dep-fixed/dep-fixed-dialog.vue";
import LoanDialog from "@/views/pcm/loan/dep-loan-dialog.vue";

import ProdOwnDialog from "@/views/pcm/prod-own/prod-own-dialog.vue";

export default defineComponent({
  components: {WealthDialog, DepCurrDialog, DepFixedDialog,LoanDialog, ProdOwnDialog} ,

  props: {
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
    viewCustId:{
      type: String,
      default: '',
    }
  },
  emits: ['update:visible', 'updateList'],
  setup(props, { emit }) {
    const appGetters = useGetters('app', ['getCodeList']);
    const custviewForm = ref(null);
    const dynamicGirdRef = ref(null);
    const { opType, custInfo } = { ...props };
    const propsMap = reactive({
      businessType: opType,
      dialogData: custInfo,

    });
    const dataMap = reactive({
      viewForm: {
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


      pageNo: 1,
      pageSize: 1,
      total: 0,

      selectRows:[],


      showType: 1,//六种类型的其中一个


      canAddBlacklist: false,


      tableData: [],
      tableColumns: depCurrColumns,


      tablePageNo: 1,
      tablePageSize: 1,
      tableTotal: 0,




      wealthDialogVisible: false,
      depCurrDialogVisible: false,
      depFixedDialogVisible: false,
      loanDialogVisible: false,
      prodOwnDialogVisible: false,

      dialogTitle: '',
      optionType: '',
      dialogInfo: {},









      holdTypeFlag: '0',
      holdType: '0', // 0 当前持有  1历史持有







      icon: icon,

    });
    const methodsMap = reactive({
      handleSelectionChange(val: any) {
        dataMap.selectRows = val;
      },
      //查看饼图
      viewProOwn: () => {
        dataMap.dialogTitle = '查看饼图';
        //dataMap.optionType = 'view';
        dataMap.prodOwnDialogVisible = true;
      },




      //查看全部
      viewAll: (row: RowType) =>{
        if(dataMap.showType == 1){
          methodsMap.viewDepCurr(row)
        }
        if(dataMap.showType == 2){
          methodsMap.viewDepFixed(row)
        }
        if(dataMap.showType == 3){
          methodsMap.viewLoan(row)
        }
        if(dataMap.showType == 4){
          methodsMap.viewWealth(row)
        }

      },

      //查看理财
      viewWealth: (row: RowType) => {

        dataMap.dialogTitle = '查看理财';
        dataMap.optionType = 'view';
        dataMap.dialogInfo = {...row};
        dataMap.wealthDialogVisible = true;

      },


      //查看活期
      viewDepCurr: (row: RowType) => {

        dataMap.dialogTitle = '查看活期';
        dataMap.optionType = 'view';
        dataMap.dialogInfo = {...row};
        dataMap.depCurrDialogVisible = true;

      },
      //查看贷款
      viewLoan: (row: RowType) => {

        dataMap.dialogTitle = '查看贷款';
        dataMap.optionType = 'view';
        dataMap.dialogInfo = {...row};
        dataMap.loanDialogVisible = true;

      },


      //编辑全部
      editAll: (row: RowType) =>{
        if(dataMap.showType == 1){
          methodsMap.editDepCurr(row)
        }
        if(dataMap.showType == 2){
          methodsMap.editDepFixed(row)
        }
        if(dataMap.showType == 3){
          methodsMap.editLoan(row)
        }
        if(dataMap.showType == 4){
          methodsMap.editWealth(row)
        }
      },


      //编辑贷款
      editLoan: (row: RowType) => {
        dataMap.dialogTitle = '修改贷款';
        dataMap.optionType = 'update';
        dataMap.dialogInfo = { ...row };
        dataMap.loanDialogVisible = true;
      },

      //编辑理财信息
      editWealth: (row: RowType) => {
        dataMap.dialogTitle = '修改理财';
        dataMap.optionType = 'update';
        dataMap.dialogInfo = { ...row };
        dataMap.wealthDialogVisible = true;
      },


      //修改活期
      editDepCurr: (row: RowType) => {
        dataMap.dialogTitle = '修改期';
        dataMap.optionType = 'update';
        dataMap.dialogInfo = { ...row };
        dataMap.depCurrDialogVisible = true;
      },
      //增加活期
      addDepCurr:() => {
        dataMap.dialogTitle = '新增活期';
        dataMap.optionType = 'add';
       // dataMap.dialogInfo = { ...dataMap.queryParams, passward: '123456' };
        dataMap.depCurrDialogVisible = true;
      },
      //删除活期
      deleteDepCurr:() => {
        dataMap.dialogTitle = '新增活期';
        dataMap.optionType = 'add';
        // dataMap.dialogInfo = { ...dataMap.queryParams, passward: '123456' };
        dataMap.depCurrDialogVisible = true;
      },




      //查看定期
      viewDepFixed: (row: RowType) => {

        dataMap.dialogTitle = '查看定期';
        dataMap.optionType = 'view';
        dataMap.dialogInfo = {...row};
        dataMap.depFixedDialogVisible = true;

      },
      //修改定期
      editDepFixed: (row: RowType) => {
        dataMap.dialogTitle = '修改定期';
        dataMap.optionType = 'update';
        dataMap.dialogInfo = { ...row };
        dataMap.depFixedDialogVisible = true;
      },













      onUpdata() {
        emit('updateList');
      },

      // //保存
      // onConfirm() {
      //   (custviewForm.value as any).validate(async (valid: any) => {
      //     if (valid) {
      //       let params = { ...dataMap.viewForm };
      //       let queryParams = {} as RowType;
      //       Object.keys(params).forEach((item) => {
      //         queryParams[item] = params[item];
      //       });
      //       propsMap.businessType === 'add'
      //           ? await pcmApi.addCust(queryParams)
      //           : await pcmApi.updCust(queryParams);
      //       let msg =
      //           propsMap.businessType === 'add' ? '新增成功！' : '修改成功！';
      //       ElMessage({
      //         type: 'success',
      //         message: msg,
      //       });
      //       methodsMap.onClose();
      //       methodsMap.onUpdata();
      //     } else {
      //       return false;
      //     }
      //     return valid ? true : false;
      //   });
      // },

      //加入移除黑名单
      doBlacklist(){
        if(dataMap.canAddBlacklist){
          propsMap.dialogData['isBlacklist'] = '1'
        }
        else {
          propsMap.dialogData['isBlacklist'] = '0'
        }
        pcmApi.updCust(propsMap.dialogData);
        dataMap.canAddBlacklist = ! dataMap.canAddBlacklist;
        //methodsMap.doQuery(propsMap.dialogData['custId']);
      },

      imgClick(flag = 1){
        if(dataMap.showType !== flag){
          dataMap.showType = flag;
          if(dataMap.showType == 1){
            dataMap.tableColumns = depCurrColumns;
          }
          if(dataMap.showType == 2){
            dataMap.tableColumns = depFixedColumns
          }
          if(dataMap.showType == 3){
            dataMap.tableColumns = loanColumns
          }
          if(dataMap.showType == 4){
            dataMap.tableColumns = wealthColumns
          }
          dataMap.holdType = '0';
          dataMap.holdTypeFlag = '0';

          methodsMap.doQueryForView(true);

        }
      },

      doQueryForView: async (doInit = false) => {
        dataMap.tablePageNo = doInit ? 1 : dataMap.tablePageNo;
        dataMap.tablePageSize = doInit ? 10 : dataMap.tablePageSize;
        if(dataMap.showType == 1){
          //活期
          let params = {
            pageNo: dataMap.tablePageNo,
            pageSize: dataMap.tablePageSize,
            custId: dataMap.viewForm.custId,
          };
          const { data: res } = await pcmApi.getDepCurrList(params);
          dataMap.tableData = res.rows;
          dataMap.tableTotal = res.total;
        }
        if(dataMap.showType == 2){
          //定期
          let params = {
            pageNo: dataMap.tablePageNo,
            pageSize: dataMap.tablePageSize,
            custId: dataMap.viewForm.custId,
            isHis: dataMap.holdType,
          };
          const { data: res } = await pcmApi.getDepFixedList(params);
          dataMap.tableData = res.rows;
          dataMap.tableTotal = res.total;
        }
        if(dataMap.showType == 3){
          //贷款
          let params = {
            pageNo: dataMap.tablePageNo,
            pageSize: dataMap.tablePageSize,
            custId: dataMap.viewForm.custId,
            isHis: dataMap.holdType,
          };
          const { data: res } = await pcmApi.getLoanList(params);
          dataMap.tableData = res.rows;
          dataMap.tableTotal = res.total;
        }
        if(dataMap.showType == 4){
          //理财
          let params = {
            pageNo: dataMap.tablePageNo,
            pageSize: dataMap.tablePageSize,
            custId: dataMap.viewForm.custId,
            isHis: dataMap.holdType,
          };
          const { data: res } = await pcmApi.getWealthList(params);
          dataMap.tableData = res.rows;
          dataMap.tableTotal = res.total;
        }

      },


      //查询列表数据
      doQuery: async (custId = "") => {
        dataMap.pageNo = 1;
        dataMap.pageSize = 1;
        dataMap.viewForm.custId = custId;
        let params = {
          pageNo: dataMap.pageNo,
          pageSize: dataMap.pageSize,
          ...dataMap.viewForm,
        };
        const { data: res } = await pcmApi.getCustList(params);
        propsMap.dialogData = {...res.rows[0]};
        methodsMap.initFrom();
      },
      //初始化数据
      initFrom: () => {
        nextTick(() => {
          Object.keys(dataMap.viewForm).forEach((item) => {
            if (item == 'sex'){
              dataMap.viewForm[item] = getNameByCode('sex',propsMap.dialogData[item]);
            }
            else if(item == 'certType'){
              dataMap.viewForm[item] = getNameByCode('certType',propsMap.dialogData[item]);
            }
            else if(item == 'marStat'){
              dataMap.viewForm[item] = getNameByCode('marStat',propsMap.dialogData[item]);
            }
            else if(item == 'profession'){
              dataMap.viewForm[item] = getNameByCode('profession',propsMap.dialogData[item]);
            }
            else if(item == 'highestEdu'){
              dataMap.viewForm[item] = getNameByCode('highestEdu',propsMap.dialogData[item]);
            }
            else if(item == 'nation'){
              dataMap.viewForm[item] = getNameByCode('nation',propsMap.dialogData[item]);
            }
            else if(item == 'isMerchant'){
              dataMap.viewForm[item] = getNameByCode('isMerchant',propsMap.dialogData[item]);
            }
            else {
              propsMap.dialogData[item]
                  ? (dataMap.viewForm[item] = propsMap.dialogData[item])
                  : '';
            }
            if(item == 'isBlacklist'){
              if(propsMap.dialogData[item] == "1"){
                dataMap.canAddBlacklist = false;
              }
              else{
                dataMap.canAddBlacklist = true;
              }
            }


          });
        });
      },
    });



    const tabHandleClick = (tab: TabsPaneContext, event: Event) => {
      if(dataMap.showType != 1){
        if(dataMap.holdTypeFlag != dataMap.holdType){
          dataMap.holdType = dataMap.holdTypeFlag;
          methodsMap.doQueryForView(true);
        }
      }
    }

    onMounted(() => {
      if(props.viewCustId !=''){
        localStorage.setItem("nowCustId",props.viewCustId);
      }
      const nowCustId: string = localStorage.getItem('nowCustId')!;
      if(nowCustId){
        methodsMap.doQuery(nowCustId);
        methodsMap.doQueryForView(true);
      }

    });
    return {
      tabHandleClick,
      custviewForm,
      ...toRefs(propsMap),
      ...toRefs(dataMap),
      ...toRefs(methodsMap),
      ...appGetters,
      dynamicGirdRef
    };
  },
});



const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>
<style lang="scss" scoped>
.common-layout {
  height: 100%;
  width: 100%;
  .common-layout-top {
    height: 30%;
  }
  .common-layout-main {
    height: 70%;
  }
}
.el-row_1 {
  margin-top: 10px;
  margin-bottom: 15px;
}
.el-row_2 {
  margin-left:30px;
  margin-right:30px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap
}
.el-header{
  height: 30px;
  font-size: 22px;
  margin-bottom:10px;
}
.image_inner{
  width: 70%;
  height: 80%;
}


.MySpan {
  display: inline-block;
  white-space: nowrap;
}

.scrollable-tabs {
  overflow-x: auto;
  white-space: nowrap;
}

.grid-container {
  width: 100%; /* 设置容器的宽度 */
}

.table-container {
  margin-bottom: 10px; /* 设置表格容器与分页容器之间的间距 */
}

.pagination-container {
  display: flex;
  justify-content: flex-end; /* 将分页组件右对齐 */
}

.blue-text {
  color: blue;
}
</style>
