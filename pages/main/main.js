var util = require('../../utils/util.js')
var Api = require('../../utils/Api.js')

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
   Api.POST(Api.Url("/owner/getRecommend.jhtml"),{"baiduCode":268},(res)=>{
     console.log(res)
   },(e)=>{
     console.log(e)
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