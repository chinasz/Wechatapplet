//联系客服.js
const app = getApp()
Page({
  data: {
    article_list:null,
  },
  getarticle:function(){
    var that = this;
    app.util.request({
      url:'entry/wxapp/guide',
      method:'post',
      success:function(res){
        that.setData({
          article_list:res.data.data
        })
      }
    })
  },
  familiar:function(e){
    if (this.data.article_list[e.currentTarget.dataset.index]){
      wx.navigateTo({
        url: './familiar2?param=' + JSON.stringify(this.data.article_list[e.currentTarget.dataset.index]),
      })
    }
  },
  onLoad: function () {
    this.getarticle();
  }
})
