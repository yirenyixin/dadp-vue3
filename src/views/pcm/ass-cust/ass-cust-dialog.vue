<template>
  <el-dialog
      :title="title"
      v-model="dialogVisible"
      width="80vw"
      destroy-on-close
      @closed="onClose"
  >
    <div class="common-layout">
      <div class="common-layout-top">
        <el-row :gutter="16" justify="space-evenly">
          <el-col :span="7"><el-card style="height: 200px;align: middle;">
            <el-row justify="center" class="el-row_1">
              <el-avatar :size="70" :src="icon" /></el-row>
            <el-row justify="center" class="el-row_1">
              <span >请选择需要更换的客户经理</span>
            </el-row>
            <el-row justify="center" class="el-row_1">
              <el-select
                  style="width: 100%"
                  v-model="managerRealId"
                  :disabled="opType === 'view'"
                  clearable
              >
                <el-option
                    v-for="item in selectUserInfo"
                    :key="item.value"
                    :label="item.content"
                    :value="item.value"
                    @click="handleSelectClick"
                ></el-option>
              </el-select>
            </el-row>
          </el-card></el-col>
          <el-col :span="15"><el-card style="height: 200px">
            <el-row :gutter="12">
              <el-col :span="8">
                <el-form-item label="USER_REL_ID：" prop="custId">
                  <span class="MySpan">{{userRelForm.userRelId}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属客户经理编号：" prop="laoOrgId">
                  <span class="MySpan">{{userRelForm.belongMgrId}}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="归属客户经理名称：" prop="belongOrgId">
                  <span class="MySpan">{{userRelForm.belongMgrName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="8">
                <el-form-item label="ORG_REL_ID：" prop="belongOrgName">
                  <span class="MySpan">{{orgRelForm.orgRelId}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属机构编号：" prop="belongOrgName">
                  <span class="MySpan">{{orgRelForm.belongOrgId}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属机构名称：" prop="belongOrgName">
                  <span class="MySpan">{{orgRelForm.belongOrgName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card></el-col>
        </el-row>
      </div>
<!--      <el-button >-->
<!--        确定修改-->
<!--      </el-button>-->
    </div>
    <template #footer>
      <span class="func-dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button  :disabled="managerRealId == managerIdTmp"  type="primary" @click="onConfirm">确 定</el-button>
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
import * as pcmApi from "@/apis/pcm";
import { RowType, } from './ass-cust-hook';
import baseOrgAuth from '@/components/business/org/authOrg/base-org-auth.vue';
import { useGetters } from '@/utils/hooks/store-hooks';
import { getNameByCode } from '@/utils/plugin/global';
import icon from '@/assets/image/icon.png';
export default defineComponent({
  name: 'AssCustDialog',
  components: {

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

    managerId: {
      type: String,
      default: '',
    },
  },
  emits: ['update:visible', 'updateList'],
  setup(props, { emit }) {
    const appGetters = useGetters('app', ['getCodeList']);
    const userviewForm = ref(null);
    const { opType, custInfo } = { ...props };
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
      userRelForm:{
        userRelId:'',
        custId:'',
        lawOrgId:'',
        ecifCustId:'',
        custName:'',
        belongMgrId:'',
        belongMgrName:'',
        mainMgrType:'',
        assignType:'',
        beginDate:'',
        endDate:'',
        assignUserId:'',
        assignDate:''
      },
      orgRelForm:{
        orgRelId:'',
        custId:'',
        lawOrgId:'',
        ecifCustId:'',
        custName:'',
        belongOrgId:'',
        belongOrgName:'',
        mainOrgType:'',
        assignType:'',
        assignUserId:'',
        assignDate:''
      },
      managerRealId: '',
      managerIdTmp: '',



      icon: icon,





      selectUserInfo: [],



      delUserRelId:'',
      delOrgRelId:'',
      userRelUpdate:[],
      orgRelUpdate:[],



    });
    const methodsMap = reactive({
      resetForm() {
        (userviewForm.value as any).resetFields();
      },
      onUpdata() {
        emit('updateList');
      },
      onClose() {
        propsMap.dialogVisible = false;
      },
      //保存
      onConfirm(){
        dataMap.managerIdTmp = dataMap.managerRealId;
        pcmApi.delUserRel({userRelIds: dataMap.delUserRelId})
        pcmApi.delOrgRel({orgRelIds: dataMap.delOrgRelId})
        pcmApi.addUserRel(dataMap.userRelUpdate);
        pcmApi.addOrgRel(dataMap.orgRelUpdate);

        ElMessage({
          type: 'success',
          message: '修改成功',
        });

        methodsMap.onClose();
        methodsMap.onUpdata();
        // methodsMap.getOrgRelForm();
        // let res = pcmApi.getUserRel({
        //   pageNo:1,
        //   pageSize:10,
        //   belongMgrId: dataMap.managerRealId
        // })
        // propsMap.dialogData = {...res[0]}
        // methodsMap.initFrom();

      },
      //初始化数据，
      initFrom: () => {
        nextTick(() => {
          Object.keys(dataMap.userRelForm).forEach((item) => {
            propsMap.dialogData[item]
                ? (dataMap.userRelForm[item] = propsMap.dialogData[item])
                : '';
          });

        });
      },


      InitUserCodeInfo:async (doInit = false) => {
        let params = {
          pageNo: 1,
          pageSize: 100,
        };
        let res = await sysApi.getUserCodeInfo(params)
        dataMap.selectUserInfo = res['userCodeInfo']
      },


      getOrgRelForm:async()=>{
        let params = {
          pageNo: 1,
          pageSize: 1,
          custId: propsMap.dialogData['custId']
        };
        const { data: res }  = await pcmApi.getOrgRel(params);
        dataMap.orgRelForm = {...res.rows[0]}
        console.log(dataMap.orgRelForm )
      },

      handleSelectClick:async()=>{


        console.log("222313131")

        let params = {
          pageNo: 1,
          pageSize: 1,
          userId: dataMap.managerRealId
        };
        const { data: res }  = await sysApi.getUserList(params)
        let managerId = dataMap.managerRealId;
        let managerName = res.rows[0]['userName'] //根据managerId得到新的经理名字
        let orgId = res.rows[0]['orgId']//根据managerId得到新的orgId


        const { data: ress }  = await sysApi.getOrgById({
          orgId:orgId
        });
        let orgName = ress['orgName']//根据orgId得到新的orgName
        console.log(orgName)




        let custId = dataMap.userRelForm.custId;//custId 不变
        let mainMgrType = dataMap.userRelForm.mainMgrType;






        //change
        let userRelId = custId + managerId + mainMgrType;

        let orgRelId = custId + orgId + mainMgrType;


        let userRelParams = {
          pageNo: 1,
          pageSize: 1,
          custId: custId
        };
        const { data: oriUserRel }  = await pcmApi.getUserRel(userRelParams)
        dataMap.delUserRelId = oriUserRel.rows[0]['userRelId'];
        let updateUserRelData = oriUserRel.rows[0]
        updateUserRelData['userRelId'] = userRelId;
        updateUserRelData['belongMgrId'] = managerId;
        updateUserRelData['belongMgrName'] = managerName;
        dataMap.userRelUpdate = updateUserRelData;

        let orgRelParams = {
          pageNo: 1,
          pageSize: 1,
          custId: custId
        };
        const { data: oriOrgRel }  = await pcmApi.getOrgRel(orgRelParams)
        dataMap.delOrgRelId = oriOrgRel.rows[0]['orgRelId']
        let updateOrgRelData = oriOrgRel.rows[0]
        // console.log(Object.assign({}, updateOrgRelData))
        updateOrgRelData['orgRelId'] = orgRelId;
        updateOrgRelData['belongOrgId'] = orgId;
        updateOrgRelData['belongOrgName'] = orgName;
        // console.log(updateOrgRelData)

        dataMap.orgRelUpdate = updateOrgRelData;



        dataMap.userRelForm.userRelId = userRelId;
        dataMap.userRelForm.belongMgrId = managerId;
        dataMap.userRelForm.belongMgrName =  managerName;


        dataMap.orgRelForm.orgRelId = orgRelId;
        dataMap.orgRelForm.belongOrgId = orgId;
        dataMap.orgRelForm.belongOrgName = orgName;
      },



    });
    onMounted(() => {

      dataMap.managerIdTmp = props.managerId;
      methodsMap.InitUserCodeInfo();
      dataMap.managerRealId = props.managerId;
      methodsMap.getOrgRelForm();
      methodsMap.initFrom();
      
      
    });



    return {
      userviewForm,
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
.common-layout {
  height: 100%;
  width: 100%;
  .common-layout-top {
    height: 33%;
  }
  .common-layout-main {
    height: 67%;
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
</style>
