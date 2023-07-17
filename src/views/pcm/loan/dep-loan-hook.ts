import { columns } from '@/model/comm-model';
import { getNameByCode } from '@/utils/plugin/global';

export type RowType = {
  loanId?: string;
  custId?: string;
  ecifCustId?: string;
  custName?: string;
  lawOrgId?: string;
  prodCode?: string;
  prodName?: string;
  loanAcct?: string;
  loanAcctName?: string;
  loanContNo?: string;
  voucherNo?: string;
  loanMon?: string;
  grantMon?: string;
  loanBal?: string;
  badBal?: string;
  loanType?: string;
  loanSts?: string;
  startDate?: string;
  endDate?: string;
  rate?: string;
  loanTerm?: string;
  loanCurrency?: string;
  nextRepaymentMon?: string;
  nextRepaymentDate?: string;
  loanFiveForm?: string;
  openOrgNo?: string;
  mgrId?: string;
  repayAcct?: string;
  repayName?: string;
  loanUse?: string;
  [key: string]: any;
};

export const codeTypeColumns: Array<columns> = [
  {
    prop: 'loanId',
    label: 'ID',
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
    prop: 'loanMon',
    label: '贷款金额',
    overflow: true,
  },
  {
    prop: 'grantMon',
    label: '发放金额',
    overflow: true,
  },
  {
    prop: 'loanBal',
    label: '当前余额',
    overflow: true,
  },
  {
    prop: 'badBal',
    label: '不良余额',
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
  {
    prop: 'loanTerm',
    label: '贷款期限（月）',
    overflow: true,
  },
  {
    prop: 'loanCurrency',
    label: '贷款币种',
    overflow: true,
  },
  {
    prop: 'nextRepaymentMon',
    label: '下期还款金额（不含逾期）',
    overflow: true,
  },
  {
    prop: 'nextRepaymentDate',
    label: '下期还款日期',
    overflow: true,
  },
  {
    prop: 'loanFiveForm',
    label: '五级分类标志',
    overflow: true,
  },
  {
    prop: 'openOrgNo',
    label: '开户机构',
    overflow: true,
  },
  {
    prop: 'mgrId',
    label: '客户经理',
    overflow: true,
  },
  {
    prop: 'repayAcct',
    label: '还款账号',
    overflow: true,
  },
  {
    prop: 'repayName',
    label: '账号名称',
    overflow: true,
  },
  {
    prop: 'loanUse',
    label: '贷款用途',
    overflow: true,
  },
];

export const codeInfoFromRules = {
  loanId: [
    {
      required: true,
      message: 'ID为必填项！',
      trigger: ['change', 'blur'],
    },
  ],
  custId: [
    {
      required: true,
      message: '客户ID为必填项！',
      trigger: ['change', 'blur'],
    },
  ],
  ecifCustId: [
    {
      required: false,
      message: 'ECIF客户ID为必填项！',
      trigger: ['change', 'blur'],
    },
  ],
  custName: [
    {
      required: false,
      message: '客户名称为必填项！',
      trigger: ['change', 'blur'],
    },
  ],
  lawOrgId: [
    {
      required: false,
      message: '法人机构号为必填项！',
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
  loanAcct: [
    {
      required: false,
      message: '贷款账号为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  loanAcctName: [
    {
      required: false,
      message: '账号名称为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  loanContNo: [
    {
      required: false,
      message: '合同编号为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  voucherNo: [
    {
      required: false,
      message: '借据号为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  loanMon: [
    {
      required: false,
      message: '贷款金额为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  grantMon: [
    {
      required: false,
      message: '发放金额为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  loanBal: [
    {
      required: false,
      message: '当前余额为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  badBal: [
    {
      required: false,
      message: '不良余额为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  loanType: [
    {
      required: false,
      message: '贷款类型为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  loanSts: [
    {
      required: false,
      message: '贷款状态为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  startDate: [
    {
      required: false,
      message: '贷款发放日期为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  endDate: [
    {
      required: false,
      message: '贷款到期日期为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  rate: [
    {
      required: false,
      message: '贷款利率为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  loanTerm: [
    {
      required: false,
      message: '贷款期限（月）为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  loanCurrency: [
    {
      required: true,
      message: '贷款币种为必选项！',
      trigger: ['change', 'blur'],
    },
  ],
  nextRepaymentMon: [
    {
      required: false,
      message: '下期还款金额（不含逾期）为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  nextRepaymentDate: [
    {
      required: false,
      message: '下期还款日期为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  loanFiveForm: [
    {
      required: true,
      message: '五级分类标志为必选项！',
      trigger: ['change', 'blur'],
    },
  ],
  openOrgNo: [
    {
      required: false,
      message: '开户机构为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  mgrId: [
    {
      required: false,
      message: '客户经理为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  repayAcct: [
    {
      required: false,
      message: '还款账号为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  repayName: [
    {
      required: false,
      message: '账号名称为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
  loanUse: [
    {
      required: false,
      message: '贷款用途为可空项！',
      trigger: ['change', 'blur'],
    },
  ],
};