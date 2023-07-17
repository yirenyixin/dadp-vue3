import { columns } from '@/model/comm-model';
import { getNameByCode } from '@/utils/plugin/global';
import { validateIdNumber, validatePhone } from '@/utils/tools/validator';
export type RowType = {
  custId: string;
  ecifCustId: string;
  custName: string;
  lawOrgId: string;
  lawOrgName: string;
  custState: string;
  certType: string;
  certNo: string;
  certAddr: string;
  mobile: string;
  tel: string;
  address: string;
  sex: string;
  marStat: string;
  birthday: string;
  nation: string;
  country: string;
  livingType: string;
  isOwnCar: string;
  isOwnHouse: string;
  homeIntTotal: string;
  highestEdu: string;
  hobby: string;
  trade: string;
  profession: string;
  position: string;
  unitNm: string;
  isBlacklist: string;
  blacklistSource: string;
  remark: string;
  remarkUser: string;
  age: number;
  ageArea: string;
  areaNo: string;
  isMerchant: string;
  isStock: string;
  unitAddr: string;
  unitTel: string;
  isEmployee: string;
}

export const custTableColumns: Array<columns> = [
  {
    prop: 'userRelId',
    label: 'userRelId',
    overflow: true,
  },
  {
    prop: 'custId',
    label: 'ID',
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
    prop: 'assignDate',
    label: '分配时间',
    overflow: true,
  },
];
// export const custTableColumns: Array<columns> = [
//   {
//     prop: 'custId',
//     label: 'ID',
//     overflow: true,
//   },
//   {
//     prop: 'custName',
//     label: '客户名称',
//     overflow: true,
//   },
//   {
//     prop: 'custState',
//     label: '客户状态',
//     formatter: (row: any) => getNameByCode('custState', row.custState),
//     overflow: true,
//   },
//   {
//     prop: 'certType',
//     label: '证件类型',
//     formatter: (row: any) => getNameByCode('certType', row.certType),
//     overflow: true,
//   },
//   {
//     prop: 'certNo',
//     label: '证件号码',
//     overflow: true,
//   },
//   {
//     prop: 'tel',
//     label: '手机号',
//     overflow: true,
//   },
//   {
//     prop: 'mobile',
//     label: '联系电话',
//     overflow: true,
//   },
//   {
//     prop: 'address',
//     label: '联系地址',
//     overflow: true,
//   },
//   {
//     prop: 'unitAddr',
//     label: '单位地址',
//     overflow: true,
//   },
//   {
//     prop: 'unitTel',
//     label: '单位电话',
//     overflow: true,
//   },
//   {
//     prop: 'isEmployee',
//     label: '是否本行员工',
//     formatter: (row: any) => getNameByCode('yesOrNo', row.isEmployee),
//     overflow: true,
//   },
// ];

//活期表
export const depCurrColumns: Array<columns> = [
  {
    prop: 'depCurrId',
    label: '代码类别ID',
    overflow: true,
  },
  {
    prop: 'custId',
    label: '客户ID',
    overflow: true,
  },
  {
    prop: 'lawOrgId',
    label: '法人机构号',
    overflow: true,
  },
  {
    prop: 'prodCode',
    label: '产品代码',
    overflow: true,
  },
  {
    prop: 'prodName',
    label: '产品名称',
    overflow: true,
  },
  {
    prop: 'acctNo',
    label: '账号/卡号',
    overflow: true,
  },
  {
    prop: 'currNo',
    label: '币种',
    overflow: true,
  },
  {
    prop: 'bal',
    label: '上日余额',
    overflow: true,
  },
  {
    prop: 'acctSts',
    label: '账户状态',
    overflow: true,
  },
  {
    prop: 'openOrgNo',
    label: '子账户开户行',
    overflow: true,
  },
  {
    prop: 'startDt',
    label: '开户日期',
    overflow: true,
  },
  {
    prop: 'voucherNo',
    label: '凭证号',
    overflow: true,
  },
  {
    prop: 'subAcctNo',
    label: '活期子账户',
    overflow: true,
  },
  {
    prop: 'currentBal',
    label: '当前余额',
    overflow: true,
  },
];

//定期表
export const depFixedColumns: Array<columns> = [
  {
    prop: 'prodCode',
    label: '产品代码',
    overflow: true,
  },
  {
    prop: 'prodName',
    label: '产品名称',
    overflow: true,
  },
  {
    prop: 'subAcctNo',
    label: '子账号',
    overflow: true,
  },
  {
    prop: 'acctType',
    label: '存款类型',
    overflow: true,
  },
  {
    prop: 'rate',
    label: '协议利率',
    overflow: true,
  },
  {
    prop: 'bal',
    label: '上日余额',
    overflow: true,
  },
  {
    prop: 'term',
    label: '存期',
    overflow: true,
  },
  {
    prop: 'endDate',
    label: '到期日期',
    overflow: true,
  },
  {
    prop: 'acctSts',
    label: '账户状态',
    overflow: true,
  },
  {
    prop: 'openOrgNo',
    label: '开户机构号',
    overflow: true,
  },
  {
    prop: 'startDt',
    label: '起存日期',
    overflow: true,
  },
  {
    prop: 'voucherNo',
    label: '凭证号',
    overflow: true,
  },

];

