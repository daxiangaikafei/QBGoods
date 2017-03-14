import { fetchPosts } from 'components/common/fetch'

export default {
  namespace: 'gatherGoods',
  state: {
    loading: false,
    tabActive: 0,
    productList: []
  },
  effects: {
    * getCloudList(action, {
      put,
      call,
      select
    }) {
      yield put({
        type: 'listReq',
        loading: true
      })
      // const cat = yield select(select => select.gatherGoods.tabActive)

      let productList = yield call(() => {
        return fetchPosts("/stuff/ju/cloud.do", {
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
    * getHotSearchList(action, {
      put,
      call,
      select
    }) {
      yield put({
        type: 'listReq',
        loading: true
      })

      let productList = yield call(() => {
        return fetchPosts("/stuff/ju/hotSearch.do", {
          page: 1,
          size: 4
        }, "GET")
          .then(data => data.data)
          .catch(err => ([]))
      }, action.productList)

      yield put({
        type: 'listRes',
        loading: false,
        productList
      })
    }
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
    }
  }
}
