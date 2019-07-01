const app = getApp()
var that;
Page({

  data: {
    navList: [
      { name: '全部', Style: 'active' },
      { name: '待付款', Style: '' },
      { name: '待配送', Style: '' },
      { name: '待提货', Style: '' },
      { name: '已提货', Style: '' },
    ],
    current: '',   //指定在哪个面板
    swiperheight: '',//swiper的高度
    left:'50rpx',        //导航底部的位置
    stopPageScroll:''
  },

  onLoad(options) {
    that = this;
    this.setData({
      current: options.current,
    });
  },

  orderListfun(){ wx.navigateTo({ url: 'order-detail-page/order-detail-page' }) },

  onReady: function (res) {
    this.swiperHeight();
    this.setData({ appLoadingStatue: true, stopPageScroll: 'stopPageScroll'})
    app.request("GET","/api/auth/login",{},
    function(res){
      console.log(res)
      that.setData({
        appLoadingStatue: false,  //请求未完成的loding
        stopPageScroll: '',
        network500: false
      })
    },this.error)
  },

  connectfunc(){
    this.selectComponent('#network-500').connectfunc(this.onReady)
  },

  swiperHeight() {
    var PhoneHeight = app.globalData.PhoneHeight
    var swiperheight = PhoneHeight
    this.setData({
      swiperheight
    })
  },

  //点击导航跳转
  navtap: function (e) {
    for (let i in this.data.navList) {
      this.setData({
        ['navList[' + i + '].Style']: '',
        ['navList[' + e.currentTarget.id + '].Style']: 'active',
        current: e.currentTarget.id,
      });
    };
    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.selectAll('.every').boundingClientRect(function (rect) {
      that.setData({
        left: e.currentTarget.offsetLeft + (rect[e.currentTarget.id].width / 3) + "px"
      })
    }).exec();
  },
  //滑动跳转
  swiperChange: function (e) {   //拖动swiper监听
    for (let i in this.data.navList) {
      this.setData({
        ['navList[' + i + '].Style']: '',
        ['navList[' + e.detail.current + '].Style']: 'active'
      });
    };

    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.selectAll('.every').boundingClientRect(function (rect) {
      that.setData({
        left: rect[e.detail.current].left + (rect[e.detail.current].width / 3) + "px"
      })
    }).exec();
  },

  stopPageScroll(){return},
  
  error(err){
    this.setData({
      appLoadingStatue: false,
      network500: true
    })
  }

})