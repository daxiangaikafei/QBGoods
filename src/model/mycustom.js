import {fetchPosts} from "components/common/fetch"
import { deepCopy } from 'libs/util'

export default {
  namespace: 'mycustom',
  state: {
    loading: false,
    tabActive: "shop",
    shopTipShow: false,
    shopTipLabel: "",
    shopTipNum: 0,
    shopLabels:[
      {
        "tag_detail_id": 1,
        "name": "白富美",
        "icon" : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3199434975,3493096457&fm=111&gp=0.jpg",
        "count": 10000,
        "check": true
      }
    ],
    selfTipShow: false,
    selfTipNum: 0,
    selfLabels:[
      {
        "tag_detail_id": 1,
        "name": "白富美",
        "icon" : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3199434975,3493096457&fm=111&gp=0.jpg",
        "count": 10000,
        "check": true
      },
      {
        "tag_detail_id": 2,
        "name": "高富帅",
        "icon" : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3199434975,3493096457&fm=111&gp=0.jpg",
        "count": 3000,
        "check": false
      },
      {
        "tag_detail_id": 3,
        "name": "屌丝",
        "icon" : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3199434975,3493096457&fm=111&gp=0.jpg",
        "count": 10000,
        "check": false
      },
      {
        "tag_detail_id": 2,
        "name": "高富帅",
        "icon" : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3199434975,3493096457&fm=111&gp=0.jpg",
        "count": 3000,
        "check": false
      },
      {
        "tag_detail_id": 3,
        "name": "屌丝",
        "icon" : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3199434975,3493096457&fm=111&gp=0.jpg",
        "count": 10000,
        "check": false
      },
      {
        "tag_detail_id": 2,
        "name": "高富帅",
        "icon" : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3199434975,3493096457&fm=111&gp=0.jpg",
        "count": 3000,
        "check": false
      },
      {
        "tag_detail_id": 3,
        "name": "屌丝",
        "icon" : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3199434975,3493096457&fm=111&gp=0.jpg",
        "count": 10000,
        "check": false
      }
    ],
    shopLabelsDefault:[
      {
        "tag_detail_id": 1,
        "name": "白富美",
        "icon" : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3199434975,3493096457&fm=111&gp=0.jpg",
        "count": 10000,
        "check": true
      }
    ],
    selfLabelsDefault:[
      {
        "tag_detail_id": 3,
        "name": "屌丝",
        "icon" : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3199434975,3493096457&fm=111&gp=0.jpg",
        "count": 10000,
        "check": false
      }
    ],
  },
  effects: {
    *getShopLabels (action, {put, call}) {
      yield put({type: 'setLoading', loading: true})

      let shopLabels = yield call(() => {
          return fetch("api/getshops.json", {
                  method: "GET",
                  mode: 'no-cors'
              })
              .then((res) => {
                  return res.json();
              })
              .then((data) => {
                  return data.data[0].items;
              }).catch(err => ([]))
      })

      let selfLabels = yield call(() => {
          return fetch("api/getselfs.json", {
                  method: "GET",
                  mode: 'no-cors'
              })
              .then((res) => {
                  return res.json();
              })
              .then((data) => {
                  return data.data[0].items;
              }).catch(err => ([]))
      })
      yield put({
        type: 'getShopLabelsRes',
        loading: false,
        shopLabels: shopLabels,
        shopLabelsDefault: deepCopy(shopLabels),
        selfLabels: selfLabels,
        selfLabelsDefault: deepCopy(selfLabels)
      });
    },
    *saveLabels (action, {put, call}){
      yield put({type: 'setLoading', loading: true})

      let results = yield call(() => {
          return fetchPosts("api/getshops.json",{ tagDetailIds: action.tagDetailIds },"POST")
            .then(data => data)
            .catch(err => ({}))
      })

      let results2 = yield call(() => {
          return fetchPosts("api/getshops.json",{ tagDetailIds: action.tagSelfDetailIds },"POST")
            .then(data => data)
            .catch(err => ({}))
      })

      yield put({ type: 'setLoading', loading: false});
    }
  },
  reducers: {
    tabAct(state, { active }) {
      return { ...state, tabActive: active };
    },
    editTipShow(state, { label, num }) {
      return { ...state, shopTipShow: true, shopTipLabel: label, shopTipNum: num };
    },
    editLabelSelected(state , { index , check }){
      let newShopLabels = state.shopLabels.slice();
      newShopLabels[index].check = check;
      return {
        ...state,
        shopLabels: newShopLabels
      }
    },

    setLoading (state, payload) {
      return {...state, ...payload}
    },
    getShopLabelsRes (state, payload) {
      return {...state, ...payload}
    },

    editSelfTipShow(state, { num }) {
      return { ...state, selfTipShow: true, selfTipNum: num };
    },
    editSelfLabelSelected(state , { index , check }){
      let newSelfLabels = state.selfLabels.slice();
      newSelfLabels[index].check = check;
      return {
        ...state,
        selfLabels: newSelfLabels
      }
    },
  }
}
