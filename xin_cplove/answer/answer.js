const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },

  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('answer') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})