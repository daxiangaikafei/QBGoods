import { fetchPosts } from 'components/common/fetch'

export default {
  namespace: 'gatherStore',
  state: {
    loading: false,
    storeList: [],
    bannerList: []
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
        return fetchPosts("/stuff/shop/getShop.do", {
            shopSize : 2,
            stuffSize : 3
          }, "GET")
          .then(data => data.data)
          .catch(err => ([]))
      })

      yield put({
        type: 'listRes',
        loading: false,
        storeList
      })
    },
    * getBannerList(action, {
      put,
      call
    }) {
      yield put({
        type: 'bannerReq',
        loading: true
      })

      let bannerList = yield call(() => {
        return fetchPosts("/stuff/ad/banner.do", {
          locationId: action.id || 24
        }, "GET")
          .then(data => data.data)
          .catch(err => ([]))
      })

      yield put({
        type: 'bannerRes',
        loading: false,
        bannerList
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