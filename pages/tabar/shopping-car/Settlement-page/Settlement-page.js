Page({
  data: {
    maskShow:false,             //遮罩层show/hide
    showToastboxstyle:"-860rpx;",
    stopPageScroll:""
  },

  //去支付
  gopaymentfunc(e){
    this.setData({
      showToastboxstyle:"bottom:0rpx;",
      maskShow:true,
      stopPageScroll:"stopPageScroll"
    })
  },
  //点击取消  遮罩层
  hideshowToastboxfunc(){
    this.setData({
      showToastboxstyle: "bottom:-860rpx;",
      maskShow: false,
      stopPageScroll:""
    })
  },
  
stopPageScroll(){return}
})