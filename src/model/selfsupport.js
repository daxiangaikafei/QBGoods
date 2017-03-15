  import {fetchPosts} from "components/common/fetch"
export default {
    namespace: 'selfsupport',
    state: {
        loading: true,
        loadingInit: false,
        swiperActive: 0,
        tabActive: -1,
        tabs:[],
        swipers: [],
        productList: []
    },
    effects: {
      *getGoodsInitData(action, {put, call}) {
        yield put({type: 'setLoading', loading: true})

        let tabs = yield call(() => {
          return fetchPosts("qbzy/goodsClass.do",{  },"GET")
            .then(data => data.data)
            .catch(err => ([
              {
                  "id":27,
                  "name":"全部1"
              }
            ]))
        })

        let swipers = yield call(() => {
          return fetchPosts("ad/banner.do",{ locationId: 23 },"GET")
            .then(data => data.data)
            .catch(err => ([]))
        })

        yield put({
          type: 'getInitData',
          loading: false,
          loadingInit: true,
          tabs,
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
          return fetchPosts("qbzy/goodsList.do", {
              userId: 10001,
              cid: 27,
              page : 1,
              size : 4
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

        let productList = yield call(() => {
          return fetchPosts("qbzy/goodsList.do", {
            userId: 10001,
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
      },
      tabAct(state, { active }) {
        return { ...state, tabActive: active };
      }
    }
}
