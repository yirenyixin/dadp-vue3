import { columns } from '@/model/comm-model';
import { getNameByCode } from '@/utils/plugin/global';

export type RowType = {
  depFixedId?: string;
  custId?: string;
  ecifCustId?: string;
  custName?: string;
  lawOrgId?: string;
  prodCode?: string;
  prodName?: string;
  acctNo?: string;
  subAcctNo?: string;
  acctType?: string;
  floatRate?: number;
  rate?: number;
  currNo?: string;
  bal?: number;
  term?: string;
  endDate?: string;
  acctSts?: string;
  openOrgNo?: string;
  startDt?: string;
  voucherNo?: string;
  [key: string]: any;
};

export const codeTypeColumns: Array<columns> = [
  {
    prop: 'depFixedId',
    label: 'ID',
    overflow: true,
  },
  {
    prop: 'custId',
    label: '客户ID',
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
    label: '账号',
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
    prop: 'floatRate',
    label: '浮动比率',
    overflow: true,
  },
  {
    prop: 'rate',
    label: '协议利率',
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

export const codeInfoFromRules = {
  depFixedId: [
    {
      required: true,
      message: 'ID为必填项！',
      trigger: ['change', 'blur'],
    },
  ],
  custId: [
    {
      required: false,
      message: '客户ID为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  ecifCustId: [
    {
      required: false,
      message: 'ECIF客户ID为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  custName: [
    {
      required: false,
      message: '客户名称为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  lawOrgId: [
    {
      required: false,
      message: '法人机构号为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  prodCode: [
    {
      required: false,
      message: '产品代码为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  prodName: [
    {
      required: false,
      message: '产品名称为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  acctNo: [
    {
      required: false,
      message: '账号为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  subAcctNo: [
    {
      required: false,
      message: '子账号为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  acctType: [
    {
      required: true,
      message: '存款类型为必选项！',
      trigger: ['change', 'blur'],
    },
  ],
  floatRate: [
    {
      required: false,
      message: '浮动比率为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  rate: [
    {
      required: false,
      message: '协议利率为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  currNo: [
    {
      required: false,
      message: '币种为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  bal: [
    {
      required: false,
      message: '上日余额为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  term: [
    {
      required: false,
      message: '存期为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  endDate: [
    {
      required: false,
      message: '到期日期为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  acctSts: [
    {
      required: true,
      message: '账户状态为必选项！',
      trigger: ['change', 'blur'],
    },
  ],
  openOrgNo: [
    {
      required: false,
      message: '开户机构号为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  startDt: [
    {
      required: false,
      message: '起存日期为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  voucherNo: [
    {
      required: false,
      message: '凭证号为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
};