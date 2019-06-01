var app = getApp();
Page({
  data: {
    logs: []
  },

  data: {

    "daimaisrc": "../image/dianJ1.png",
    "daimaisrc1": "../image/nvS.png",
    cityName: "",
    getChannelByCityId: "",

    carName: "",
    carId: ""
  },


  daimaiClick: function (e) {
    console.log("-------d：" + this.data.daimaisrc);
    if (this.data.daimaisrc == "../image/dianJ1.png") {
      this.setData({
        daimaisrc: "../image/nanS.png",
        daimaisrc1: "../image/dianJ2.png"
      })
    } else {
      this.setData({
        daimaisrc: "../image/dianJ1.png",
        daimaisrc1: "../image/nvS.png"
      })
    }
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
