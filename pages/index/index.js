var that;
Page({
  data: {
    shequInfo:false,    //当前社区的信息
    cityName:'广州市',   
  },
  onLoad: function (options) {
    that = this;
    console.log(options);
    if (options.cityName) this.setData({ cityName: options.cityName })  //选择地区后传过来的地区名字

    var back = wx.getStorageSync('back'); //判断状态然后显示哪一个版块
    back ? this.setData({ shequInfo: true }) : this.setData({ shequInfo: false }); 
  },

  picekxiaoqu(){  //点击请输入小区名称
    wx.navigateTo({
      url: '../components/Rq_search/Rq_search?cityName=' + that.data.cityName,
    })
  },
  golindexfunc(){ //跳转到社区首页
    wx.switchTab({url: '../tabar/lindex/lindex'});
  },
  gocityPage(){  //跳转到选择社区
    wx.navigateTo({ url: '../city/city?delta=1'})
  }
})