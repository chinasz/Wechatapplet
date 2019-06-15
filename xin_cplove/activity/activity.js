//logs.js
const util = require('../../utils/util.js');
let goodsList = [
  { actEndTime: '2020-05-01 10:00:43' }
  ]



Page({
  data: {
    countDownList: [], 
    actEndTimeList: []
  },
  go: function () {
    wx.navigateTo({
      url: '../heartbeat/heartbeat',
    })
  },
  go1: function () {
    wx.navigateTo({
      url: '../predilection/predilection',
    })
  },
  onLoad: function () {
    let endTimeList = [];  
    goodsList.forEach(o => {endTimeList.push(o.actEndTime)}) 
    this.setData({ actEndTimeList: endTimeList});
    this.countDown();
  },
  timeFormat(param) { 
    return param < 10 ? '0' + param : param;  
    },
  
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  countDown() {
    let newTime = new Date().getTime(); 
    let endTimeList = this.data.actEndTimeList; 
    let countDownArr = []; endTimeList.forEach(o => {
    let endTime = new Date(o).getTime(); 
    let obj = null; 
    if (endTime - newTime > 0) { 
      let time = (endTime - newTime) / 1000; 
      let day = parseInt(time / (60 * 60 * 24)); 
      let hou = parseInt(time % (60 * 60 * 24) / 3600); 
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60); 
      let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60); 
      obj = { day: this.timeFormat(day), hou: this.timeFormat(hou), 
      min: 
      this.timeFormat(min), sec: this.timeFormat(sec) } } 
      else {obj = {   day: '00',   hou: '00',   min: '00',   sec: '00'  }  }  
      countDownArr.push(obj); })
      this.setData({ countDownList: countDownArr}) 
      setTimeout(this.countDown,1000); },
})