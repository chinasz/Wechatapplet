//tone.js
const app = getApp();
const options = {
  duration: 60000,
  format: 'mp3',
  frameSize: 50
};
const recorderManager = wx.getRecorderManager();
Page({
  data: {
    animationData1: "",
    animationData2: "",
    animationStatus: false,
    fonttitle:0,
    fontword:0,
    font: [{
        title: '一句台词',
        word: ['生命就像一盒巧克力，你永远不知道下一颗是什么。', '回忆本来是非常美好的，只要你能让我过去的都过去']
      },
      {
        title: '正常情话',
        word: ['大桶的爆米花想和你一起吃，超大杯的果汁想和你一起喝。', '别人可以用理智逻辑爱你，我不行，我想用放肆昏庸爱你。']
      },
      {
        title: '一句台词',
        word: ['满地都是六便士，他却抬头看见了月亮。', '我手上的爱情、生命线和事业线，都是你的名字拼成的', '对你的爱会持续多久？只要你头顶的星星依然闪烁。']
      },
      {
        title: '试试唱唱以下歌词',
        word: ['我曾经跨过山河大海，也穿过人山人海', '我们不一样，每个人都有不同的境遇，我们在这里，在这里等你。']
      },
      {
        title: '一句情歌',
        word: ['亲爱的 爱上你 从那天器 甜蜜的很轻易 亲爱的 别任性 你的眼睛 再说我愿意 一 《告白气球》 周杰伦', '']
      },
      {
        title: '尝试念一下以下台词',
        word: ['十室九贫尚且凑得八两七千六分五厘四毫且三心二意一等下流。']
      },
      {
        title: '土味情话',
        word: ['见什么世面，见见你就好啦。', '你今天特别讨厌，讨人喜欢又白看不厌']
      }
    ]
  },
  animationFun: function(animationData) {
    if (!this.data.animationStatus) {
      return
    }
    var animation = wx.createAnimation({
      duration: 1000
    })
    animation.opacity(0).scale(2, 2).step();
    this.setData({
      [`${animationData}`]: animation.export()
    })
  },
  animationEnd: function(animationData) {
    var animation = wx.createAnimation({
      duration: 0
    })
    animation.opacity(1).scale(1, 1).step();
    this.setData({
      [`${animationData}`]: animation.export()
    })

  },
  recodeEnd: function() {
    recorderManager.stop();
    //动画1结束
    var animation1 = wx.createAnimation({
      duration: 0
    })
    animation1.opacity(1).scale(1, 1).step();
    //动画2结束
    var animation2 = wx.createAnimation({
      duration: 0
    })
    animation2.opacity(1).scale(1, 1).step();
    this.setData({
      animationData1: animation1.export(),
      animationData2: animation2.export(),
      animationStatus: false
    })
  },
  recodeClick: function() {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.record'] === false) {
          wx.showToast({
            title: '请打开录音功能',
            icon: 'none'
          })
          wx.openSetting({})
        } else {
          that.setData({
            animationStatus: true
          })
          that.animationFun('animationData1')
          setTimeout(() => {
            that.animationFun('animationData2')
          }, 500)
          setTimeout(() => {
            that.animationRest()
          }, 1000)
          recorderManager.start(options);
        }
      }
    })

  },
  animationRest: function() {
    //动画重置
    this.animationEnd('animationData1')
    setTimeout(() => {
      this.animationEnd('animationData2')
    }, 500)
    setTimeout(() => {
      if (this.data.animationStatus) {
        this.recodeClick()
      }
    }, 100)
  },
  change:function(){
    var that = this;
    if (that.data.font[that.data.fonttitle].word[that.data.fontword + 1]){
      that.data.fontword +=  1;
    }else{
      that.data.fonttitle = that.data.font[that.data.fonttitle + 1] ? that.data.fonttitle + 1 : 0;
      that.data.fontword = 0;
    }
    that.setData({
      fonttitle:that.data.fonttitle,
      fontword:that.data.fontword
    })
  },
  onLoad: function() {

  },
  onShow:function(){
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      wx.showLoading({
        title: '上传中...',
      })
      const { tempFilePath } = res
      wx.uploadFile({
        url: '' + app.util.url('entry/wxapp/myrecord') + '&state=we7sid-' + wx.getStorageSync('userInfo').sessionid + '&m=xin_cplove',
        filePath: tempFilePath,
        name: 'file',
        success: function (res) {
          res.data = JSON.parse(res.data);
          wx.hideLoading();
          if (res.data.errno == 0) {
            wx.showToast({
              title: '上传成功',
              icon: 'none'
            })
          }
        }
      })
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })
  }
})