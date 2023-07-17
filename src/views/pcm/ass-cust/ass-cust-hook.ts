import {columns} from "@/model/comm-model";
import {getNameByCode} from "@/utils/plugin/global";

export type RowType = {
  userId: string;
  userName: string;
  loginName: string;
  tel: string;
  password: string;
  sex: string;
  orgId: string;
  roleId: string;
  roleIds: string;
  status: string;
  sortNo: number;
  remark: string;
  roleName: string;
  orgName: string;
  ver: number;
  [key: string]: any;
};



export const userTableColumns: Array<columns> = [
  {
    prop: 'userId',
    label: '用户ID',
    overflow: true,
  },
  {
    prop: 'userName',
    label: '用户姓名',
    overflow: true,
  },
  {
    prop: 'loginName',
    label: '登录名',
    overflow: true,
  },
  {
    prop: 'tel',
    label: '手机号',
    overflow: true,
  },
  {
    prop: 'idCardNo',
    label: '身份证号码',
    width: 120,
    overflow: true,
  },
  {
    prop: 'status',
    label: '用户状态',
    formatter: (row: any) => getNameByCode('userStatus', row.status),
    overflow: true,
  },
  {
    prop: 'sortNo',
    label: '排序号',
    overflow: true,
  },
  {
    prop: 'sex',
    label: '性别',
    formatter: (row: any) => getNameByCode('userSex', row.sex),
    overflow: true,
  },
  {
    prop: 'orgId',
    label: '所属机构',
    formatter: (row: any) => getNameByCode('orgId', row.orgId),
    overflow: true,
  },
  {
    prop: 'roleId',
    label: '当前角色',
    formatter: (row: any) => getNameByCode('roleId', row.roleId),
    overflow: true,
  },
  {
    prop: 'roleIds',
    label: '拥有的全部角色',
    width: 160,
    overflow: true,
    formatter: (row: any) => {
      const _roleNames = Array<string>();
      _roleNames.push(getNameByCode('roleId', row.roleIds, true));
      return _roleNames.join();
    },
  },
  {
    prop: 'remark',
    label: '备注',
    overflow: true,
  },
];


export const custTableColumns: Array<columns> = [
  {
    prop: 'userRelId',
    label: 'ID',
    overflow: true,
  },
  {
    prop: 'custId',
    label: '对私客户ID',
    overflow: true,
  },
  {
    prop: 'lawOrgId',
    label: '法人机构号',
    overflow: true,
  },
  {
    prop: 'ecifCustId',
    label: 'ECIF客户ID',
    overflow: true,
  },
  {
    prop: 'custName',
    label: '客户名称',
    overflow: true,
  },
  {
    prop: 'belongMgrId',
    label: '归属客户经理编号',
    overflow: true,
  },
  {
    prop: 'belongMgrName',
    label: '归属客户经理名称',
    overflow: true,
  },
  {
    prop: 'mainMgrType',
    label: '客户经理主协办类型',
    formatter: (row: any) => getNameByCode('mainMgrType', row.mainMgrType),
    overflow: true,
  },
  {
    prop: 'assignType',
    label: '分配类型',
    formatter: (row: any) => getNameByCode('assignType', row.assignType),
    overflow: true,
  },
  {
    prop: 'beginDate',
    label: '托管开始时间',
    overflow: true,
  },
  {
    prop: 'endDate',
    label: '托管结束时间',
    overflow: true,
  },
  {
    prop: 'assignUserId',
    label: '分配人编号',
    overflow: true,
  },
  {
    prop: '分配时间',
    label: '分配人编号',
    overflow: true,
  },
];
