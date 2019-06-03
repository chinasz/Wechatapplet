//birthday.js
const app =getApp();
Page({
  data: {
    dates: '请选择>',
    times: { start: "1970-01-01", end: new app.util.date().dateToStr('yyyy-MM-dd')},
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    app.globalData.selectInfo.birth = e.detail.value;
    this.setData({
      dates: e.detail.value
    })
  },
  selectSite:function(e){
    if (!app.globalData.selectInfo.birth) {
      app.util.message('请选择生日', '', 'error');
    } else {
      wx.navigateTo({
        url: '../site/site',
      })
    }
  },
  onLoad: function () {
    
  }
})