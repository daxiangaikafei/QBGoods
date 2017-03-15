import { fetchPosts } from 'components/common/fetch'

export default {
  namespace: 'activity',
  state: {
    loading: false,
    tabActive: 0,
    productList: [
      {
      id: 45638,
      name: "带上她的眼睛:刘慈欣科幻短篇小说集1:刘慈欣科幻短篇小说集1《带上她的眼睛》",
      finalPrice: 22.7,
      imgUrl: "http://img03.taobaocdn.com/bao/uploaded/i3/TB1EJNDNVXXXXXaaXXXXXXXXXXX_!!0-item_pic.jpg",
      linkUrl: "http://item.taobao.com/item.htm?id=530538582731",
      rebateValue: "返100宝券",
      source: "tmall",
      orderNum: 78
    },
    {
      id: 10150,
      name: "3d眼镜电影院专用偏振3D电视眼镜通用Reald圆偏光不闪式立体眼睛",
      finalPrice: 15,
      imgUrl: "http://image.taobao.com/bao/uploaded/i1/TB1uTOqNXXXXXcnapXXYXGcGpXX_M2.SS2",
      linkUrl: "http://item.taobao.com/item.htm?id=538068215561",
      rebateValue: "返100宝券",
      source: "tmall",
      orderNum: 156
    },
    {
      id: 10167,
      name: "新款3D眼镜电影院专用偏光式3D电视reald不闪式三4D立体眼睛通用",
      finalPrice: 35.9,
      imgUrl: "http://img03.taobaocdn.com/bao/uploaded/i3/826138090/TB2TqEbfrJkpuFjy1zcXXa5FFXa_!!826138090.jpg",
      linkUrl: "http://item.taobao.com/item.htm?id=542190255825",
      rebateValue: "返100宝券",
      source: "taobao",
      orderNum: 47
    },
    {
      id: 10173,
      name: "包邮 nVIDIA 3D立体眼镜 红蓝眼睛夹片 近视专用 电视电脑专用",
      finalPrice: 9.9,
      imgUrl: "http://img01.taobaocdn.com/bao/uploaded/i1/18883022521123013/T1jEasXxtcXXXXXXXX_!!0-item_pic.jpg",
      linkUrl: "http://item.taobao.com/item.htm?id=20449972128",
      rebateValue: "返100宝券",
      source: "taobao",
      orderNum: 15
    },
    {
      id: 10219,
      name: "3d儿童5-10岁可爱眼镜圆偏光式reald电影院专用三D眼睛电视通用",
      finalPrice: 35,
      imgUrl: "http://img02.taobaocdn.com/bao/uploaded/i2/TB1BwEeMVXXXXcWXpXXXXXXXXXX_!!0-item_pic.jpg",
      linkUrl: "http://item.taobao.com/item.htm?id=529408217007",
      rebateValue: "返100宝券",
      source: "tmall",
      orderNum: 42
    },
    {
      id: 10222,
      name: "抢！暴风影音红蓝3d眼镜电脑手机电视专用电影三D立体眼睛包邮",
      finalPrice: 6.7,
      imgUrl: "http://img03.taobaocdn.com/bao/uploaded/i3/1126062257/TB2HzcKlXXXXXaHXpXXXXXXXXXX_!!1126062257.jpg",
      linkUrl: "http://item.taobao.com/item.htm?id=527916494538",
      rebateValue: "返100宝券",
      source: "taobao",
      orderNum: 18
    },
    {
      id: 37800,
      name: "雯屋韩国live work可爱眼睛创意手作礼物包装袋多用收纳纸袋S/M/L",
      finalPrice: 12,
      imgUrl: "http://image.taobao.com/bao/uploaded/i5/TB1tSrSPpXXXXXRaXXXYXGcGpXX_M2.SS2",
      linkUrl: "http://item.taobao.com/item.htm?id=545039330293",
      rebateValue: "返100宝券",
      source: "taobao",
      orderNum: 10
    },
    {
      id: 57334,
      name: "夏季新款潮牌男式背心眼睛3D球赛加大肥佬无袖速干透气球衣男",
      finalPrice: 39,
      imgUrl: "http://img02.taobaocdn.com/bao/uploaded/i2/TB1fMOwPFXXXXcvaXXXXXXXXXXX_!!0-item_pic.jpg",
      linkUrl: "http://item.taobao.com/item.htm?id=545538735795",
      rebateValue: "返100宝券",
      source: "taobao",
      orderNum: 0
    },
    {
      id: 10136,
      name: "3d眼镜夹片电影院专用IMAX Reald偏光偏振3D电视立体眼睛近视通用",
      finalPrice: 15,
      imgUrl: "http://image.taobao.com/bao/uploaded/i3/TB1VtQSKFXXXXXJXFXXYXGcGpXX_M2.SS2",
      linkUrl: "http://item.taobao.com/item.htm?id=534639536731",
      rebateValue: "返100宝券",
      source: "tmall",
      orderNum: 4302
    },
    {
      id: 10140,
      name: "三d电影院专用imaxReald电视偏光偏振3d立体眼镜通用近视夹片眼睛",
      finalPrice: 35.5,
      imgUrl: "http://img01.taobaocdn.com/bao/uploaded/i1/TB1HljdPVXXXXaQXpXXXXXXXXXX_!!0-item_pic.jpg",
      linkUrl: "http://item.taobao.com/item.htm?id=44423676390",
      rebateValue: "返100宝券",
      source: "tmall",
      orderNum: 4873
    }
    ],
    bannerList: []
  },
  
  reducers: {
    listReq(state, payload) {
      return { ...state,
        ...payload
      }
    },
    listRes(state, payload) {
      return { ...state,
        ...payload
      }
    },
    bannerReq(state, payload) {
      return {
        ...state,
        ...payload
      }
    },
    bannerRes(state, payload) {
      return {
        ...state,
        ...payload
      }
    }
  }
}
