//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('tone') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
