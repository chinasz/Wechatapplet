const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  go: function () {
    wx.redirectTo({
      url: '../report/report',
    })
  },
  go1: function () {
    wx.redirectTo({
      url: '../opinion/opinion',
    })
  },
  go2: function () {
    wx.redirectTo({
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