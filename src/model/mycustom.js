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
        return fetchPosts("/stuff/custom/getUserTags.do",{ userId: 10001, typeId: 1 },"GET")
          .then(data => data.data.items)
          .catch(err => ([ ]))
      })

      let selfLabels = yield call(() => {
        return fetchPosts("/stuff/custom/getUserTags.do",{ userId: 10001, typeId: 2 },"GET")
          .then(data => data.data.items)
          .catch(err => ([]))
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
          return fetchPosts("/stuff/custom/updateUserTags.do",{ typeId: 1 ,tagDetailIds: action.tagDetailIds },"GET")
            .then(data => data)
            .catch(err => ({}))
      })

      let results2 = yield call(() => {
          return fetchPosts("/stuff/custom/updateUserTags.do",{ typeId: 2 ,tagDetailIds: action.tagSelfDetailIds },"GET")
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

      let shopTotal = 0;
      newShopLabels.map(function(n,i){
        if(n.check){
          shopTotal += n.count;
        }
      });
      return {
        ...state,
        shopTipShow: true,
        shopLabels: newShopLabels,
        shopTipNum: shopTotal
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

      let shopTotal = 0;
      newSelfLabels.map(function(n,i){
        if(n.check){
          shopTotal += n.count;
        }
      });

      return {
        ...state,
        selfTipShow: true,
        selfTipNum: shopTotal,
        selfLabels: newSelfLabels
      }
    },

    setDefaultShopDatas (state, payload) {
      let shopLabelsDefault = deepCopy(state.shopLabels);
      return {...state, shopLabelsDefault: shopLabelsDefault }
    },
    setDefaultSelfDatas (state, payload) {
      let selfLabelsDefault = deepCopy(state.selfLabels);
      return {...state, selfLabelsDefault: selfLabelsDefault}
    },
  }
}
