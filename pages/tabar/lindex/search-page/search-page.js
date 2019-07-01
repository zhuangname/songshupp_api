Page({
  data: {
    clearbox:true,    //历史搜索记录版块
    value:'',         //input里面的内容
    guanjianciarr:[], //记录搜索关键词
    searchClose:false,//×按钮 hide/show
    productbox:false, //商品的版块 hide / show
  },
  onLoad(){
    var guanjianciarr = wx.getStorageSync("guanjianciarr"); //初始化取出缓存中的搜索记录数组
    //如果没有的话就初始化一个空数组到缓存，否则就直接更新视图层
    if (!guanjianciarr) { wx.setStorageSync('guanjianciarr', []); } else { this.setData({ guanjianciarr: guanjianciarr})}
  },
  //input的监听
  searchInputChange(e){
    var a = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    console.log(a)
    if(e.detail.value){
      this.setData({ searchClose: true, });
    }else{
      this.setData({ searchClose: false, productbox: false, clearbox:true }); 
      //搜索记录显示
    }
    this.setData({
      value: a
    })
  },
  //input获取焦点
  searchInputfocus(e){
    console.log(e)
    if(!e.detail.value){
      this.setData({ clearbox: true, searchClose: false, productbox: false, })
    }
  },
  //点击×按钮
  clearinput(e){
    this.setData({value:''});
  },
  //点击搜索
  searchfunc(e){
    var that = this;
    if(this.data.value == ""){
      wx.showToast({
        title: '商品名称不能为空!',
        icon:'none'
      })
    }else{
      console.log("请求");
      // if (true){
      //   this.setData({ clearbox: !this.data.clearbox, productbox: !this.data.productbox })
      // }
      //如果请求没数据就展示未找到您想要的商品版块  //搜索记录版块隐藏  //商品数据版块隐藏
      //否则就展示商品的数据                      //搜索记录版块隐藏  //未找到您想要的商品版块隐藏
      console.log("记录搜索词")
      if (this.data.guanjianciarr.join(",").indexOf(this.data.value) == -1){
        console.log("添加");
        this.data.guanjianciarr.push(this.data.value);              //把input值添加到搜索记录数组中
        wx.setStorageSync('guanjianciarr', this.data.guanjianciarr);//在更新缓存中的数组
        this.setData({                                              //在更细视图层
          guanjianciarr: this.data.guanjianciarr
        })
      }else{
        console.log("已经有了")
      }
    }
  },

  //点击清空历史记录
  clearlistfunc(){
    wx.clearStorage();    //清楚缓存中的搜索记录数组
    this.setData({guanjianciarr:[]});//覆盖视图层的搜索记录数组 初始化为空数组
    wx.setStorageSync('guanjianciarr', this.data.guanjianciarr);  //在添加到缓存更新
  },

  //点击记录的数据
  guanjiancifunc(e){
    var e = e.currentTarget.dataset.item;
    this.setData({ value: e, searchClose:true });
    console.log("请求");  //这里请求成功后在把值给到value身上
  }
})
