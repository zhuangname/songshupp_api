// pages/commodity-detail/comment/comment.js
Page({

  data: {

  },

  onReady(){
    var that = this
    that.data.ID = setInterval(function(){
      that.start('2019-04-15 22:30:00')
    },1000)
    
  },

  start(time) {
    var leftTime1 = new Date(time);
    var leftTime2 = new Date().getTime();

    let newdata = leftTime1.getTime();
    let olddata2 = time.replace(/-/g, '/');
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
})