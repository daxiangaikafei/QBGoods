import { fetchPosts } from 'components/common/fetch'

export default {
  namespace: 'activity',
  state: {
    loading: false,
    tabActive: 0,
    productList: [
      {
        stuffId: 4620990,
        name: "联想(Lenovo)扬天V310 14/15英寸笔记本电脑",
        viewPrice: 369900,
        imgUrl: "https://qn-act.qbcdn.com/goods/431541dba150fe72b8eb95487ab77cfd",
        saleCount: 0,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=4620990"
      },
      {
        stuffId: 2693525,
        name: "联想 YOGA900S 12.5英寸触控超极本超薄笔记本",
        viewPrice: 889900,
        imgUrl: "https://qn-act.qbcdn.com/goods/84836b56543d4f7c9ce6f0f9672fef01",
        saleCount: 2,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=2693525"
      },
      {
        stuffId: 2693600,
        name: "联想YOGA900 (YOGA4 PRO)13.3英寸笔记本",
        viewPrice: 799900,
        imgUrl: "https://qn-act.qbcdn.com/goods/6d1cc5436609df36f14c130dc5c8606a",
        saleCount: 1,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=2693600"
      },
      {
        stuffId: 4101602,
        name: "ThinkPad E450 14英寸笔记本电脑 黑色系列",
        viewPrice: 339900,
        imgUrl: "https://qn-act.qbcdn.com/goods/107b075548d28e4ef7985bb50d3e0cb3",
        saleCount: 0,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=4101602"
      },
      {
        stuffId: 4605359,
        name: "联想（Lenovo）Yoga710 14英寸笔记本电脑超薄本",
        viewPrice: 629900,
        imgUrl: "https://qn-act.qbcdn.com/goods/24cb19e9b5d7dc1c4bf827f7eccf1f7d",
        saleCount: 3,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=4605359"
      },
      {
        stuffId: 4300928,
        name: "联想 YOGA700/710 11.6英寸翻转触控笔记本电脑",
        viewPrice: 419900,
        imgUrl: "https://qn-act.qbcdn.com/goods/283a3c9bdd508aeecbf4e5a55fdfb4ed",
        saleCount: 15,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=4300928"
      },
      {
        stuffId: 6200470,
        name: "联想IdeaPad510/510S 14/15.6英寸笔记本",
        viewPrice: 489900,
        imgUrl: "https://qn-act.qbcdn.com/goods/a962e05e73d7eb517ce1cce72d5266c4",
        saleCount: 0,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=6200470"
      },
      {
        stuffId: 4107192,
        name: "联想（lenovo）C4030 21.5英寸一体机电脑 ",
        viewPrice: 359900,
        imgUrl: "https://qn-act.qbcdn.com/goods/a8b33be3455ad95579462e714b9dfc0a",
        saleCount: 1,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=4107192"
      },
      {
        stuffId: 4301007,
        name: "联想 ThinkPad E460 14英寸笔记本电脑系列 ",
        viewPrice: 459900,
        imgUrl: "https://qn-act.qbcdn.com/goods/4d34fc2ecac834dd25ebe9c28f9f07c2",
        saleCount: 7,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=4301007"
      },
      {
        stuffId: 4110938,
        name: "联想（Lenovo）小新310经典版 14英寸超薄笔记本电脑",
        viewPrice: 469900,
        imgUrl: "https://qn-act.qbcdn.com/goods/d6d9ca751c2d9bf46899cbd3b6b07efe",
        saleCount: 3,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=4110938"
      },
      {
        stuffId: 4330345,
        name: "ThinkPad S3 Yoga 14英寸翻转触控商务笔记本",
        viewPrice: 609900,
        imgUrl: "https://qn-act.qbcdn.com/goods/fb33d85ec944ae6b2b028175bfe5b1b6",
        saleCount: 0,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=4330345"
      },
      {
        stuffId: 4124720,
        name: "ThinkPad New S2 13.3英寸超极笔记本电脑",
        viewPrice: 619900,
        imgUrl: "https://qn-act.qbcdn.com/goods/208b89fe44d7bca20d967f06d5019392",
        saleCount: 1,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=4124720"
      },
      {
        stuffId: 2683720,
        name: "联想 （Lenovo）天逸300 14/15英寸笔记本电脑",
        viewPrice: 399900,
        imgUrl: "https://qn-act.qbcdn.com/goods/f3d73c3ef137929ac7f6fabd6c02eeed",
        saleCount: 1,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=2683720"
      },
      {
        stuffId: 4615494,
        name: "联想 ideapad 310S 14/15.6英寸笔记本电脑",
        viewPrice: 359900,
        imgUrl: "https://qn-act.qbcdn.com/goods/e9b86d8b0cb93c19156833f1bc598394",
        saleCount: 0,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=4615494"
      },
      {
        stuffId: 2688462,
        name: "联想（Lenovo）拯救者 ISK 15.6英寸游戏本",
        viewPrice: 599900,
        imgUrl: "https://qn-act.qbcdn.com/goods/009aeb09e436a889ed8c8e17fbb8e63d",
        saleCount: 1,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=2688462"
      },
      {
        stuffId: 2682054,
        name: "联想 S41-75 /S435 14英寸笔记本 电脑系列",
        viewPrice: 299900,
        imgUrl: "https://qn-act.qbcdn.com/goods/339c0d747e2bcf6809f903afcc4a2b31",
        saleCount: 1,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=2682054"
      },
      {
        stuffId: 4120230,
        name: "联想(lenovo) 扬天M2601 台式机电脑",
        viewPrice: 329900,
        imgUrl: "https://qn-act.qbcdn.com/goods/cf300cee3841abead78aad058a395166",
        saleCount: 2,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=4120230"
      },
      {
        stuffId: 2680866,
        name: "联想 Ideapad100S 11英寸/14英寸笔记电脑系列",
        viewPrice: 239900,
        imgUrl: "https://qn-act.qbcdn.com/goods/c4ed44401f229e05822d2baeb85bb7c8",
        saleCount: 4,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=2680866"
      },
      {
        stuffId: 2687455,
        name: "联想（Lenovo）Y700 15.6英寸游戏笔记本电脑",
        viewPrice: 659900,
        imgUrl: "https://qn-act.qbcdn.com/goods/8f3c6d15079bcbdf8d5aa5a2ec43aa0d",
        saleCount: 1,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=2687455"
      },
      {
        stuffId: 2683585,
        name: "联想（Lenovo） G40-80 14英寸笔记本电脑 系列",
        viewPrice: 359900,
        imgUrl: "https://qn-act.qbcdn.com/goods/fd83dc8229154a1b964286349ff18449",
        saleCount: 1,
        source: "qbao",
        haohuoScore: 50,
        haohuoUrl: "https://banyanapi.qbao.com/release/h5App/goodsIndex/default/page.html?channel=60&goodsId=2683585"
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
