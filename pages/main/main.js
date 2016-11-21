var util = require('../../utils/util.js')
Page({
  data: {

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '首页',
      color: '#ff00ff',
      success: function (res) {
        // success
      }
    })
    let code = "Basic " + util.base64encode("xiucheren-client-owner-ios:1a2730fc771f359db9ebe14b45b02705")
    console.log(code)
    wx.request({
      url: 'https://api.xiucheren.net/oauth/token?grant_type=client_credentials',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Authorization": code,
        "username":"xiucheren-client-owner-ios",
        "password":"1a2730fc771f359db9ebe14b45b02705",
        
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
      },
      fail: function () {
        console.log('fail')

      },
      complete: function () {
        // complete
        console.log('complete')

      }
    })
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