Page({
  data: {
    familiar:null
  },
  onLoad: function (options) {
    this.setData({
      familiar:JSON.parse(options.param)
    })
  },
  onShow: function (options) {

  },
})