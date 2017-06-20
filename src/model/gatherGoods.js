import { fetchPosts } from 'components/common/fetch'

export default {
  namespace: 'gatherGoods',
  state: {
    loading: false,
    tabActive: 0,
    page: 1,
    isEnd: false,
    productList: [],
    bannerList: []
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
      let _productList = yield select(select => select.gatherGoods.productList)
      let isEnd,page;
      let productList = yield call(() => {
        page = action.page || 1
        return fetchPosts("/stuff/ju/cloud.do", {
            page: page,
            size : 20
          }, "GET")
          .then(data => {
            isEnd = data.data.length < 4 ? true : false;
            return page == 1 ? data.data : _productList.concat(data.data)
          })
          .catch(err => ([]))
      })

      yield put({
        type: 'listRes',
        loading: false,
        productList,
        isEnd: isEnd,
        page, page
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
      let _productList = yield select(select => select.gatherGoods.productList)
      let isEnd, page;
      let productList = yield call(() => {
        page = action.page || 1
        return fetchPosts("/stuff/ju/stuffList.do", {
          page: page,
          size: 20
        }, "GET")
          .then(data => {
            isEnd = data.data.length < 4 ? true : false;
            return page == 1 ? data.data : _productList.concat(data.data)
          })
          .catch(err => ([]))
      })

      yield put({
        type: 'listRes',
        loading: false,
        productList,
        page, page
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
    },
    * getLikeList(action, {
      put,
      call,
      select
    }) {
      yield put({
        type: 'listReq',
        loading: true
      })
      let _productList = yield select(select => select.gatherGoods.productList)
      let isEnd, page, size = 8;
      let productList = yield call(() => {
        page = action.page || 1
        return fetchPosts("/stuff/brand/detail.do", {
          page: page,
          size: size
        }, "GET")
          .then(data => {
            isEnd = data.data.length < size ? true : false;
            return page == 1 ? data.data : _productList.concat(data.data)
          })
          .catch(err => ([]))
      })

      yield put({
        type: 'listRes',
        loading: false,
        isEnd: isEnd,
        productList,
        page, page
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
