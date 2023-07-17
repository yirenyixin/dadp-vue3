import { columns } from '@/model/comm-model';
import { getNameByCode } from '@/utils/plugin/global';
import { validateIdNumber, validatePhone } from '@/utils/tools/validator';
export type RowType = {
  religionId: string;
  religionName: string;
  sortNo: number;
  remark: string;
  ver: number;
  [key: string]: any;
};
export const religionTableColumns: Array<columns> = [
  {
    prop: 'religionId',
    label: '宗教ID',
    overflow: true,
  },
  {
    prop: 'religionName',
    label: '宗教名称',
    overflow: true,
  },
  {
    prop: 'sortNo',
    label: '排序号',
    overflow: true,
  },
  {
    prop: 'remark',
    label: '备注',
    overflow: true,
  },
];
export const religionCommonRules = {
  religionId: [
    { required: true, message: '请输入宗教ID', trigger: 'blur' },
    { max: 32, message: '长度在32个字符以内', trigger: 'blur' },
  ],
  religionName: [
    { required: true, message: '请输入宗教名称', trigger: 'blur' },
    { max: 100, message: '长度在100个字符以内', trigger: 'blur' },
  ],
  sortNo: [{ required: true, message: '请输入排序号', trigger: 'blur' }],
  remark: [{ max: 400, message: '长度在400个字符以内', trigger: 'blur' }],
};
