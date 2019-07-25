// xin_cplove/mall/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    page:{},
  },
  getgoods:function(){
    var that = this;
    app.util.user((res) => {
      app.util.request({
        url:'entry/wxapp/mall',
        method:'post',
        success:function(res){
          wx.setNavigationBarTitle({
            title: res.data.data.mall_settings.title,
          })
          if (res.data.data.mall_settings.status == 0){
            wx.reLaunch({
              url: '../activity/activity',
            })
          }else{
            that.setData({
              goods: res.data.data.goods_list,
              page: res.data.data.mall_settings
            })
          }
        }
      })
    })
  },
  detail:function(e){
    var that = this;
    var i = e.currentTarget.dataset.id;
    if(that.data.goods[i]){
      wx.navigateTo({
        url: 'detail?goods=' + JSON.stringify(that.data.goods[i]),
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgoods();
  },
})