//贷款
export const loanColumns: Array<columns> = [
  {
    prop: 'prodCode',
    label: '产品代码',
    overflow: true,
  },
  {
    prop: 'prodName',
    label: '产品名称',
    overflow: true,
  },
  {
    prop: 'loanAcct',
    label: '贷款账号',
    overflow: true,
  },
  {
    prop: 'loanAcctName',
    label: '账号名称',
    overflow: true,
  },
  {
    prop: 'loanContNo',
    label: '合同编号',
    overflow: true,
  },
  {
    prop: 'voucherNo',
    label: '借据号',
    overflow: true,
  },
  {
    prop: 'loanBal',
    label: '当前余额',
    overflow: true,
  },
  {
    prop: 'loanType',
    label: '贷款类型',
    overflow: true,
  },
  {
    prop: 'loanSts',
    label: '贷款状态',
    overflow: true,
  },
  {
    prop: 'startDate',
    label: '贷款发放日期',
    overflow: true,
  },
  {
    prop: 'endDate',
    label: '贷款到期日期',
    overflow: true,
  },
  {
    prop: 'rate',
    label: '贷款利率',
    overflow: true,
  },
];

//理财表
export const wealthColumns: Array<columns> =[
  {
    prop: 'openOrgId',
    label: '开户机构号',
    overflow: true,
  },
  {
    prop: 'prodCode',
    label: '产品代码',
    overflow: true,
  },
  {
    prop: 'prodName',
    label: '产品名称',
    overflow: true,
  },
  {
    prop: 'prodType',
    label: '产品类型',
    overflow: true,
  },
  {
    prop: 'riskLevel',
    label: '风险等级',
    overflow: true,
  },
  {
    prop: 'publicOrg',
    label: '发行方',
    overflow: true,
  },
  {
    prop: 'perfCompareBase',
    label: '业绩比较基准',
    overflow: true,
  },
  {
    prop: 'currentBal',
    label: '当前余额',
    overflow: true,
  },
  {
    prop: 'interestDate',
    label: '起息日期',
    overflow: true,
  },
  {
    prop: 'endDate',
    label: '产品到期日',
    overflow: true,
  },
  {
    prop: 'holdProfit',
    label: '持有收益',
    overflow: true,
  },{
    prop: 'holdProfitRate',
    label: '持有收益率',
    overflow: true,
  },

];





export const custCommonRules = {
  custId: [
    { required: true, message: '请输入客户ID', trigger: 'blur' },
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  ecifCustId: [
    { required: true, message: '请输入ECIF客户ID', trigger: 'blur' },
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  custName: [
    { required: true, message: '请输入客户名称', trigger: 'blur' },
    { max: 128, message: '长度在128个字符以内', trigger: 'blur' },
  ],
  lawOrgId: [
    { required: true, message: '请输入法人机构号', trigger: 'blur' },
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  lawOrgName: [
    { max: 128, message: '长度在128个字符以内', trigger: 'blur' },
  ],
  custState: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  certType: [
    { required: true, message: '请输入证件类型', trigger: 'blur' },
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  certNo: [
    { required: true, message: '请输入证件号码', trigger: 'blur' },
    { max: 20, message: '长度在20个字符以内', trigger: 'blur' },
  ],
  certAddr: [
    { required: true, message: '请输入证件号码归属地', trigger: 'blur' },
    { max: 150, message: '长度在150个字符以内', trigger: 'blur' },
  ],
  mobile: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  tel: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  address: [
    { max: 512, message: '长度在512个字符以内', trigger: 'blur' },
  ],
  sex: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  marStat: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  birthday: [
    { max: 8, message: '长度在8个字符以内', trigger: 'blur' },
  ],
  nation: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  country: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  livingType: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  isOwnCar: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  isOwnHouse: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  homeIntTotal: [
    { max: 20, message: '长度在20个字符以内', trigger: 'blur' },
  ],
  highestEdu: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  hobby: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  trade: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  profession: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  position: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  unitNm: [
    { max: 128, message: '长度在128个字符以内', trigger: 'blur' },
  ],
  isBlacklist: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  blacklistSource: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  remark: [
    { max: 200, message: '长度在200个字符以内', trigger: 'blur' },
  ],
  remarkUser: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  age: [
    //{ max: 8, message: '长度在8个字符以内', trigger: 'blur' },
  ],
  ageArea: [
    { max: 8, message: '长度在8个字符以内', trigger: 'blur' },
  ],
  areaNo: [
    { max: 16, message: '长度在16个字符以内', trigger: 'blur' },
  ],
  isMerchant: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  isStock: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  unitAddr: [
    { max: 512, message: '长度在512个字符以内', trigger: 'blur' },
  ],
  unitTel: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  isEmployee: [
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
};










