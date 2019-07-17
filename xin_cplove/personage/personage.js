//个人主页.js
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    uc:null,
    workselect: ['工作党', '学生党'],
    id:0,
    audio_status:false,
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
  unlock_we:function(){
    var that = this;
    app.util.request({
      url:'entry/wxapp/unlock_we',
      method: 'post',
      data:{id:that.data.id},
      success:function(res){
        if(res.data.errno == 0){
          if (res.data.data.result === true){
            that.data.uc.member_wenum = res.data.data.we;
            that.setData({
              uc: that.data.uc
            })
          } else if (res.data.data.result === false){
            wx.showToast({
              title: res.data.data.msg,
              icon:'none',
            })
          }

          if (res.data.data.redirect){
            wx.navigateTo({
              url: res.data.data.redirect
            })
          } 
        } 
      }
    })
  },
  audio_play:function(){
    var that = this;
    if(that.data.audio_status){
      innerAudioContext.src = this.data.uc.audio_path;
      innerAudioContext.stop();
    }else{
      innerAudioContext.play();
    }
    that.setData({
      audio_status:!that.data.audio_status
    })
  },
  onLoad: function (option) {
    var id = option.id || 0;
    this.setData({
      id:id
    })
    this.getuc(id);
  },
  onShow:function(){
    var that = this;
    innerAudioContext.onPlay((res)=>{
      console.log('start play')
    })
    innerAudioContext.onError(()=>{
      wx.showToast({
        title: '网络出错，请重试',
        icon:'none'
      })
    })
    innerAudioContext.onStop(() => {
      console.log('stop')
    })
    innerAudioContext.onEnded(()=>{
      that.setData({
        audio_status:false,
      })
    })
  }
})
