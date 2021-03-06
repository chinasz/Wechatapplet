//个人资料.js
const app = getApp();
Page({
  data: {
    member:null,
    temname:null,
    times: { start: new app.util.date().dateToStr('yyyy-MM-dd', new app.util.date().dateAdd('y', -40)), end: new app.util.date().dateToStr('yyyy-MM-dd', new app.util.date().dateAdd('y', -17)) },
    update:{},
    hiddenmodalput1: true,
    submit:false,
    workselect: ['工作党', '学生党'],
  },
  memberDetail: function () {
    var that = this;
    app.util.request({
      url: 'entry/wxapp/getuserinfo',
      method: 'post',
      data: {},
      success: function (res) {
        that.setData({
          member: res.data.data
        })
      }
    })
  },
  avatar:function(e){
    //选择头像
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['compressed'],
      success:function(res){
        that.data.member.member_avatar = res.tempFilePaths[0]
        that.data.update.avatar = res.tempFilePaths[0]
        that.setData({
          member:that.data.member,
          update:that.data.update,
          submit:true,
        })
      }
    })
  },
  sex:function(e){
    //选择性别
    var that = this;
    wx.showActionSheet({
      itemList: ['女','男'],
      success: function (res) {
        if (res.tapIndex != that.data.member.member_gender){
          that.data.member.member_gender = res.tapIndex;
          that.data.update.gender = res.tapIndex
          that.setData({
            member : that.data.member,
            update : that.data.update,
            submit : true
          })
        }
      }
    })
  },
  nickname:function(e){
    //修改昵称弹出
    if (e.detail != '') {
      this.data.member.member_nickname = e.detail;
      this.data.update.nickname = e.detail;
      this.setData({
        member: this.data.member,
        update: this.data.update,
        submit: true
      })
    }
  },
  bindDateChange: function (e) {
    //  修改生日
    if(e.detail.value != this.data.member.member_birth){
      this.data.member.member_birth = e.detail.value;
      this.data.update.birth = e.detail.value;
      this.setData({
        member: this.data.member,
        update: this.data.update,
        submit: true
      })
    }
  },
  life:function(e){
    //所在地
    this.data.update.province =e.detail.value[0]
    this.data.update.city = e.detail.value[1]
    this.data.update.county = e.detail.value[2]
    this.data.member.member_province = e.detail.value[0]
    this.data.member.member_city = e.detail.value[1]
    this.data.member.member_county = e.detail.value[2]

    this.setData({
      member:this.data.member,
      update:this.data.update,
      submit:true
    })
  },
  school:function(e){
    //学校名称
    if (e.detail != '') {
      this.data.member.member_school = e.detail;
      this.data.update.school = e.detail;
      this.setData({
        member: this.data.member,
        update: this.data.update,
        submit: true
      })
    }
  },
  work: function (e) {
    //学籍状态
    var that = this;
    wx.showActionSheet({
      itemList: that.data.workselect,
      success: function (res) {
        if (res.tapIndex + 1 != that.data.member.member_job){
          that.data.member.member_job = res.tapIndex + 1;
          that.data.update.job = res.tapIndex + 1;
          that.setData({
            member: that.data.member,
            update: that.data.update,
            submit: true
          })
        }
      }
    })
  },
  wenum:function(e){
    //微信号
    if(e.detail != ''){
      this.data.member.member_wenum = e.detail;
      this.data.update.wenum = e.detail;
      this.setData({
        member:this.data.member,
        update:this.data.update,
        submit:true
      })
    }
  },
  
  changeCountry(e) { this.setData({ countryIndex: e.detail.value }); },
  changeRegin(e) { this.setData({ region: e.detail.value }); },
  changeMultiPicker(e) { this.setData({ multiIndex: e.detail.value }) },
  changeMultiPicker3(e) { this.setData({ multiIndex3: e.detail.value }) }, 

  modify:function(e){
    var that = this;
    if(!that.data.submit){
      wx.showToast({
        title: '没有要修改的内容',
        icon:'none'
      })
      return;
    }
    var avatar = that.data.update.avatar;
    delete that.data.update.avatar;
    if(avatar){
      wx.showLoading({
        title: '请稍后...',
      })
      wx.uploadFile({
        url: '' + app.util.url('entry/wxapp/user_update') + '&state=we7sid-' + wx.getStorageSync('userInfo').sessionid + '&m=xin_cplove',
        filePath: avatar,
        name: 'file',
        formData:that.data.update,
        success:function(res){
          res.data = JSON.parse(res.data)
          if(res.data.errno == 0){ 
              that.modifycallback();
          }
          wx.hideLoading();
        }
      })
    }else{
      app.util.request({
        url:'entry/wxapp/user_update',
        data:that.data.update,
        method:'post',
        success:function(res){
          if(res.data.errno==0){
            that.modifycallback();
          }
        }
      })
    }
  },
  modifycallback: function () {
    this.data.update = {};
    this.setData({
      submit: false,
      update: this.data.update
    })
    wx.showToast({
      title: '修改成功',
      icon:'none',
    })
  },
  onLoad: function () {
    var that = this;
    that.memberDetail();
  },
})
