// xin_cplove/mall/mall.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_num:1,
    goods_img:[],
    goods_price:1,
  },
  goods_num:function(e){
    var that = this;
    var op = e.currentTarget.dataset.op;
    var num = parseInt(that.data.goods_num);
    num = op == 1?++num:--num;

    that.setData({
      goods_num:num<1?1:num,
    })
  },
  num_input:function(e){
    var that = this;
    that.setData({
      goods_num: parseInt(e.detail.value) >= 1 ? parseInt(e.detail.value):1,
    })
  },
  getgoods:function(){
    var that = this;
    app.util.request({
      url:'entry/wxapp/mall',
      method:'post',
      cachetime :30,
      success:function(res){
        that.setData({
          goods_img: res.data.data.mall_img,
          goods_price: res.data.data.mall_price,
        })
      }
    })
  },
  submit:function(e){
    wx.showLoading({
      title: '请稍后..',
    })
    setTimeout(()=>{
      wx.showToast({
        title: '下单成功',
      })
      wx.hideLoading();
    },1500);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgoods();
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