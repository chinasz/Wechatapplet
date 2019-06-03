const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
  },
  data: {
    imgUrls: [
      '../image/1.png',
      '../image/2.png'
    ],
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true,      // 是否自动切换
    circular: true,      // 是否采用衔接滑动
    interval: 3000,      // 自动切换时间间隔
    duration: 1000,      // 滑动动画时长
  },
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  onLoad: function (options) {
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('experience') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})