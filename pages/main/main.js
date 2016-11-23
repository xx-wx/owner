var util = require('../../utils/util.js')
var Api = require('../../utils/Api.js')
Page({
  data: {
    hotInfoList: [],
    HotInfoCenterList: [],
    mechanics: [],
    shopList: [],
    shopCount: 0,
    rentShopCount: 0,
    buttons: [
      {
        src: "../../resources/main/fa@2x.png",
        title: "你发.我抢"
      },
      {
        src: "../../resources/main/qi@2x.png",
        title: "约.汽修站"
      },
      {
        src: "../../resources/main/yue@2x.png",
        title: "约.技师"
      },
      {
        src: "../../resources/main/sou@2x.png",
        title: "搜.配件"
      }
    ],
    h_items: [
      {
        src: "../../resources/main/zixun_icon@2x.png",
        title: "我省启动暴雪应急响应"
      },
      {
        src: "../../resources/main/nuoche@2x.png",
        title: "拨打114118挪车"
      }
    ],
  },
  getShops: function () {
    let self = this
    Api.POST(Api.Url("/owner/getRecommend.jhtml"), { baiduCode: 268 }, (res) => {
      console.log(res)
      self.setData({
        mechanics: res.data.data.mechanicList,
        shopCount: res.data.data.shopCount,
        rentShopCount: res.data.data.rentShopCount,
        shopList: res.data.data.shopList,
      })
      wx.stopPullDownRefresh()
    }, (e) => {
      wx.stopPullDownRefresh()
    })
  },
  hotInfo: function () {
    let self = this
    Api.POST(Api.Url("/owner/hotInfo.jhtml"), null, (res) => {
      console.log(res)
      self.setData({
        hotInfoList: res.data.data.HotInfoList,
        HotInfoCenterList: res.data.data.HotInfoCenterList
      })
    }, (e) => {

    })
  }
  ,
  onPullDownRefresh: function () {
    this.hotInfo()
    this.getShops()
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
    this.hotInfo()
    this.getShops()


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