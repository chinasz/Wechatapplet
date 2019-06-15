//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  data: {
    animationData1: "",
    animationData2: "",
    animationStatus: false
  },
  onLoad: function (options) {
    this.setData({
      logs: (wx.getStorageSync('tone') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  animationFun: function (animationData) {
    if (!this.data.animationStatus) {
      return
    }
    var animation = wx.createAnimation({
      duration: 1000
    })
    animation.opacity(0).scale(2, 2).step();
    this.setData({
      [`${animationData}`]: animation.export()
    })
  },
  animationEnd: function (animationData) {
    var animation = wx.createAnimation({
      duration: 0
    })
    animation.opacity(1).scale(1, 1).step();
    this.setData({
      [`${animationData}`]: animation.export()
    })
    
  },
  recodeEnd: function () {
    //动画1结束
    var animation1 = wx.createAnimation({
      duration: 0
    })
    animation1.opacity(1).scale(1, 1).step();
    //动画2结束
    var animation2 = wx.createAnimation({
      duration: 0
    })
    animation2.opacity(1).scale(1, 1).step();
    this.setData({
      animationData1: animation1.export(),
      animationData2: animation2.export(),
      animationStatus: false
    })
    wx.stopRecord({

    })
  },
  recodeClick: function () {
    this.setData({
      animationStatus: true
    })
    this.animationFun('animationData1')
    setTimeout(() => {
      this.animationFun('animationData2')
    }, 500)
    setTimeout(() => {
      this.animationRest()
    }, 1000)
    wx.startRecord({

    })
    
    
  },
  animationRest: function () {
    //动画重置
    this.animationEnd('animationData1')
    setTimeout(() => {
      this.animationEnd('animationData2')
    }, 500)
    setTimeout(() => {
      if (this.data.animationStatus) {
        this.recodeClick()
      }
    }, 100)
    

  },

})
