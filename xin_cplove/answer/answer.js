const app = getApp();
Page({
  data: {
    question:null,
    len:500,
    updateanswer:null,
  },
  answerinput: function (e){
    var that = this;
    that.data.updateanswer = e.detail.value;
    that.data.len = 500 - e.detail.value.length;
    that.setData({
      updateanswer:that.data.updateanswer,
      len:that.data.len
    })
  },
  subanswer:function(){
    var that = this;
    if ((that.data.updateanswer || that.data.updateanswer == '') && that.data.updateanswer != that.data.question.answer){
      app.util.request({
        url:'entry/wxapp/answer',
        method:'post',
        data:{qid:that.data.question.id,answer:that.data.updateanswer},
        success:function(res){
          if(res.data.errno == 0){
            wx.navigateBack({})
          }
        }
      })
    }
  },
  onLoad: function (query) {
    var that = this;
    if(!query.question){
      wx.navigateBack({})
    }
    var question = JSON.parse(query.question);
    that.data.len = question.question ? 500 - question.question.length : 500;
    that.setData({
      question:question,
      len:that.data.len
    })
  },
})