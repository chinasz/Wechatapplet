const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  go: function () {
    wx.navigateTo({
      url: '../report/report',
    })
  },
  go1: function () {
    wx.navigateTo({
      url: '../opinion/opinion',
    })
  },
  go2: function () {
    wx.navigateTo({
      url: '../familiar/familiar',
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('feedback') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})