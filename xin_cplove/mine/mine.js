//mine.js
const app = getApp();
Page({
  data: {
    member:null
  },
  redirect:(e)=>{
    wx.navigateTo({
      url: ''+e.currentTarget.dataset.url,
    })
  },
  memberDetail:function(e){
    var that = this;
    app.util.request({
      url:'entry/wxapp/getuserinfo',
      method:'post',
      data:{},
      success:function(res){  
        wx.setStorageSync('currentMember', res.data.data); 
        that.setData({
          member: res.data.data
        })
      }
    })
  },
  onLoad: function () {
    this.memberDetail();
  },
  onShow:function(){
    var that = this;
  }
})
