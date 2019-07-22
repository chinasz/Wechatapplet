const app = getApp();
Page({
  data: {
    imgUrls: [],
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true, // 是否自动切换
    circular: true, // 是否采用衔接滑动
    interval: 3000, // 自动切换时间间隔
    duration: 1000, // 滑动动画时长
    card_list: [],
    select: null,
    vip:null,
    share:null,
    mid:0,
    ios_pay:0,
  },
  getmeal: function() {
    var that = this;
    app.util.request({
      url: 'entry/wxapp/meal',
      data: {},
      method: 'post',
      cachetime: 30,
      success: function(res) {
        that.setData({
          card_list: res.data.data.meal_list,
          vip:res.data.data.vip,
          share:res.data.data.share,
          mid:res.data.data.id,
          imgUrls: res.data.data.slider,
          ios_pay:res.data.data.ios_pay
        })
      }
    })
  },
  select: function(e) {
    //选择套餐
    this.setData({
      select: e.currentTarget.dataset.index
    })
  },
  recharge: function() {
    //充值会员
    var that = this;
    try{
      var system = wx.getSystemInfoSync();
      if (system.system.indexOf('iOS') > -1 && that.data.ios_pay == 0){
        wx.showModal({
          title: '系统提示',
          content: '暂不支持ios用户',
          showCancel:false,
        })
        return;
      }
    }catch(e){
      return wx.showToast({
        title: '设备信息获取失败，请重试',
      })
    }
    if (that.data.card_list[that.data.select] && that.data.card_list[that.data.select].id) {
      app.util.request({
        url: 'entry/wxapp/recharge',
        data: {
          meal: that.data.card_list[that.data.select].id
        },
        success: function(res) {
          if (res.data.errno == 0) {
            wx.requestPayment({
              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': 'MD5',
              'paySign': res.data.data.paySign,
              'success': function(res) {
                wx.navigateBack()
                wx.showToast({
                  title: '充值成功',
                  icon: 'success',
                })
                that.setData({
                  select:null
                })
              },
              'fail': function(res) {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none'
                })
              }
            })
          }
        }
      })
    }
  },
  checkCurrent: function(e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  //获取当前滑块的index
  bindchange: function(e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  onLoad: function(options) {
    this.getmeal();
  },
  onShareAppMessage:function(res){
    return {
      title:this.data.share.title || '转发标题',
      path: '/xin_cplove/index/index?id='+ this.data.mid,
      imageUrl:this.data.share.img || '',
    }
  }
})