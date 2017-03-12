export default {
    namespace: 'selfsupport',
    state: {
        loading: true,
        swiperActive: 0,
        tabActive: 0,
        tabs:[
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
        swipers: [
          {
            href:"11111",
            src:"http://www.swiper.com.cn/demo/img/largeNature1.jpg"
          },
          {
            href:"22222",
            src:"http://www.swiper.com.cn/demo/img/largeNature1.jpg"
          },
          {
            href:"11111",
            src:"http://www.swiper.com.cn/demo/img/largeNature1.jpg"
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
