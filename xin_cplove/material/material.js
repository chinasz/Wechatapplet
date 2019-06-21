//个人中心.js
const app = getApp();
Page({
  data: {
    member:null,
    hiddenmodalput: true,
    hiddenmodalput1: true,
    dates: '1997-02-07',
    index: 0,
    hiddenmodalput: true,
    hiddenmodalput1: true,
    countryList: ['中国', '美国', '英国', '日本', '韩国', '巴西', '德国'], countryIndex: 6,
    region: ["请选择 >"],
    multiArray: [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]], multiIndex: [3, 5],
    multiArray3: [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]], multiIndex3: [3, 5, 4]
  },
  bindTimeChange: function (e) {
    this.setData({
      times: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      times: e.detail.value
    })
  },
  changeCountry(e) { this.setData({ countryIndex: e.detail.value }); },
  changeRegin(e) { this.setData({ region: e.detail.value }); },
  changeMultiPicker(e) { this.setData({ multiIndex: e.detail.value }) },
  changeMultiPicker3(e) { this.setData({ multiIndex3: e.detail.value }) },
  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['工作党', '学生党', '休整期'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  actioncnt1: function () {
    wx.showActionSheet({
      itemList: ['大专', '本科', '985/211'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  actioncnt2: function () {
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  modalinput1: function () {
    this.setData({
      hiddenmodalput1: !this.data.hiddenmodalput1
    })
  },
  cancel1: function () {
    this.setData({
      hiddenmodalput1: true
    });
  },
  confirm1: function () {
    this.setData({
      hiddenmodalput1: true
    })
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'currentMember',
      success(res) {
        that.setData({
          member:res.data
        })
      }
    })
  },
})
