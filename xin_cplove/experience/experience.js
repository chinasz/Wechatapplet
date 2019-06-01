const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
  },
  data: {
    imgUrls: [
      '../image/1.png',
      '../image/2png'
    ],
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true,      // 是否自动切换
    circular: true,      // 是否采用衔接滑动
    interval: 3000,      // 自动切换时间间隔
    duration: 1000,      // 滑动动画时长
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('experience') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})