//activity.js
const app = getApp();
Page({
  data: {
    prefect:null,
  },
  screen:function(e){
    wx.navigateTo({
      url: '../predilection/predilection',
    })
  },
  go: function () {
    wx.navigateTo({
      url: '../heartbeat/heartbeat',
    })
  },
  attract:function(e){
    var appealed = this.data.prefect[0].member_id;
    

  },
  onLoad: function (options) {
    var that = this;
    app.util.request({
      url:"entry/wxapp/pair",
      data:{},
      method:"post",
      success:function(res){
        that.setData({
          prefect:res.data.data,
        })
      }
    })
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