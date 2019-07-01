// //先引用城市数据文件
// var city = require('../../utils/city.js')
// var lineHeight = 0;
// var endWords = "";
// var isNum;
// var that;
// Page({
//   data: {
//     "hidden": true,
//     cityName: "", //获取选中的城市名
//     delta:0,     //返回几层页面
//   },
//   onLoad: function (options) {
//     that = this;
//     console.log(options)

//     if (options.delta) this.setData({ delta: Number(options.delta) });
//   },
//   onReady: function () {
//     // 生命周期函数--监听页面初次渲染完成
//     var cityChild = city.City[0];
//     var that = this;
//     wx.getSystemInfo({
//       success: function (res) {
//         lineHeight = (res.windowHeight - 100) / 22;
//         that.setData({
//           city: cityChild,
//           winHeight: res.windowHeight,
//           lineHeight: lineHeight
//         })
//       }
//     })
//   },
//   onShow: function () {
//     // 生命周期函数--监听页面显示

//   },
//   onHide: function () {
//     // 生命周期函数--监听页面隐藏

//   },
//   onUnload: function () {
//     // 生命周期函数--监听页面卸载

//   },
//   //触发全部开始选择
//   chStart: function () {
//     this.setData({
//       trans: ".3",
//       hidden: false
//     })
//   },
//   //触发结束选择
//   chEnd: function () {
//     this.setData({
//       trans: "0",
//       hidden: true,
//       scrollTopId: this.endWords
//     })
//   },
//   //获取文字信息
//   getWords: function (e) {
//     var id = e.target.id;
//     this.endWords = id;
//     isNum = id;
//     this.setData({
//       showwords: this.endWords
//     })
//   },
//   //设置文字信息
//   setWords: function (e) {
//     var id = e.target.id;
//     this.setData({
//       scrollTopId: id
//     })
//   },

//   // 滑动选择城市
//   chMove: function (e) {
//     var y = e.touches[0].clientY;
//     var offsettop = e.currentTarget.offsetTop;
//     var height = 0;
//     var that = this;
//     ;
//     var cityarr = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
//     // 获取y轴最大值
//     wx.getSystemInfo({
//       success: function (res) {
//         height = res.windowHeight - 10;
//       }
//     });

//     //判断选择区域,只有在选择区才会生效
//     if (y > offsettop && y < height) {
//       // console.log((y-offsettop)/lineHeight)
//       var num = parseInt((y - offsettop) / lineHeight);
//       endWords = cityarr[num];
//       // 这里 把endWords 绑定到this 上，是为了手指离开事件获取值
//       that.endWords = endWords;
//     };


//     //去除重复，为了防止每次移动都赋值 ,这里限制值有变化后才会有赋值操作，
//     //DOTO 这里暂时还有问题，还是比较卡，待优化
//     if (isNum != num) {
//       // console.log(isNum);
//       isNum = num;
//       that.setData({
//         showwords: that.endWords
//       })
//     }
//   },
//   //选择城市，并让选中的值显示在文本框里
//   bindCity: function (e) {
//     console.log(e);
//     var cityName = e.currentTarget.dataset.city;
//     this.setData({ cityName: cityName });

    // //小程序把数据set到上一个页面
    // var pages = getCurrentPages();
    // var currPage = pages[pages.length - 1]; //当前页面
    // var prevPage = pages[pages.length - (that.data.delta+=1)]; //上一个页面
    // console.log(prevPage);
    // console.log(that.data.delta)
    // //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    // prevPage.setData({
    //   cityName: cityName
    // })

    // console.log("调用请求");

    // wx.navigateBack({ delta: that.data.delta-=1 });
//   },

//   //当前位置
//   dangqianweizhi(e){
//     console.log(e)
//   }

// })

import { cities } from './citys';
const { $Toast } = require('../../dist/base/index');
var that;
Page({
  data: {
    cities: [],
    cityName: "", //获取选中的城市名
    delta:0,     //返回几层页面
  },
  onLoad(options){
    that = this;
    console.log(options)

    if (options.delta) this.setData({ delta: Number(options.delta) });
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  onReady() {
    let storeCity = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    cities.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        name: item.name,
        key: firstName
      });
    })
    this.data.cities = storeCity;
    this.setData({
      cities: this.data.cities
    })
  },
  cityValuefun(e) {
    console.log(e.currentTarget.dataset.name)
    this.setData({ cityName: e.currentTarget.dataset.name });

    //小程序把数据set到上一个页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - (that.data.delta += 1)]; //上一个页面
    console.log(prevPage);
    console.log(that.data.delta)
    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      cityName: e.currentTarget.dataset.name
    })

    console.log("调用请求");

    wx.navigateBack({ delta: that.data.delta -= 1 });
    // $Toast({
    //   content: e.currentTarget.dataset.name,
    //   mask: false
    // });
  }
});