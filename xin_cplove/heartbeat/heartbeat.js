//heartbeat.js
const app = getApp();
Page({
  data: {
    heartgirl:null,
  },
  getheart:function(){
    var that = this;
    app.util.request({
      url:'entry/wxapp/heart',
      data:{},
      method:'post',
      cachetime:30,
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
