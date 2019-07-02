/* 走心问答 */
const app = getApp();
Page({
  data: {
    question_list:null,
  },
  go: function (e) {
    var query = JSON.stringify(this.data.question_list[e.currentTarget.dataset.id]);
    if (query){
      wx.navigateTo({
        url: '../answer/answer?question=' + query,
      })
    }
  },
  getquestion:function(){
    var that = this;
    app.util.request({
      url:'entry/wxapp/getquestion',
      method:'post',
      success:function(res){
        that.setData({
          question_list:res.data.data
        })
      }
    })
  },
  onLoad: function () {
    this.getquestion()
  },
  onShow: function (){
    this.getquestion()
  }
})