
Page({
  data: {
    stopPageScroll:"",
    maskShow:false
  },
  maskShowfun(){
    this.setData({
      stopPageScroll: "stopPageScroll",   
      maskShow:true   
    })
  },
  maskHidefun(){
    this.setData({
      stopPageScroll: "",
      maskShow: false
    })
  },
  stopPageScroll(){return}

})