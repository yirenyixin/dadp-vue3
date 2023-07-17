import { columns } from '@/model/comm-model';
import {getNameByCode} from "@/utils/plugin/global";

export type RowType = {
    remindId?: string;
    remindContent?: string;
    validDay?: number;
    createDate?: string;
    receiverUserId?: string;
    custId?: string;
    lawOrgId?: string;
    eventType?: string;
    eventSmallType?: string;

};

export const RemindColumns: Array<columns> = [
    {
        prop: 'remindContent',
        label: '提醒内容',
        overflow: true,
    },
    {
        prop: 'validDay',
        label: '有效天数',
        overflow: true,
    },
    {
        prop: 'createDate',
        label: '提醒日期',
        overflow: true,
    },
    {
        prop: 'receiverUserId',
        label: '接收人',
        overflow: true,
    },
    {
        prop: 'custId',
        label: '客户号',
        overflow: true,
    },
    {
        prop: 'lawOrgId',
        label: '客户归属法人机构',
        overflow: true,
    },
    {
        prop: 'eventType',
        label: '事件分类',
        formatter:(row:any) => getNameByCode("eventType",row.eventType),
        overflow: true,
    },
    {
        prop: 'eventSmallType',
        label: '事件细类',
        formatter:(row:any) => getNameByCode("eventSmallType",row.eventSmallType),
        overflow: true,
    },

];

export const remindFromRules = {

};
