//个人主页.js
const app = getApp()
Page({
  data: {
    uc:null,
    workselect: ['工作党', '学生党'],
  },
  getuc:function(id=0){
    var that = this;
    var data={};
    if(id){
      data.id = id;
    }
    app.util.request({
      url:'entry/wxapp/uc',
      method:'post',
      data:data,
      success:function(res){
        that.setData({
          uc:res.data.data
        })
      }
    })
  },
  go:function(e){
    if(e.currentTarget.dataset.url){
      wx.redirectTo({
        url: '' + e.currentTarget.dataset.url,
      })
    }
  },
  onLoad: function (option) {
    var id = option.id || 0;
    this.getuc(id);
  }
})
