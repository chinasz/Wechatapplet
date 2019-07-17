//activity.js
const app = getApp();
Page({
  data: {
    prefect:null,
    time:'00:00:00',
    mutual:null,
    heart:null,
    opimg:null,
    inter:null,
  },
  screen:function(e){
    wx.navigateTo({
      url: '../predilection/predilection',
    })
  },
  timeup:function(){
    var that = this;
    var time = that.data.prefect.time;
    var hours = parseInt(time / (60*60));
    var minutes = parseInt(time % (60 * 60) / 60);
    var sencods = parseInt(time % (60));
    time--;
    that.setData({
      prefect:{time:time},
      time:hours+':'+minutes+':'+sencods
    })
    if(time <= 0){
      clearInterval(that.data.inter);
      that.setData({
        time: '00:00:00',
      })
      that.pair()
    }
  },
  go: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },  
  attract:function(e){
    //操作
    var op = e.currentTarget.dataset.op;
    var that = this;
    app.util.request({
      url:'entry/wxapp/pair_choice',
      data: { id: that.data.prefect.member_id,op:op},
      method:'post',
      success:function(res){
        if(res.data.errno == 0){
          that.pair();
        }

      }
    })
  },
  pair:function(){
    //匹配
    var that = this;
    app.util.request({
      url: "entry/wxapp/pair",
      data: {},
      method: "post",
      success: function (res) {
        if(res.data.errno == 0){
          that.setData({
            prefect: res.data.data.pair,
            mutual: res.data.data.mutual,
            heart:res.data.data.heart,
            opimg: res.data.data.pair_img,
          })
          if (res.data.data.pair && res.data.data.pair.time > 0) {
            var inter = setInterval(that.timeup, 1000)
            that.setData({
              inter: inter
            })  
          }
        }
      }
    })
  },
  flush:function(){
    //立即刷新
    var that = this;
    app.util.request({
      url:'entry/wxapp/flushpair',
      method:'post',
      success:function(res){
        if(res.data.errno == 0){
          if(res.data.data.result){
            clearInterval(that.data.inter)
            that.pair();
          }else{
            wx.showToast({
              title: ''+res.data.data.msg,
              icon:'none',
            })
          }

          if (res.data.data.redirect) {
            wx.navigateTo({
              url: '' + res.data.data.redirect,
            })
          }
        }
      }
    })
  },
  onShow:function(){
    this.pair();
  }
})