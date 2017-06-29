import { fetchPosts } from 'components/common/fetch'
import { deepCopy } from 'libs/util'
export default {
  namespace: 'gatherGoods',
  state: {
    loading: false,
    tabActive: 0,
    navActive:0,
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
        let stuffId = action.stuffId;
        return fetchPosts("/stuff/rec/similar.do", {
          page: page,
          stuffId: stuffId,
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
    },
    * getRelatedList(action, {
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
        let stuffId = action.stuffId;
        return fetchPosts("/stuff/rec/related.do", {
          page: page,
          stuffId: stuffId,
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
    },
    * getLabelsList(action, {
      put,
      call,
      select
    }) {
      yield put({
        type: 'listReq',
        loading: true
      })
      let productList = yield call(() => {
        return fetchPosts("/stuff/theme/list.do", {
          type: 1
        }, "GET")
          .then(data => {
            return data.data
          })
          .catch(err => ([]))
      })

      yield put({
        type: 'listRes',
        navActive:0,
        editThemeIds:[],
        productList: productList,
        productListCopy: deepCopy(productList)
      })
    },
    * getDNALabelsList(action, {
      put,
      call,
      select
    }) {
      yield put({
        type: 'listReq',
        loading: true
      })
      let productList = yield call(() => {
        return fetchPosts("/stuff/theme/list.do", {
          type: 2
        }, "GET")
          .then(data => {
            return data.data
          })
          .catch(err => ([]))
      })

      yield put({
        type: 'listRes',
        navActive:0,
        editThemeIds:[],
        productList: productList,
        productListCopy: deepCopy(productList)
      })
    }
  },
  reducers: {
    saveNavItemCheck(){
      let productList = deepCopy(state.productList);
      return {...state, productListCopy: productList, editThemeIds: [] }
    },
    setNavItemCheck(state, {index}){

      let newProductList = state.productList.slice();
      let themeId;
      if(newProductList&&newProductList.length>0){
        newProductList[state.navActive].items[index].check = !newProductList[state.navActive].items[index].check;
        themeId = newProductList[state.navActive].items[index].themeId;
      }

      let neweditThemeIds = state.editThemeIds.slice();
      let itemindex = neweditThemeIds.indexOf(themeId);

      if(itemindex > -1){
        neweditThemeIds.splice(itemindex, 1);
      }else{
        neweditThemeIds.push(themeId);
      }

      return {...state, productList: newProductList, editThemeIds: neweditThemeIds }
    },
    navRest(state){
      let productListCopy = deepCopy(state.productListCopy);
      return {...state, productList: productListCopy, editThemeIds: [] }
    },
    navAct(state, { active }) {
      return { ...state, navActive: active };
    },
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
