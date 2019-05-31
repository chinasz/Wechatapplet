//index.js
const app = getApp();
Page({
  data: {},
  bindGetUserInfo:()=>{
    // app.util.user((res)=>{
    //   console.log(res);
    //   app.util.request({
    //     url: 'entry/wxapp/login',
    //     method: 'post',
    //     data: { uid: res.memberInfo.uid},
    //     success: function (res) {
    //       console.log(res);
    //     }
    //   })
    // });
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad: function () {
    
    var a = wx.getStorageSync('userInfo');
    console.log(a);
  }
})
