const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  data: {
    hiddenmodalput1: true
  },  
  modalinput1: function () {
    this.setData({
      hiddenmodalput1: !this.data.hiddenmodalput1
    })
  },
  cancel1: function () {
    this.setData({
      hiddenmodalput1: true
    });
  },
  confirm1: function () {
    this.setData({
      hiddenmodalput1: true
    })
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