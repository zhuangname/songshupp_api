Page({
  data: {
    inputnumber:1,  //购物产品购买的数量
    numList: [
      {
        num: "1",
        x: 100
      },
      {
        num: "1",
        x: 100
      },
      {
        num: "1",
        x: 100
      },
    ],
  },
  //去结算
  settlementBtnfunc() {
    wx.navigateTo({
      url: 'Settlement-page/Settlement-page',
    })
  },

  addfunc(){
    this.data.inputnumber++;
    this.setData({ inputnumber:this.data.inputnumber });
  },
  jianfunc(){
    if(this.data.inputnumber == 1){
      wx.showModal({
        title: '删除',
        content: '确定要删除该商品么?',
        success(res) {
          if (res.confirm) {
            console.log("删除购物车该商品，刷新")
          }
        }
      })
    }else{
      this.data.inputnumber--;
      this.setData({ inputnumber: this.data.inputnumber });
    }
  },


  changefunc: function (e) { //手指触摸后移动
    this.setData({
      dangqianweizhi: e.detail.x
    })
  },
  touchendfunc: function (e) { //手指动作后结束 
    console.log('手指动作后结束' + this.data.dangqianweizhi);
    if (this.data.dangqianweizhi <= 45) {
      console.log(3)
      this.setData({
        ['numList[' + e.currentTarget.dataset.index + '].x']: 0
      })
    } else {
      this.setData({
        ['numList[' + e.currentTarget.dataset.index + '].x']: 90
      })
    }
  },
  touchstartfunc: function (e) {
    console.log('手指触摸动作开始' + this.data.numList[e.currentTarget.dataset.index].x)
    for (var i in this.data.numList) {
      if (this.data.numList[i].x == 0) {
        console.log(5)
        this.setData({
          ['numList[' + i + '].x']: 90,
        })
      }
    }
  },
  deleteProduct(){
    console.log("删除");
    for (var i in this.data.numList) {
      this.setData({
        ['numList[' + i + '].x']: 90,
      })
    };
    wx.showModal({
      title: '删除',
      content: '确定要删除该商品么?',
      success(res) {
        if (res.confirm) {
          console.log("删除购物车该商品，刷新")
        }
      }
    })
  },
  goindexfunc(){ wx.switchTab({ url: '../lindex/lindex' }) }, //跳转首页


})