import http from './config';
import queryStringfy from '@/utiles/queryStringfy'
import timestampToDate from '@/utiles/time';
const domain = '/api/v1/user_infos'
export const getDetail = async (query) => {
  const res = (await http.get(`${domain}/integral/detail${queryStringfy(query)}`)).data
  return res.data ? { ...res,
    data: res.data.map(item => {
      return { ...item, created_at: timestampToDate(Date.parse(item.created_at)) }
    }) } // 时间格式化
    : res
}

export const getTotal = async (query) => {
  const res = (await http.get(`${domain}/integral/total${queryStringfy(query)}`)).data
  return { ...res,
    data: res.data.map(item => {
      return { ...item, created_at: timestampToDate(Date.parse(item.created_at)) }
    }) }
}
