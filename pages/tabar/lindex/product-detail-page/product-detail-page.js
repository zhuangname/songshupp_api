// pages/commodity-detail/commodity-detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: 9,
    other: [
      { name: '泰国椰皇 【3个 单个约400-500g】', value: '23.80', img: '' },
      { name: '丹东红颜草莓 【1盒约350g】', value: '18.80', img: '' },
      { name: '泰国小菠萝 【1袋 约500g】', value: '15.50', img: '' },
    ],
    scrollTop: 0,//滚动距离
    backTop: false,
    scroll: 500 / app.globalData.bili,
  },

  onLoad() {
    var that = this
    that.data.intervarID = setInterval(function () {
      that.start('2019-04-20 23:00:00')
    }, 1000)
  },


  start(end) {
    var leftTime1 = new Date(end);
    var leftTime2 = new Date().getTime();

    let newdata = leftTime1.getTime();
    let olddata2 = end.replace(/-/g, '/');
    let mydata2 = new Date(olddata2);
    let newdata2 = mydata2.getTime();

    var leftTime = newdata2 - leftTime2; //计算剩余的毫秒数

    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); 
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); 
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);
    var seconds = parseInt(leftTime / 1000 % 60, 10);  
    if (days < 10) {
      days = "0" + days
    }
    if (hours < 10) {
      hours = "0" + hours
    }
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    this.setData({
      hours, minutes, seconds,
      time: hours + ':' + minutes + ':' + seconds
    })
  },

  onPageScroll: function (e) {
    var that = this
    if (e.scrollTop > that.data.scroll) { that.setData({ backTop: true }) }
    else { that.setData({ backTop: false }) }


    if (e.scrollTop < 750 / app.globalData.bili) { that.setData({ baritem: 0 }) }
    else if (e.scrollTop > 750 / app.globalData.bili && e.scrollTop < 900 / app.globalData.bili) { that.setData({ baritem: 1 }) }
    else if (e.scrollTop > 900 / app.globalData.bili && e.scrollTop < 1400 / app.globalData.bili) { that.setData({ baritem: 2 }) }
    else { that.setData({ baritem: 3 }) }
  },


  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

})