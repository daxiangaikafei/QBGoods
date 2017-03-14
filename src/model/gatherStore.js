import { fetchPosts } from 'components/common/fetch'

export default {
  namespace: 'gatherStore',
  state: {
    loading: false,
    tabActive: 0,
    storeList: []
  },
  effects: {
    * getStoreList(action, {
      put,
      call,
      select
    }) {
      yield put({
        type: 'listReq',
        loading: true
      })

      let storeList = yield call(() => {
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
        storeList
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