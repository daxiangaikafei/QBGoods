import {fetchPosts} from "components/common/fetch"

export default {
  namespace: 'hotgoods',
  state: {
    loading: true,
    loadingInit: false,
    swiperActive: 0,
    tabActive: -1,
    page: 1,
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
        return fetchPosts("/stuff/hot/goodsClass.do",{  },"GET")
          .then(data => data.data)
          .catch(err => ([
            {
                "id":27,
                "name":"全部1"
            }
          ]))
      })

      let banners = yield call(() => {
        return fetchPosts("/stuff/ad/banner.do",{ locationId: 21 },"GET")
          .then(data => data.data)
          .catch(err => ([]))
      })

      let stuffs = yield call(() => {
        return fetchPosts("/stuff/ad/stuff.do",{ locationId: 22 },"GET")
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
      // yield put({
      //   type: 'getCloudList',
      //
      // });
    },

    *getCloudList(action, {  put,call }) {
      yield put({
        type: 'listReq',
        loading: true
      })
      // const cat = yield select(select => select.gatherGoods.tabActive)

      let productList = yield call(() => {
        return fetchPosts("api/goodsList.json", {
            cId:1,
            page : 1,
            size : 8
          }, "GET")
          .then(data => data.data)
          .catch(err => ([]))
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
        return fetchPosts("/stuffhot/goodsList.do", {
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
    },
    *getLoadedMoreList(action , { put, call, select }) {
      yield put({
        type: 'listReq',
        loading: true
      })

      console.log("action", action);

      let productList = yield call(() => {
        return fetchPosts("/stuff/hot/goodsList.do", {
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
