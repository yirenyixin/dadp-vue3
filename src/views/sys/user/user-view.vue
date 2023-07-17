<template>

  <div class="me-layout">
    <el-container style="width: 100%;height: 100%">
      <el-main>
        <div class="me-layout">
          <div class="base-dialog-form">
            <el-scrollbar height="65vh">
              <el-form
                  label-width="100px"
              >
                <el-row :gutter="6">
                  <el-col :span="8">
                    <el-form-item label="用户ID:" prop="userId">
                      <el-input
                          v-model="viewForm.userId"

                          clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="用户姓名:" prop="userName">
                      <el-input
                          v-model="viewForm.userName"

                          clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="当前角色:" prop="roleId">
                      <el-select
                          style="width: 100%"
                          v-model="viewForm.roleId"
                          :disabled="opType === 'view'"
                          clearable
                      >
                        <el-option
                            v-for="item in getCodeList['roleId']"
                            :key="item.value"
                            :label="item.content"
                            :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="6">
                  <el-col :span="8">
                    <el-form-item label="登录名:" prop="loginName">
                      <el-input
                          v-model="viewForm.loginName"
                          :readonly="opType === 'view'"
                          clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="密码:" prop="password">
                      <el-input
                          v-model="viewForm.password"
                          :readonly="opType === 'view'"
                          clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="手机号:" prop="tel">
                      <el-input
                          v-model="viewForm.tel"
                          :readonly="opType === 'view'"
                          clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="6">
                  <el-col :span="8">
                    <el-form-item label="身份证号码:" prop="idCardNo">
                      <el-input
                          type="text"
                          v-model="viewForm.idCardNo"
                          :readonly="opType === 'view'"
                          clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别:" prop="sex">
                      <el-select
                          style="width: 100%"
                          v-model="viewForm.sex"
                          :readonly="opType === 'view'"
                          clearable
                      >
                        <el-option
                            v-for="item in getCodeList['userSex']"
                            :key="item.value"
                            :label="item.content"
                            :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="排序号:" prop="sortNo">
                      <el-input-number
                          style="width: 100%"
                          v-model="viewForm.sortNo"
                          :min="0"
                          :max="2147483647"
                          :disabled="opType === 'view'"
                          clearable
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="6">
                  <el-col :span="8">
                    <el-form-item label="用户状态:" prop="status">
                      <el-select
                          style="width: 100%"
                          v-model="viewForm.status"
                          :disabled="opType === 'view'"
                          clearable
                      >
                        <el-option
                            v-for="item in getCodeList['userStatus']"
                            :key="item.value"
                            :label="item.content"
                            :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所属机构:" prop="orgName">
                      <el-input type="text" v-model="viewForm.orgName" readonly>
                        <template #append>
                          <el-button
                              @click="orgSelectVisible = true"
                              :disabled="opType === 'view'"
                          ><el-icon><search /></el-icon
                          ></el-button>
                        </template>
                      </el-input>
                      <base-org-auth
                          v-if="orgSelectVisible"
                          v-model:orgSelectVisible="orgSelectVisible"
                          @getOrgSelectData="getOrgSelectData"
                      >
                      </base-org-auth>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="全部角色:" prop="roleIds">
                      <el-select
                          style="width: 100%"
                          v-model="viewForm.roleIds"
                          multiple
                          :disabled="opType === 'view'"
                      >
                        <el-option
                            v-for="item in getCodeList['roleId']"
                            :key="item.value"
                            :label="item.content"
                            :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="6">
                  <el-col :span="24">
                    <el-form-item label="备注:" prop="remark">
                      <el-input
                          :rows="4"
                          type="textarea"
                          v-model="viewForm.remark"
                          :readonly="opType === 'view'"
                          clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-scrollbar>
          </div>
        </div>
      </el-main>
    </el-container>

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
import * as sysApi from '@/apis/sys';
import { RowType, userCommonRules } from './user-hook';
import baseOrgAuth from '@/components/business/org/authOrg/base-org-auth.vue';
import { useGetters } from '@/utils/hooks/store-hooks';
import { getNameByCode } from '@/utils/plugin/global';

export default defineComponent({
  name: 'UserDialog',
  components: {
    baseOrgAuth,
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
    userInfo: {
      type: Object,
      default: () => ({}),
    },
    viewUserId:{
      type: String,
      default: '',
    }

  },
  emits: ['update:visible', 'updateList'],
  setup(props, { emit }) {
    const appGetters = useGetters('app', ['getCodeList']);
    //const userviewForm = ref(null);
    const { opType, userInfo } = { ...props };
    const propsMap = reactive({
      businessType: opType,
      dialogData: userInfo,
      dialogVisible: computed({
        get: () => props.visible,
        set: (val: boolean) => {
          emit('update:visible', val);
        },
      }),
    });
    const dataMap = reactive({
      viewForm: {
        userId: '',
        userName: '',
        loginName: '',
        tel: '',
        password: '',
        sex: '',
        orgId: '',
        orgName: '',
        roleId: '',
        roleIds: [],
        status: '',
        sortNo: 0,
        ver: 0,
        remark: '',
      },
      viewFormRules: userCommonRules,
      orgSelectVisible: false,

      queryParams: {
        userId: '',
        userName: '',
        loginName: '',
        tel: '',
        password: '',
        sex: '',
        orgId: '',
        roleId: '',
        roleIds: '',
        status: '',
        sortNo: 0,
        remark: '',
        ver: 0,
        roleName: '',
        orgName: '',
      },
      pageNo: 1,
      pageSize: 1,
    });
    const methodsMap = reactive({
      getOrgSelectData: async (val: any) => {
        dataMap.viewForm.orgId = val.id;
        dataMap.viewForm.orgName = val.name;
      },
      //初始化数据
      initFrom: () => {
        nextTick(() => {
          Object.keys(dataMap.viewForm).forEach((item) => {
            if (item != 'roleIds') {
              propsMap.dialogData[item]
                  ? (dataMap.viewForm[item] = propsMap.dialogData[item])
                  : '';
            }
          });
          dataMap.viewForm.orgName = getNameByCode(
              'orgId',
              dataMap.viewForm.orgId
          );
          //把roleIds转为数组
          let roleIds = propsMap.dialogData.roleIds
              ? propsMap.dialogData.roleIds.split(',')
              : [];

          dataMap.viewForm.roleIds = roleIds;
        });
      },

      //查询列表数据
      doQuery: async (userId = "admin") => {
        dataMap.pageNo = 1;
        dataMap.pageSize = 1;
        dataMap.queryParams.userId = userId
        let params = {
          pageNo: dataMap.pageNo,
          pageSize: dataMap.pageSize,
          ...dataMap.queryParams,

        };
        const {data: res} = await sysApi.getUserList(params);
        propsMap.dialogData = {...res.rows[0]};
        methodsMap.initFrom();
      },

    });
    onMounted(() => {
      methodsMap.doQuery(props.viewUserId)
    });
    return {

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
