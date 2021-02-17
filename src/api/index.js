import {get, post} from './http'

// 判断管理员是否登录成功
export const getLoginStatus = (params) => post(`admin/login/status`, params)
// 添加歌手
export const setSinger = (params) => post(`singers`, params);
// 查询所有歌手
export const getAllSingers = () => get(`allSingers`);
// 分页查询歌手列表
export const getSingersListByPage = (params) => get(`singers/querySingersListByPage`, params);
// 获取歌手总记录数
export const getTotalSingersPages = () => get(`singers/querySingersTotalPage`);

