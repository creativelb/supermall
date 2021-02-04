import { request1 } from '@/network/request'

export function getDetail(iid) {
  let config = {
    url: '/detail',
    method: 'get',
    params: {
      iid
    }
  }
  return request1(config);
}

export function getRecommend(iid) {
  let config = {
    url: '/recommend',
    method: 'get',
    params: {
      iid
    }
  }
  return request1(config);
}

//整合一下详情组件里的数据
// 店铺商品信息对象
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
// 店铺的信息对象
export class ShopInfo {
  constructor(shopId, cFans, cGoods, cSells, score, shopLogo, name) {
    this.shopId = shopId;
    this.fans = cFans;
    this.goodsCount = cGoods;
    this.sells = cSells;
    this.score = score;
    this.logo = shopLogo;
    this.name = name;
  }
}
// 参数信息
export class ParaMeter {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export class Comment {
  constructor(comment) {
    this.content = comment.content;
    this.images = comment.images;
    this.isAnonymous = comment.isAnonymous;
    this.isEmpty = comment.isEmpty;
    this.level = comment.level;
    this.rateId = comment.rateId;
    this.style = comment.style;
    this.created = comment.created;
    this.user = comment.user
  }
}

export class RecommendItem {
  constructor(recommend) {
    this.iid = recommend.item_id;
    this.title = recommend.title;
    this.price = recommend.discountPrice;
    this.cfav = recommend.cfav;
    this.showLarge = {
      img: recommend.image
    }
  }
}
