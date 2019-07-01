const app = getApp();
var tabHeight;
var that;
Page({
  data: {
    navList:[
      { "name": '全部商品1', "activeClass": 'activeClass' },
      { "name": '特价秒杀', "activeClass": '' },
      { "name": '甄选鲜果', "activeClass": '' },
      { "name": '营养蔬菜', "activeClass": '' },
      { "name": '肉蛋熟食', "activeClass": '' },
      { "name": '水产海鲜', "activeClass": '' },
      { "name": '粮油调味', "activeClass": '' },
      { "name": '甄选鲜果', "activeClass": '' },
      { "name": '营养蔬菜', "activeClass": '' },
      { "name": '肉蛋熟食', "activeClass": '' },
      { "name": '水产海鲜', "activeClass": '' },
    ],
    navList2: [
      { "name": '全部商品2', "activeClass": 'activeClass' },
      { "name": '特价秒杀', "activeClass": '' },
      { "name": '甄选鲜果', "activeClass": '' },
      { "name": '营养蔬菜', "activeClass": '' },
      { "name": '肉蛋熟食', "activeClass": '' },
      { "name": '水产海鲜', "activeClass": '' },
      { "name": '粮油调味', "activeClass": '' },
      { "name": '甄选鲜果', "activeClass": '' },
      { "name": '营养蔬菜', "activeClass": '' },
      { "name": '肉蛋熟食', "activeClass": '' },
    ],
    scrollnumber1:'',         //scroll位置
    scrollnumber2: '',       //scroll位置
    left:'',         //跟踪条
    left2:'',        //跟踪条
    end_date:true,        //距结束时间hide/show
    tab1:false,            //版块一
    tab2:true,           //版块二
    qianggou:"qianggou",  //切换的class
    kaiqiang:"kaiqiang",  //切换的class
    scrollviewClass:'',   //scrollview样式
    scrollviewheight:'',
    scrollTop:0,         //当前滚动条的位置
    scrollTop2: (260 * 2) / app.globalData.bili,
    tabClass:"",         //tab模块的样式
    navborderWidth:'',
    navborderWidth2:''
  },
  onLoad(){
    var query = wx.createSelectorQuery();
    //选择id
    that = this;
    query.selectAll('.every').boundingClientRect(function (rect) {
      that.setData({
        navborderWidth: rect[0].width / 2 + "px",
        navborderWidth2: rect[0].width / 2 + "px",
        left: rect[0].left + (rect[0].width / 4) + "px",
        left2: rect[0].left + (rect[0].width / 4) + "px"
      })
    }).exec();
  },
  onReady(){
    wx.createIntersectionObserver().relativeToViewport({ bottom: 0 }).observe('.tab', (ret) => {
      if (ret.intersectionRatio <= 0){
        var query = wx.createSelectorQuery();
        query.selectAll('.tab,.scrollClass').boundingClientRect(function (rect) {
          var HEIGHT = 0;
          for (let item of rect) {
            HEIGHT += item.height;
          }
          that.setData({
            scrollviewClass: 'scrollviewClass',
            scrollviewheight: 'height:' + ((HEIGHT + 25) * 2) / app.globalData.bili + 'px;',
            tabClass: "tabClass"
          });
        }).exec();
      }
      console.log(ret);
    })
    wx.createIntersectionObserver().relativeToViewport({ top: -45 }).observe('.scrollviewheightClass', (ret) => {
      if (ret.intersectionRatio > 0) {
        this.setData({ scrollviewClass: '', scrollviewheight: 'height:0px;', tabClass: '' });
      }
      console.log(ret);
    })
  },
  navFunc(e){   //版块一 正在抢购导航事件
    if (this.data.scrollTop > (260 * 2) / app.globalData.bili) wx.pageScrollTo({ scrollTop: (260 * 2) / app.globalData.bili, duration:0 })
    var navList = this.data.navList;
    var index = e.currentTarget.dataset.index;
    for (let i in navList){
      navList[i].activeClass = "";
      navList[index].activeClass = "activeClass"
    };
    this.setData({ 
      navList: navList, 
      scrollnumber1: e.currentTarget.offsetLeft - 150, 
    });

    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.selectAll('.every').boundingClientRect(function (rect) {
      that.setData({
        navborderWidth: rect[index].width / 2 + "px",
        left: e.currentTarget.offsetLeft + (rect[index].width / 4) + "px"
      })
    }).exec();
  },
  navFunc2(e){  //版块二 即将开抢导航事件
    if (this.data.scrollTop > (260*2) / app.globalData.bili) wx.pageScrollTo({ scrollTop: (260*2) / app.globalData.bili })
    var navList2 = this.data.navList2;
    var index = e.currentTarget.dataset.index;
    for (let i in navList2) {
      navList2[i].activeClass = "";
      navList2[index].activeClass = "activeClass"
    };
    this.setData({
      navList2: navList2,
      scrollnumber2: e.currentTarget.offsetLeft - 150,
    });

    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.selectAll('.every2').boundingClientRect(function (rect) {
      that.setData({
        navborderWidth2: rect[index].width / 2 + "px",
        left2: e.currentTarget.offsetLeft + (rect[index].width / 4) + "px"
      })
    }).exec();
  },

//切换版块
  tabtypefunc(e){             
    var e = e.currentTarget.dataset.type;
    if (e == "正在抢购"){
      this.setData({
        end_date:true,
        qianggou: "qianggou",
        kaiqiang: "kaiqiang",
        tab1:false,
        tab2:true
      })
    }else{
      this.setData({
        end_date: false,
        qianggou: "kaiqiang",
        kaiqiang: "qianggou",
        tab1: true,
        tab2: false
      })
    }
  },
  

  //进入详情
  goproductDetailfunc(){
    wx.navigateTo({
      url: 'product-detail-page/product-detail-page',
    })
  },
  
  //点击左上角社区名称
  backshequListfunc(){
    wx.setStorageSync('back','back');   // 当前已经选中了社区了。
    wx.navigateTo({
      url: '../../index/index',
    })
  },


  //滚动条监听
  onPageScroll(e){
    // var that = this;
    // var query = wx.createSelectorQuery();
    // var scrollTop2 = this.data.scrollTop;
    // this.setData({scrollTop : e.scrollTop});
    // if (e.scrollTop >= (262 * 2) / app.globalData.bili){
    //   query.selectAll('.tab,.scrollClass').boundingClientRect(function (rect) {
    //     var HEIGHT = 0;
    //     for (let item of rect) {
    //       HEIGHT += item.height;
    //     }
    //     that.setData({
    //       scrollviewClass: 'scrollviewClass',
    //       scrollviewheight: 'height:' + ((HEIGHT + 25) * 2) / app.globalData.bili + 'px;',
    //       tabClass: "tabClass"
    //     });
    //   }).exec();
    //   if (scrollTop2 > this.data.scrollTop){
    //     query.selectAll('.tab,.scrollClass').boundingClientRect(function (rect) {
    //       that.setData({
    //         tabstyle: 'top:0rpx;',
    //         scrollviewStyle: "top:" + (rect[0].height * 2) / app.globalData.bili + "px; transition: all .2s"
    //       })
    //       tabHeight = rect[0].height;
    //     }).exec();
    //   }else{
    //     query.selectAll('.tab,.scrollClass').boundingClientRect(function (rect) {
    //       var HEIGHT = 0;
    //       for (let item of rect) {
    //         HEIGHT += item.height;
    //       }
    //       that.setData({
    //         tabstyle: "-top:" + (HEIGHT * 2) / app.globalData.bili + "px;",
    //         scrollviewStyle: "top:0rpx;"
    //       })
    //     }).exec();
    //   }
    // } else if (e.scrollTop <= ((262 - tabHeight) * 2) / app.globalData.bili){
    //   this.setData({ scrollviewClass: '', scrollviewheight: 'height:0px;', tabClass:'' });
    // }
  },

  
  onPullDownRefresh(){
    console.log("下拉");
    setTimeout(()=>{
      console.log('停止下拉');
      wx.stopPullDownRefresh(); //停止下拉
    },1000)
  },
})