//heartbeat.js
const app = getApp();
Page({
  data: {
    heartgirl:null,
  },
  go: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }, 
  getheart:function(){
    var that = this;
    app.util.request({
      url:'entry/wxapp/heart',
      data:{},
      method:'post',
      success:function(res){
        that.setData({
          heartgirl:res.data.data
        })
      }
    })
  },
  onLoad: function () {
    this.getheart();
  }
})
