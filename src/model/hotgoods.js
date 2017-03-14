import {fetchPosts} from "components/common/fetch"

export default {
  namespace: 'hotgoods',
  state: {
    loading: true,
    loadingInit: false,
    swiperActive: 0,
    tabActive: 0,
    pageActive: 0,
    goodsStuffs: [
      {
        "id": 1001,
        "name": "御泥坊玫瑰滋养矿物洁面乳2只装",
        "img_url": "http://www.swiper.com.cn/demo/img/fade1.jpg",
        "link_url": "http://linkurl",
        "price": "65.00",
        "rebate_value": "100",
        "source": "tmall",
        "sale_count": ""
      }
    ],
    goodsTabs:[
    ],
    goodsSwipers: [
      {
        href: "11111",
        src: "http://www.swiper.com.cn/demo/img/fade1.jpg"
      }
    ],
    productList: [

    ]
  },
  effects: {
    *getGoodsInitData(action, {put, call}) {
      yield put({type: 'setLoading', loading: true})

      let goodsClass = yield call(() => {
        return fetchPosts("stuff/hot/goodsClass.do",{  },"GET")
          .then(data => data.data)
          .catch(err => ([
            {
                "id":27,
                "name":"全部1"
            }
          ]))
      })

      let banners = yield call(() => {
        return fetchPosts("stuff/ad/banner.do",{ locationId: 21 },"GET")
          .then(data => data.data)
          .catch(err => ([
            {
              "name": "banner1",
              "img_url": "http://www.easyicon.net/banner1.jpg",
              "link_url": "http://qbao.com/stuff/xxx/index.html",
            }
          ]))
      })

      let stuffs = yield call(() => {
        return fetchPosts("stuff/ad/stuff.do",{ locationId: 22 },"GET")
          .then(data => data.data)
          .catch(err => ([]))
      })

      yield put({
        type: 'getInitData',
        loading: false,
        loadingInit: true,
        goodsStuffs: stuffs,
        goodsTabs: goodsClass,
        goodsSwipers: banners
      });
    },

    *getCloudList(action, {
      put,
      call
    }) {
      yield put({
        type: 'listReq',
        loading: true
      })
      // const cat = yield select(select => select.gatherGoods.tabActive)

      let productList = yield call(() => {
        return fetchPosts("api/goodsList.json", {
            cId:1,
            userId: 10001,
            page : 1,
            size : 4
          }, "GET")
          .then(data => data.data.items)
          .catch(err => ([
            {
              "id": 1001,
              "name": "御泥坊玫瑰滋养矿物洁面乳2只装",
              "img_url": "http://127.0.0.1:8888/images/src/static/imgs/gatherGoods/banner.png",
              "link_url": "http://linkurl",
              "price": "65.00",
              "rebate_value": "100",
              "source": "tmall",
              "sale_count": ""
            },
            {
              "id": 1002,
              "name": "好奇纸尿裤金装",
              "img_url": "http://imgurl",
              "link_url": "http://linkurl",
              "price": "119",
              "rebate_value": "500",
              "source": "taobao",
              "sale_count": ""
            }
          ]))
      }, action.productList)

      yield put({
        type: 'listRes',
        loading: false,
        productList
      })
    },

    *getHotSearchList(action , { put, call, select }) {
      yield put({
        type: 'listReq',
        loading: true
      })

      console.log("action", action);

      let productList = yield call(() => {
        return fetchPosts("stuff/hot/goodsList.do", {
          cId: action.cid,
          userId: 10001,
          page: action.page,
          size: 4
        }, "GET")
          .then(data => data.data.items)
          .catch(err => ([]))
      })

      yield put({
        type: 'listRes',
        loading: false,
        productList
      })
    }
  },
  reducers: {
    listReq (state, payload) {
      return {...state, ...payload}
    },
    listRes (state, payload) {
      return {...state, ...payload}
    },


    setLoading (state, payload) {
      return {...state, ...payload}
    },

    getInitData (state, payload) {
      return {...state, ...payload}
    },


    swiperAct(state, { active }) {
      return { ...state, swiperActive: active };
    },
    tabAct(state, { active }) {
      return { ...state, tabActive: active };
    }
  }
}
