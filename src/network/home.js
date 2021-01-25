import { request1 } from "@/network/request.js";

export function getHomeData() {
  return request1({
    url: '/home/multidata',
    method: 'get'
  })

}

export function getHomeGoods(type,page){

  return request1({
    url: '/home/data',
    method: 'get',
    params:{
      type,
      page
    }
  })
}