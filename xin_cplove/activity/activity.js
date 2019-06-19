//activity.js
const app = getApp();
Page({
  data: {
    prefect:null,
    time:'00:00:00',
  },
  screen:function(e){
    wx.navigateTo({
      url: '../predilection/predilection',
    })
  },
  timeup:function(){
    var that = this;
    var time = that.data.prefect.time;
    var hours = parseInt(time / (60*60));
    var minutes = parseInt(time % (60 * 60) / 60);
    var sencods = parseInt(time % (60));
    time--;
    that.setData({
      prefect:{time:time},
      time:hours+':'+minutes+':'+sencods
    })
    if(time == 0){
      clearInterval(Inter);
    }
  },
  go: function () {
    wx.navigateTo({
      url: '../heartbeat/heartbeat',
    })
  },  
  attract:function(e){
    var that = this;
    app.util.request({
      url:'entry/wxapp/pair_choice',
      data: { id: that.data.prefect.member_id},
      method:'post',
      success:function(res){
        if(res.data.errno == 0){
          that.pair();
        }

      }
    })
  },
  pair:function(){
    var that = this;
    app.util.request({
      url: "entry/wxapp/pair",
      data: {},
      method: "post",
      success: function (res) {
        if(res.data.errno == 0){
          that.setData({
            prefect: res.data.data,
          })
          if (res.data.data.time) {
            let Inter = setInterval(that.timeup, 1000);
          }
        }
      }
    })
  },
  onLoad: function (options) {
    this.pair();
   
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})