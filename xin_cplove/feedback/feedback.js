/* 帮助与反馈 */
const app = getApp();
Page({
  data: {
    
  },
  go: function (e) {
    wx.navigateTo({
      url: ''+e.currentTarget.dataset.url,
    })
  },
  onLoad: function () {
  }
})