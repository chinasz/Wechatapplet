var app = getApp();
Page({
  data: {
    "daimaisrc": "../image/nanS.png",
    "daimaisrc1": "../image/nvS.png",
    gender:1,
  },


  daimaiClick: function (e) {
    app.globalData.selectInfo.gender = e.currentTarget.dataset.sex;
    if (e.currentTarget.dataset.sex == 1) {
      this.setData({
        daimaisrc: "../image/dianJ1.png",
        daimaisrc1: "../image/nvS.png",
      })
    } else {
      this.setData({
        daimaisrc: "../image/nanS.png",
        daimaisrc1: "../image/dianJ2.png"
      })
    }
  },
  selectDate:function(){
    if (!app.globalData.selectInfo.gender){
      app.util.message('请选择性别！','','error');
    }else{
      wx.navigateTo({
        url: '../birthday/birthday',

      })
    }

  },
  onLoad: function () {
    
  }
})
