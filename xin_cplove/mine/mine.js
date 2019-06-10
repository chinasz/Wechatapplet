//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  go:function(){

    wx.navigateTo({
      url: '../material/material',
    })
  },
  go1: function () {
    wx.navigateTo({
      url: '../tone/tone',
    })
  },
  go2: function () {
    wx.navigateTo({
      url: '../label/label',
    })
  },
  go3: function () {
    wx.navigateTo({
      url: '../mindful/mindful',
    })
  },
  go4: function () {
    wx.navigateTo({
      url: '../predilection/predilection',
    })
  },
  go5: function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  go6: function () {
    wx.navigateTo({
      url: '../experience/experience',
    })
  },
  go7: function () {
    wx.navigateTo({
      url: '../personage/personage',
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
