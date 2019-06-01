//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  go:function(){
    wx.redirectTo({
      url: '../material/material',
    })
  },
  go1: function () {
    wx.redirectTo({
      url: '../tone/tone',
    })
  },
  go2: function () {
    wx.redirectTo({
      url: '../label/label',
    })
  },
  go3: function () {
    wx.redirectTo({
      url: '../mindful/mindful',
    })
  },
  go4: function () {
    wx.redirectTo({
      url: '../predilection/predilection',
    })
  },
  go5: function () {
    wx.redirectTo({
      url: '../feedback/feedback',
    })
  },
  go6: function () {
    wx.redirectTo({
      url: '../experience/experience',
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('mine') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
