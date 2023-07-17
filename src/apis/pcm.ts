import $http from '@/utils/http/index';
import { HttpListQuery } from '@/utils/http/http-type';
import {depFixedColumns} from "@/views/pcm/cust/cust-hook";
/**
 * 1-201 客户信息
 * @param params 请求参数
 * @returns
 */
//查询和分页
export const getCustList = (params: HttpListQuery) => {
    return $http.post('/pcm/cust/list', params);
};
//新增保存
export const addCust = (params: HttpListQuery) => {
    return $http.post('/pcm/cust/save', params);
};
//修改
export const updCust = (params: HttpListQuery) => {
    return $http.post('/pcm/cust/update', params);
};
//删除
export const delCust = (params: HttpListQuery) => {
    return $http.post('/pcm/cust/delete', params);
};


/**
 * 1-24 对私理财
 * @param params 请求参数
 * @returns
 */
//查询和分页
export const getWealthList = (params: HttpListQuery) => {
    return $http.post('/pcm/wealth/list', params);
};
//新增保存
export const addWealth = (params: HttpListQuery) => {
    return $http.post('/pcm/wealth/save', params);
};
//修改
export const updWealth = (params: HttpListQuery) => {
    return $http.post('/pcm/wealth/update', params);
};
//删除
export const delWealth = (params: HttpListQuery) => {
    return $http.post('/pcm/wealth/delete', params);
};




/**
 * 1-24 定期
 * @param params 请求参数
 * @returns
 */
//查询和分页
export const getDepFixedList = (params: HttpListQuery) => {
    return $http.post('/pcm/depFixed/list', params);
};
//新增保存
export const addDepFixed = (params: HttpListQuery) => {
    return $http.post('/pcm/depFixed/save', params);
};
//修改
export const updDepFixed = (params: HttpListQuery) => {
    return $http.post('/pcm/depFixed/update', params);
};
//删除
export const delDepFixed = (params: HttpListQuery) => {
    return $http.post('/pcm/depFixed/delete', params);
};

/**
 * 1-24 活期
 * @param params 请求参数
 * @returns
 */
//查询和分页
export const getDepCurrList = (params: HttpListQuery) => {
    return $http.post('/pcm/depCurr/list', params);
};
//新增保存
export const addDepCurr = (params: HttpListQuery) => {
    return $http.post('/pcm/depCurr/save', params);
};
//修改
export const updDepCurr= (params: HttpListQuery) => {
    return $http.post('/pcm/depCurr/update', params);
};
//删除
export const delDepCurr = (params: HttpListQuery) => {
    return $http.post('/pcm/depCurr/delete', params);
};

/**
 * 1-24 贷款
 * @param params 请求参数
 * @returns
 */
//查询和分页
export const getLoanList = (params: HttpListQuery) => {
    return $http.post('/pcm/loan/list', params);
};
//新增保存
export const addLoan = (params: HttpListQuery) => {
    return $http.post('/pcm/loan/save', params);
};
//修改
export const updLoan= (params: HttpListQuery) => {
    return $http.post('/pcm/loan/update', params);
};
//删除
export const delLoan = (params: HttpListQuery) => {
    return $http.post('/pcm/loan/delete', params);
};



/**
 * 2-05 分配客户
 * @param params 请求参数
 * @returns
 */
//查询和分页
export const getAssCust= (params: HttpListQuery) => {
    return $http.post('/pcm/cust/list', params);
};
//新增保存
export const AssCustSave = (params: HttpListQuery) => {
    return $http.post('/pcm/cust/save', params);
};
//修改
export const updateAssCust = (params: HttpListQuery) => {
    return $http.post('/pcm/cust/update', params);
};
//删除
export const delAssCust = (params: HttpListQuery) => {
    return $http.post('/pcm/cust/delete', params);
};


/**
 * 2-03 客户经理归属关系
 * @param params 请求参数
 * @returns
 */
//查询和分页
export const getUserRel= (params: HttpListQuery) => {
    return $http.post('/pcm/userRel/list', params);
};
//新增保存
export const addUserRel = (params: HttpListQuery) => {
    return $http.post('/pcm/userRel/save', params);
};
//修改
export const updUserRel = (params: HttpListQuery) => {
    return $http.post('/pcm/userRel/update', params);
};
//删除
export const delUserRel = (params: HttpListQuery) => {
    return $http.post('/pcm/userRel/delete', params);
};




export const getProdOwn = (params: HttpListQuery) => {
    return $http.post('/pcm/prodOwn/list', params);
};




//查询和分页
export const getOrgRel= (params: HttpListQuery) => {
    return $http.post('/pcm/orgRel/list', params);
};
//新增保存
export const addOrgRel = (params: HttpListQuery) => {
    return $http.post('/pcm/orgRel/save', params);
};
//修改
export const updOrgRel = (params: HttpListQuery) => {
    return $http.post('/pcm/orgRel/update', params);
};
//删除
export const delOrgRel = (params: HttpListQuery) => {
    return $http.post('/pcm/orgRel/delete', params);
};
