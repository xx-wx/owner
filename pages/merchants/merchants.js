var Api = require('../../utils/Api.js')
Page({
    data: {
        mapIcon: "../../resources/merchants/nav_location@2x.png",
        msgIcon: "../../resources/tabbar/2-selected.png",
        placeholder: "搜索配件",
        mechanics: [],
        isLoading: true,
        shopList: [],
        address: {
            name: "",
            address: "",
            latitude: null,
            longitude: null

        }
    },
    handleClickMap: function () {
        let self = this
        wx.chooseLocation({
            success: function (res) {
                console.log(res)
                self.setData({
                    address:res
                })
                self.getShops()
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },
    handleinput:function(e){
        this.getShops(e.detail.value)
    }
    ,
    //获取商家列表
    getShops: function (keyword) {
        let self = this
         var parms = {
            "category": "all",
            "orderType": "default",
            "pageNo": 1,
            "cityCode": 268,
            "areaCode": -1,
            "insuranceLevel": 1,
            "shopType": ""
        }
        if (this.data.address.latitude){
            parms.mapCoordinates = this.data.address.longitude + "," +  this.data.address.latitude
        }
        if (keyword){
            parms.keyword = keyword
        }
        Api.POST(Api.Url("/owner/serviceShop/list.jhtml"), parms, (res) => {
            console.log(res)
            self.setData({
                shopList: res.data.data.shopList,
            })
            wx.stopPullDownRefresh()
        }, (e) => {
            wx.stopPullDownRefresh()
        })
    },
    //获取当前地址
    getCurLocation: function () {
        let self = this
        wx.getLocation({
            type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            success: function (res) {
                // success                
                self.setAddress(res)
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },
    setAddress: function (location) {
        let self = this
        Api.geocoder(location.latitude + "," + location.longitude, (res) => {
            console.log(res)
            self.setData({
                address: {
                    address: res.result.formatted_address,
                    latitude: res.result.location.lat,
                    longitude: res.result.location.lng
                }
            })
            self.getShops()
        }, (e) => {
            console.log(e)
        })
    }
    ,
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        wx.setNavigationBarTitle({
            title: '商家',
        })
        // wx.showToast({
        //     title: "加载中",
        //     icon: "loading",
        //     duration: 10000,
        // })
        this.loadData()
        this.getCurLocation()
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
        Api.POST(Api.Url("/owner/serviceShop/list.jhtml"), parms, function (data) {
            console.log(data)
            wx.hideToast()
            console.log(this)
            that.setData({
                isLoading: false,
                merchants: data.shopList
            })
        }, function (error) {
            console.log(error)
        })
    }




})