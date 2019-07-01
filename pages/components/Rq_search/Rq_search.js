
const app = getApp();
Page({
  data: {
    cityName:'',
  },
  onLoad(options){
    console.log(options)
    this.setData({ cityName: options.cityName })
  },
  gocityPage(){
    wx.navigateTo({ url: '../../city/city?delta=2' })
  },
  
})