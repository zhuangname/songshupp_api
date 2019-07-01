// pages/my/my.js
Page({

  data: {
    function: [
      { img: '', name: '团长招募', url: '' },
      { img: '', name: '供应商招募', url: '' },
      { img: '', name: '代理商招募', url: '' },
      { img: '', name: '联系客服', url: '' },
      { img: '', name: '常见问题', url: '' },
      { img: '', name: '资质规则', url: '' },
    ],
    layer: false,//控制遮罩层
    overflow: '',
  },
  onReady: function (e) {
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo
      })
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'none',
        duration: 2000,
      })
    }
  },

  getinfoFunc: function (e) {
    this.setData({
      userInfo: e.detail.userInfo
    });
    wx.setStorageSync('userInfo', e.detail.userInfo)
  },

  //使用提货码
  Usecode() {
    this.setData({
      layer: true,
      overflow: 'overflow:hidden'
    })
  },
  //点击遮罩层
  CloseLayer() {
    this.setData({
      layer: false,
      overflow: ''
    })
  },

  //点击订单
  OrderItem(e) {
    wx.navigateTo({
      url: 'my-order/my-order?current=' + e.currentTarget.id,
    })
  },

  //售后
  AfterSale(res) {
    wx.navigateTo({
      url: 'shouhou/shouhou',
    })
  },

  //拆分提货码
  tihuoarr() {

  }

})