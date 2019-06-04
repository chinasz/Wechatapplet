const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  data: {
    countryList: ['中国', '美国', '英国', '日本', '韩国', '巴西', '德国'], countryIndex: 6,
    region: ["请选择 >"],
    multiArray: [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]], multiIndex: [3, 5],
    multiArray3: [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]], multiIndex3: [3, 5, 4]
  },

  changeCountry(e) { this.setData({ countryIndex: e.detail.value }); },
  changeRegin(e) { this.setData({ region: e.detail.value }); },
  changeMultiPicker(e) { this.setData({ multiIndex: e.detail.value }) },
  changeMultiPicker3(e) { this.setData({ multiIndex3: e.detail.value }) },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('site') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },

  actioncnt1: function () {
    wx.showActionSheet({
      itemList: ['大专', '本科', '985/211'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['工作党', '学生党', '都可以'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('advanced') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})