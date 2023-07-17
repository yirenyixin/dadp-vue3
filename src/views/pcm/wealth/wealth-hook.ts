import { columns } from '@/model/comm-model';

export type RowType = {
    wealthId?: string;
    custId?: string;
    ecifCustId?: string;
    custName?: string;
    lawOrgId?: string;
    openOrgId?: string;
    prodCode?: string;
    prodName?: string;
    prodType?: string;
    riskLevel?: string;
    publicOrg?: string;
    perfCompareBase?: number;
    currentBal?: number;
    interestDate?: string;
    endDate?: string;
    holdProfit?: number;
    holdProfitRate?: number;
    [key: string]: any;
};

export const WealthColumns: Array<columns> = [
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

export const wealthFromRules = {

};
