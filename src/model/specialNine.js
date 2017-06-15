import {fetchPosts} from "components/common/fetch"

export default {
  namespace: 'specialNine',
  state: {
    loading: true,
    loadingInit: false,
    swiperActive: 0,
    tabActive: -1,
    page: 1,
    goodsStuffs: [],
    goodsTabs:[
    ]
  },
  effects: {
    *getGoodsInitData(action, {put, call}) {
      yield put({type: 'setLoading', loading: true})

      let goodsClass = yield call(() => {
        return fetchPosts("/stuff/nine/goodsClass.do",{  },"GET")
          .then(data => data.data)
          .catch(err => ([
            {
                "id":27,
                "name":"全部1"
            }
          ]))
      })

      // let stuffs = yield call(() => {
      //   return fetchPosts("/stuff/ad/stuff.do",{ locationId: 22 },"GET")
      //     .then(data => data.data)
      //     .catch(err => ([]))
      // })

      yield put({
        type: 'getInitData',
        loading: false,
        loadingInit: true,
        // goodsStuffs: stuffs,
        goodsTabs: goodsClass
      });
      // yield put({
      //   type: 'getCloudList',
      //
      // });
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
    tabAct(state, { active }) {
      return { ...state, tabActive: active };
    }
  }
}
