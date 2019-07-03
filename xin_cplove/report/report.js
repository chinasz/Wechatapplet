//report.js
const app = getApp();
Page({
  data: {
    ops:['bug','idea'],
    op:0,
    title:['报告故障','提交建议'],
    preview:[],
    text:null,
    count:9,
    len:300,
    img:[],
    submit:true,
  },
  selectimg:function(){
    //选择图片
    var that = this;
    var currentcount = that.data.preview.length || 0;
    if (currentcount <that.data.count){
      wx.chooseImage({
        count: that.data.count - currentcount,
        success(res){  
          that.setData({
            preview: that.data.preview.concat(res.tempFilePaths)
          })
        }
      })
    }
  },
  buginput: function (e) {
    var that = this;
    var bug = '';
    if(e.detail.value.trim()){
      bug = e.detail.value.trim();
    }
    that.setData({
      len: 300 - e.detail.value.length,
      text:bug
    })
  },
  uploadimgs:function(data,cb,i=0){
    wx.showLoading({
      title: '提交中...',
    })
    var that = this;
    wx.uploadFile({
      url: '' + app.util.url('entry/wxapp/reportupload') + '&state=we7sid-' + wx.getStorageSync('userInfo').sessionid + '&m=xin_cplove',
      filePath: data[i],
      name: 'file',
      success: function (res) {
        res.data = JSON.parse(res.data)
        if(res.data.errno == 0){
          that.data.img.push(res.data.data)
          that.setData({
            img:that.data.img
          })
        } 
      },
      complete:function(){
        i++;
        if(i < data.length){
          that.uploadimgs(data,cb,i)
        }else{
          wx.hideLoading();
          cb()
        }
      }
    })
  },
  bug:function(data){
    var that = this;
    app.util.request({
      url: 'entry/wxapp/feedback',
      method:'post',
      data:data,
      success:function(res){
        if(res.data.errno == 0){
          wx.navigateBack()
          wx.showToast({
            title: '感谢您的反馈',
            icon:'none'
          })
        }
      },
    })
  },
  subbug:function(){
    //提交故障
    var that = this;
    var imgupload = [];
    var op = that.data.ops[that.data.op];
    if(that.data.text && that.data.submit){
      that.setData({
        submit:false
      })
      if(that.data.preview.length>0){
        //循环图片上传
        that.uploadimgs(that.data.preview,function(){
          that.bug({text:that.data.text,img:that.data.img.join(','),op:op})
        },0)
      }else{

        that.bug({ text: that.data.text,op:op})
      }
    }else{
      wx.showToast({
        title: '文本不能为空',
        icon:'none'
      })
    }

  },
  onLoad: function (option) {
    var op = option.id || 0;
    this.setData({
      op:op
    })
    wx.setNavigationBarTitle({
      title: ''+this.data.title[op],
    })
  }
})
