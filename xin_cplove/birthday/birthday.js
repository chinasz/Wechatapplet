//birthday.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  data: {
    dates: '请选择>',
    times: '12:00',
    objectArray: ['中国', '英国', '美国'],
    index: 0,
  },
  bindTimeChange: function (e) {
    console.log("谁哦按")
    this.setData({
      times: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('birthday') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})