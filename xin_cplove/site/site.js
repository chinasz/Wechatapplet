//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  data: { 
  countryList: ['中国','美国','英国','日本','韩国','巴西','德国'], countryIndex: 6, 
  region: ["请", "选", "择"], 
  multiArray: [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]], multiIndex: [3,5], 
  multiArray3: [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]], multiIndex3: [3, 5, 4] },
  changeCountry(e) { this.setData({ countryIndex: e.detail.value }); }, 
  changeRegin(e){ this.setData({ region: e.detail.value }); }, 
  changeMultiPicker(e) { this.setData({multiIndex: e.detail.value}) },
  changeMultiPicker3(e) { this.setData({ multiIndex3: e.detail.value }) },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('site') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
