import { columns } from '@/model/comm-model';
import {getNameByCode} from "@/utils/plugin/global";

export type RowType = {
    remindTempId?: string;
    eventType?: string;
    eventSmallType?: string;
    thresholdMon?: number;
    dayNum?: number;
    remindRoleId?: string;
    isOk?: string;
    validDay?: number;
    modifyUserId?: string;
    modifyTime?: string;
    modifyOrgId?: string;
    [key: string]: any;
};

export const RemindTempColumns: Array<columns> = [
    {
        prop: 'eventType',
        label: '事件大类',
        formatter: (row: any) => getNameByCode('eventType', row.eventType),
        overflow: true,
    },
    {
        prop: 'eventSmallType',
        label: '事件细类',
        formatter: (row: any) => getNameByCode('eventSmallType', row.eventSmallType),
        overflow: true,
    },
    {
        prop: 'remindRoleId',
        label: '提醒角色',
        overflow: true,
    },
    {
        prop: 'isOk',
        label: '状态',
        formatter:(row: any) => getNameByCode('isOk', row.isOk),
        overflow: true,
    },
    {
        prop: 'validDay',
        label: '有效天数',
        overflow: true,
    },
    {
        prop: 'modifyUserId',
        label: '维护人',
        overflow: true,
    },
    {
        prop: 'modifyTime',
        label: '修改时间',
        overflow: true,
    },
    {
        prop: 'modifyOrgId',
        label: '维护人所在机构',
        overflow: true,
    },
];

export const remindTempFromRules = {
    // wealthId: [
    //     { required: true, message: '请输入对私理财ID', trigger: 'blur' },
    //     { max: 64, message: '长度在64个字符以内', trigger: 'blur' },
    // ],
    // wealthName: [
    //     { required: true, message: '请输入对私理财名称', trigger: 'blur' },
    //     { max: 100, message: '长度在100个字符以内', trigger: 'blur' },
    // ],
    // wealthPrice: [
    //     { required: true, message: '请输入对私理财价格', trigger: 'blur' },
    //     { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
    // ],
};
