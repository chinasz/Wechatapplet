//tone.js
const app = getApp();
const record = require('../../utils/record.js');
Page({
  data: {
    logs: []
  },
  data: {
    animationData1: "",
    animationData2: "",
    animationStatus: false
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
    record.recorderManager.stop();
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
    record.recorderManager.start(record.options);
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
  getau:function(){
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.openSetting({
            success(){

            }
          })
        }
      }
    })
  },
  onLoad:function(){
   
  }
})
