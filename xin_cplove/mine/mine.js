//mine.js
const app = getApp();
Page({
  data: {
    member:null,
    meal:null,
  },
  redirect:(e)=>{
    wx.navigateTo({
      url: ''+e.currentTarget.dataset.url,
    })
  },
  cancel:function(){
    //取消报名
    wx.showModal({
      title: '温馨提示',
      content: '取消报名就无法参与系统匹配哦',
      success(res){
        if (res.confirm){
          app.util.request({
            url:'entry/wxapp/cancelentered',
            data:{},
            method:'post',
            success:function(res){
              if(res.data.errno == 0){
                wx.reLaunch({
                  url:'../index/index',
                })
              }
            }
          })
        }
      }
    })
  },
  memberDetail:function(e){
    var that = this;
    app.util.request({
      url:'entry/wxapp/getuserinfo',
      method:'post',
      data:{},
      success:function(res){  
        that.setData({
          member: res.data.data
        })
      }
    })
  },
  getmeal:function(){
    var that = this;
    app.util.request({
      url:'entry/wxapp/ucmeal',
      method:'post',
      success:function(res){
        that.setData({
          meal:res.data.data
        })
      }
    })
  },
  onLoad: function () {
    this.memberDetail();
    this.getmeal();
  },
  onShow:function(){
    var that = this;
  }
})
