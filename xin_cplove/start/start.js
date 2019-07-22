// xin_cplove/start/start.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg: "https://" + app.siteInfo.siteroot.split('/')[2] + '/addons/xin_cplove/static/img/start.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.util.request({
      url:'entry/wxapp/init',
      method:'post',
      success:function(res){
        wx.showLoading({
          title: '请稍后...',
        })
        if (res.data.data.redirect){
          wx.redirectTo({
            url: '' + res.data.data.redirect,
          })
        }
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})