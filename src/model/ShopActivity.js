import {fetchPosts} from "components/common/fetch"
export default {
    namespace: 'ShopActivity',
    state: {
        loading: true,
        loadingInit: false,
        swiperActive: 0,
        tabActive: 0,
        tabs:[],
        swipers: [],
        productList: []
    },
    effects: {
      *getShopInitData(action, {put, call}) {
        yield put({type: 'setLoading', loading: true})

        let swipers = yield call(() => {
          return fetchPosts("stuff/ad/banner.do",{ locationId: 1 },"GET")
            .then(data => data.data)
            .catch(err => ([
              {
                "name": "banner1",
                "img_url": "http://www.easyicon.net/banner1.jpg",
                "link_url": "http://qbao.com/stuff/xxx/index.html",
              }
            ]))
        })

        yield put({
          type: 'getInitData',
          loading: false,
          loadingInit: true,
          swipers
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
          return fetchPosts("/api/goodsList.json", {
              page : 1,
              size : 4
            }, "GET")
            .then(data => data.data)
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
          return fetchPosts("/api/hotSearch.json", {
            cid: action.cid,
            page: action.page,
            size: 4
          }, "GET")
            .then(data => data.data)
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
      }
    }
}
