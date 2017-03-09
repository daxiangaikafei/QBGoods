import {fetchPosts} from "components/common/fetch"

export default {
  namespace: 'hotgoods',
  state: {
    loading: true,
    swiperActive: 0,
    tabActive: 0,
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
        href:"11111",
        src:"http://www.swiper.com.cn/demo/img/fade1.jpg"
      },
      {
        href:"22222",
        src:"http://www.swiper.com.cn/demo/img/fade3.jpg"
      },
      {
        href:"11111",
        src:"http://www.swiper.com.cn/demo/img/fade1.jpg"
      },
      {
        href:"22222",
        src:"http://www.swiper.com.cn/demo/img/fade3.jpg"
      },
      {
        href:"11111",
        src:"http://www.swiper.com.cn/demo/img/fade1.jpg"
      },
      {
        href:"22222",
        src:"http://www.swiper.com.cn/demo/img/fade3.jpg"
      },
      {
        href:"11111",
        src:"http://www.swiper.com.cn/demo/img/fade1.jpg"
      },
      {
        href:"22222",
        src:"http://www.swiper.com.cn/demo/img/fade3.jpg"
      }
    ]
  },
  effects: {

  },
  reducers: {
    swiperAct(state, { active }) {
      return { ...state, swiperActive: active };
    },
    tabAct(state, { active }) {
      return { ...state, tabActive: active };
    }
  }
}
