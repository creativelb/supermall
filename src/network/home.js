import { request1 } from "@/network/request.js";

export function getHomeData() {
  return request1({
    url: '/home/multidata',
    method: 'get'
  })

}