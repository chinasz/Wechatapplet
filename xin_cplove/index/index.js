//index.js
const app = getApp();
Page({
  data: {},
  bindGetUserInfo:()=>{
    app.util.user((res)=>{
      app.util.request({
        url: 'entry/wxapp/login',
        method: 'post',
        data: { uid: res.memberInfo.uid},
        success: function (res) {
          app.globalData.hasuser = true;
          wx.navigateTo({
            url: '../logs/logs',
          })
        }
      })
    });
  },
  onLoad: function () {
    
  }
})
