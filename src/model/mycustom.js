import {fetchPosts} from "components/common/fetch"

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
    selfLabelsDefault:[
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
  },
  effects: {
    *getShopLabels (action, {put, call}) {
      yield put({type: 'setLoading', loading: true})

      let shopLabels = yield call(() => {
          return fetch("http://127.0.0.1/getshops.json", {
                  method: "POST",
                  mode: 'no-cors'
              })
              .then((res) => {
                  return res.json();
              })
              .then((data) => {
                  return data;
              }).catch(err => ([
                {
                  "tag_detail_id": 1,
                  "name": "白富美",
                  "icon" : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3199434975,3493096457&fm=111&gp=0.jpg",
                  "count": 10000,
                  "check": true
                }
              ]))
      })

      yield put({
        type: 'getShopLabelsRes',
        loading: false,
        shopLabels: shopLabels,
        shopLabelsDefault: shopLabels
      });
    },
    *saveLabels (action, {put, call}){
      yield put({type: 'setLoading', loading: true})

      let results = yield call(() => {
          return fetchPosts("http://127.0.0.1/getshops.json",{ tagDetailIds: action.tagDetailIds },"POST")
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
      let newShopLabels = state.shopLabels.slice(0);
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
      let newSelfLabels = state.selfLabels.slice(0);
      newSelfLabels[index].check = check;
      return {
        ...state,
        selfLabels: newSelfLabels
      }
    },
  }
}
