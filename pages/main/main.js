var util = require('../../utils/util.js')
var Api = require('../../utils/Api.js')
Page({
  data: {
    hotInfoList: [],
    buttons: [
      {
        src: "../../resources/main/fa@2x.png",
        title: "你发.我抢"
      },
      {
        src: "../../resources/main/fa@2x.png",
        title: "你发.我抢"
      },
      {
        src: "../../resources/main/fa@2x.png",
        title: "你发.我抢"
      },
      {
        src: "../../resources/main/fa@2x.png",
        title: "你发.我抢"
      }
    ]
  },
  hotInfo: function () {
    let self = this
    Api.POST(Api.Url("/owner/hotInfo.jhtml"), null, (res) => {
      console.log(res)
      self.setData({
        hotInfoList: res.data.data.HotInfoList
      })
    }, (e) => {

    })
  }
  ,
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '首页',
      color: '#ff00ff',
      success: function (res) {
        // success
      }
    })
    this.hotInfo()
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})