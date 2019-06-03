const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  go: function () {
    wx.redirectTo({
      url: '../answer/answer',
    })
  },
  go1: function () {
    wx.redirectTo({
      url: '../romance/romance',
    })
  },
  go2: function () {
    wx.redirectTo({
      url: '../appearance/appearance',
    })
  },
  go3: function () {
    wx.redirectTo({
      url: '../grow/grow',
    })
  },
  go4: function () {
    wx.redirectTo({
      url: '../future/future',
    })
  },
  go5: function () {
    wx.redirectTo({
      url: '../once/once',
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('mindful') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})