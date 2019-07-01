const { $Message } = require('dist/base/index');
App({
  onLaunch: function () {
    this.getmobile()
  },
  globalData: {
    userInfo: null,
    PhoneHeight: '',
  },
  globalUrl:{
    zxUrl: "https://app.zhiwuxuanlv.com/"
  },
  openId: "",
  request: function (method, Suffix, data, callback, error,) {
    var that = this;
    wx.request({
      method,
      url: that.globalUrl.zxUrl + Suffix,
      data,
      header: {
        // 'content-type': 'application/x-www-form-urlencoded',
        'token': that.openId
        // "Accept": "*/*"
      },
      success: function (res) {
        callback(res);
        if(res.data.code == 500){
          $Message({
            content: res.data.msg,
            type: 'error'
          });;
        }
      },
      fail: function (err) {
        $Message({
          content: '请检查您的手机是否联网!',
          type: 'error'
        });
        error(err);
      }
    })
  },

  getmobile: function (e) {
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        this.globalData.PhoneHeight = res.windowHeight * (750 / res.windowWidth);
        this.globalData.bili = 750 / res.windowWidth;
      },
    })
  },
})