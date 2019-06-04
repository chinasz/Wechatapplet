//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
  },
  go: function () {
    wx.navigateTo({
      url: '../heartbeat/heartbeat',
    })
  },
  go1: function () {
    wx.navigateTo({
      url: '../predilection/predilection',
    })
  },
  onLoad: function (options) {
    
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
