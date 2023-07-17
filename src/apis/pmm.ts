import {HttpListQuery} from "@/utils/http/http-type";
import $http from "@/utils/http/index";


//事件参数管理
//查询和分页
export const getRemindTempList = (params:HttpListQuery) => {
    return $http.post('pmm/remindTemp/list', params);
};
//新增保存
export const addRemindTemp = (params : HttpListQuery) => {
    return $http.post('/pmm/remindTemp/save', params);
};
//修改
export const updRemindTemp = (params: HttpListQuery) => {
    return $http.post('/pmm/remindTemp/update', params);
};
//删除
export const delRemindTemp = (params: HttpListQuery) => {
    return $http.post('/pmm/remindTemp/delete', params);
};

//提醒表
export const getRemindList = (params:HttpListQuery) => {
    return $http.post('pmm/remind/list', params);
};





/////

//新增保存
export const addRemind = (params : HttpListQuery) => {
    return $http.post('/pmm/remind/save', params);
};
//修改
export const updRemind = (params: HttpListQuery) => {
    return $http.post('/pmm/remind/update', params);
};
export const delRemind = (params: HttpListQuery) => {
    return $http.post('/pmm/remind/delete', params);
};

