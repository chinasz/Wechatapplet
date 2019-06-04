const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
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
      logs: (wx.getStorageSync('label') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})