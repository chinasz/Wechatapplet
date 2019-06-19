//predilection.js
const app = getApp();
Page({
  data: {
    setting:{},
    submit:false,
  },
  pairCity:function(e){
    this.data.setting.city = e.detail.value;
    this.setData({
      setting: this.data.setting,
      submit:true
    })
  },
  pairSex: function (e) {
    this.data.setting.sex = e.detail.value;
    this.setData({
      setting: this.data.setting,
      submit: true
    })
  },
  pairAge:function(e){
    this.data.setting.age_min = e.detail[0];
    this.data.setting.age_max = e.detail[1];
    this.setData({
      setting: this.data.setting,
      submit: true
    })
  },
  downlike:function(e){
    this.data.setting.downlike = e.detail.value == true ? 1 :0;
    this.setData({
      setting: this.data.setting,
      submit: true
    })
  },
  go: function () {
    wx.navigateTo({
      url: '../advanced/advanced',
    })
  },
  onLoad: function () {
    var that = this;
    that.setData({
      submit:false
    })
    app.util.request({
      url:"entry/wxapp/pair_setting",
      data:{},
      method:"post",
      cachetime:3,
      success:function(res){
        that.setData({
          setting:res.data.data
        })

      }

    })
  },
  onUnload:function(){
    if(this.data.submit){
      app.util.request({
        url:"entry/wxapp/pair_setting_update",
        data: this.data.setting,
        method:"post",
        success:function(res){
          console.log(res);
        }
      })
    }
  }
})