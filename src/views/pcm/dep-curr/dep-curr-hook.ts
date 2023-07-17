import { columns } from '@/model/comm-model';
import { getNameByCode } from '@/utils/plugin/global';

export type RowType = {
    depCurrId?: string;
    custId?: string;
    ecifCustId?: string;
    custName?: string;
    lawOrgId?: string;
    prodCode?: string;
    prodName?: string;
    acctNo?: string;
    currNo?: string;
    bal?: string;
    acctSts?: string;
    openOrgNo?: string;
    startDt?: string;
    voucherNo?: string;
    subAcctNo?: string;
    currentBal?: number;
    ver?: number;
    [key: string]: any;
};

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

export const depCurrFromRules = {
    depCurrId: [
        {
            required: true,
            message: '代码类别ID为必填项！',
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
    acctNo: [
        {
            required: false,
            message: '账号/卡号为可空项！',
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
    acctSts: [
        {
            required: false,
            message: '账户状态为可空项！',
            trigger: ['change', 'blur'],
        },
    ],
    openOrgNo: [
        {
            required: false,
            message: '子账户开户行为可空项！',
            trigger: ['change', 'blur'],
        },
    ],
    startDt: [
        {
            required: false,
            message: '开户日期为可空项！',
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
    subAcctNo: [
        {
            required: false,
            message: '活期子账户为可空项！',
            trigger: ['change', 'blur'],
        },
    ],
    currentBal: [
        {
            required: false,
            message: '当前余额为可空项！',
            trigger: ['change', 'blur'],
        },
    ],
};