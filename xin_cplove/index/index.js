//index.js
const app = getApp();
Page({
  data: {flag:true},
  bindGetUserInfo:function(){
    var that =this;
    if (that.data.flag){
      that.setData({
        flag:false,
      })
      app.util.user((res)=>{
        app.util.request({
          url: 'entry/wxapp/login',
          method: 'post',
          data: { uid: res.memberInfo.uid},
          success: function (res) {
            app.globalData.hasuser = true;
            app.globalData.mid = res.data.data.mid;
            if (res.data.data.jump && res.data.data.jump ==1){
              wx.navigateTo({
                url: '../logs/logs',
              })
            }else{
              wx.reLaunch({
                url: '../activity/activity',
              })
            }
            setTimeout(function(){
              that.setData({
                flag: true,
              })
            },3000)
          }
        })
      });
    }
  },
  onLoad: function () {
  }
})
