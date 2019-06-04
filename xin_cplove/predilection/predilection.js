const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  go: function () {
    wx.redirectTo({
      url: '../advanced/advanced',
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('predilection') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})