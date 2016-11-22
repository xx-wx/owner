let API = require("../../utils/Api.js")
Page({
    data: {
        mapIcon: "../../resources/tabbar/1-selected.png",
        msgIcon: "../../resources/tabbar/2-selected.png",
        placehodler: "搜索配件",
        merchants: [],
        isLoading: true
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        wx.setNavigationBarTitle({
            title: '商家',

        })

        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 10000,
        })
        this.loadData()
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

    },
    loadData: function () {
        let parms = {
            "mapCoordinates": "113.692797,34.806201",
            "keyword": "",
            "category": "all",
            "orderType": "default",
            "pageNo": 1,
            "cityCode": 268,
            "areaCode": -1,
            "insuranceLevel": 1,
            "shopType": ""
        }
        let that = this
        API.POST(API.Url("/owner/serviceShop/list.jhtml"), parms, function (data) {
            console.log(data)
            wx.hideToast()
            console.log(this)
            that.setData({
                isLoading:false,
                merchants: data.shopList
            })
        }, function (error) {
            console.log(error)
        })
    }




})