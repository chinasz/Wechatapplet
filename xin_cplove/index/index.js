//index.js
const app = getApp();
Page({
  data: {
    flag:true,
    from_id:0,
  },
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
          data: { uid: res.memberInfo.uid,from_id:that.data.from_id},
          success: function (res) {
            if (res.data.errno == 0 && res.data.data.jump && res.data.data.jump ==1){
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
  onLoad: function (options) {
    if(options.id){
      that.setData({
        from_id:options.id,
      })
    }
  }
})
