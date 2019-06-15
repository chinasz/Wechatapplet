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
        }else{

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