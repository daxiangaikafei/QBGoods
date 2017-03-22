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

    ],
    selfTipShow: false,
    selfTipNum: 0,
    selfLabels:[

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
          .catch(err => ([
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"}
           ]))
      })

      let selfLabels = yield call(() => {
        return fetchPosts("/stuff/custom/getUserTags.do",{ userId: 10001, typeId: 2 },"GET")
          .then(data => data.data.items)
          .catch(err => ([
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: false, tagDetailId: 1, icon: "http://", count: 10000, name: "白富美"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"},
            {check: true, tagDetailId: 2, icon: "http://", count: 32423, name: "高富帅"},
            {check: true, tagDetailId: 3, icon: "http://", count: 46543, name: "屌丝"}
          ]))
      })

      let shopTotal = 0;
      shopLabels.map(function(n,i){
        if(n.check){
          shopTotal += n.count;
        }
      });

      let selfTotal = 0;
      selfLabels.map(function(n,i){
        if(n.check){
          selfTotal += n.count;
        }
      });

      yield put({
        type: 'getShopLabelsRes',
        loading: false,
        shopLabels: shopLabels,
        shopLabelsDefault: deepCopy(shopLabels),
        shopTipShow: !!shopTotal,
        shopTipNum: shopTotal,
        selfLabels: selfLabels,
        selfLabelsDefault: deepCopy(selfLabels),
        selfTipShow: !!selfTotal,
        selfTipNum: selfTotal,
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
      return { ...state,
         tabActive: active,
         shopTipShow: (active === "shop"),
         selfTipShow: (active === "self")
      };
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
        shopTipShow: !!shopTotal,
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
        selfTipShow: !!shopTotal,
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

    setNowShopDatas (state, payload) {
      let shopLabelsNow = deepCopy(state.shopLabelsDefault);
      let shopTotal = 0;
      shopLabelsNow.map(function(n,i){
        if(n.check){
          shopTotal += n.count;
        }
      });
      return {...state, shopLabels: shopLabelsNow,
          shopTipNum: shopTotal
       }
    },
    setNowSelfDatas (state, payload) {
      let selfLabelsNow = deepCopy(state.selfLabelsDefault);
      let shopTotal = 0;
      selfLabelsNow.map(function(n,i){
        if(n.check){
          shopTotal += n.count;
        }
      });
      return {...state, selfLabels: selfLabelsNow,
          selfTipNum: shopTotal
      }
    },
  }
}
