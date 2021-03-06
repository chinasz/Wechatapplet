//site.js
const app = getApp();
Page({
  data: { 
    region: ["请", "选", "择"], 
  },
  changeRegin(e){ 
    app.globalData.selectInfo.region = e.detail.value;
    app.globalData.selectInfo.province = e.detail.value[0];
    app.globalData.selectInfo.city = e.detail.value[1];
    app.globalData.selectInfo.county = e.detail.value[2];
    this.setData({ region: e.detail.value });
  }, 
  goIndex:function(e){
    if(!app.globalData.selectInfo.region){
      app.util.message('请选择地区','','error');
    } else if (e.detail.encryptedData && e.detail.iv){
      var data = app.globalData.selectInfo;
      data.encryptedData = e.detail.encryptedData;
      data.iv = e.detail.iv;
      delete data.region;

      wx.showLoading({
        title:'请稍后...',
        mask:true
      });

      app.util.request({
        url:"entry/wxapp/perfect",
        data: data,
        method: 'post',
        success:function(res){
          console.log(res);
          if(res.data.errno == 0){
            wx.reLaunch({
              url: '../activity/activity'
            })
            wx.hideLoading();
          }
        }
      })
    }
  },
  onLoad: function () {
    
  }
})
