import {fetchPosts} from "components/common/fetch"

export default {
  namespace: 'hotgoods',
  state: {
    loading: true,
    loadingInit: false,
    swiperActive: 0,
    tabActive: 0,
    goodsStuffs: [
      {
        "id": 1001,
        "name": "御泥坊玫瑰滋养矿物洁面乳2只装",
        "img_url": "http://www.swiper.com.cn/demo/img/fade1.jpg",
        "link_url": "http://linkurl",
        "price": "65.00",
        "rebate_value": "100",
        "source": "tmall",
        "sale_count": ""
      }
    ],
    goodsTabs:[
      {
        "type":"a",
        "text":"精选"
      },
      {
        "type":"a",
        "text":"酒水"
      },
      {
        "type":"a",
        "text":"家具"
      },
      {
        "type":"a",
        "text":"家纺"
      }
    ],
    goodsSwipers: [
      {
        href: "11111",
        src: "http://www.swiper.com.cn/demo/img/fade1.jpg"
      }
    ]
  },
  effects: {
    *getGoodsInitData(action, {put, call}) {
      yield put({type: 'setLoading', loading: true})

      let goodsClass = yield call(() => {
        return fetchPosts("api/goodsClass.json",{  },"GET")
          .then(data => data.data)
          .catch(err => ([
            {
                "id":27,
                "name":"全部1"
            }
          ]))
      })

      let banners = yield call(() => {
        return fetchPosts("api/banner.json",{ locationId: 23 },"GET")
          .then(data => data.data)
          .catch(err => ([
            {
              "name": "banner1",
              "img_url": "http://www.easyicon.net/banner1.jpg",
              "link_url": "http://qbao.com/stuff/xxx/index.html",
            }
          ]))
      })

      let stuffs = yield call(() => {
        return fetchPosts("api/stuff.json",{ locationId: 22 },"GET")
          .then(data => data.data)
          .catch(err => ([]))
      })

      yield put({
        type: 'setGoodsTabs',
        loading: false,
        loadingInit: true,
        goodsStuffs: stuffs,
        goodsTabs: goodsClass,
        goodsSwipers: banners
      });
    },
  },
  reducers: {
    setLoading (state, payload) {
      return {...state, ...payload}
    },

    setGoodsTabs (state, payload) {
      return {...state, ...payload}
    },


    swiperAct(state, { active }) {
      return { ...state, swiperActive: active };
    },
    tabAct(state, { active }) {
      return { ...state, tabActive: active };
    }
  }
}
