var util = require('./util.js')
let isDev = false
let base = isDev ? "http://192.168.1.6:8000/api" : "https://api.xiucheren.net";

function Url(s) {
  return base + s
}

function geocoder(location,success,fail){
  wx.request({
    url: 'http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + location + '&output=json&pois=1&ak=UpKrxMn4ULOteRImfgXKGRRyPS5IQRUy',
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: { 'Content-Type': 'application/json' },
    success: function(res){
      // success
     let poi =  res.data.slice(29,res.data.length-1)
     console.log(JSON.parse(poi))
      success(JSON.parse(poi))

    },
    fail: function(e) {
      // fail
       console.log(e)
    },
    complete: function() {
      // complete
    }
  })
}
function token(url, success, fail) {
  if (url.indexOf("https") == 0) {
    let urls = new Array()
    let host = base
    urls = url.split("/")
    if (urls.length > 2) {
      host = urls[0] + "//" + urls[1] + urls[2]
    }
    
    wx.getStorage({
      key: host,
      success: function (res) {
        // success
        let data = res.data
        if (data) {
          let now = new Date()
          if ((data.date) && (now.getTime() / 1000.0 - data.date < data.expires_in)) {
            success(data.access_token)
          } else {
            getToken(host, success, fail)
          }
        }
      },
      fail: function () {
        // fail
        getToken(host, success, fail)
      },
      complete: function () {
        // complete
      }
    })
  } else {
    success(null)
  }
}


function getToken(host, success, fail) {
  wx.request({
    url: host + '/oauth/token?grant_type=client_credentials',
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Authorization": "Basic " + util.base64encode("xiucheren-client-owner-ios:1a2730fc771f359db9ebe14b45b02705"),
      "username": "xiucheren-client-owner-ios",
      "password": "1a2730fc771f359db9ebe14b45b02705",
    }, // 设置请求的 header
    success: function (res) {
      if (res.statusCode == 200) {
        res.data.date = (new Date()).getTime()
        wx.setStorageSync(host, res.data)
        success(res.data.access_token)
      } else {
        fail(res)
      }

    },
    fail: function (e) {
      // fail
      fail(e)
    },
    complete: function () {
      // complete
    }
  })
}


function request(url, method, data, success, fail) {
  token(url, (res) => {
    let header;
    if (res) {
      header = { "Authorization": "Bearer " + res }
    }
    var parameters = new Array()
    for (var p in data) {
      let ss = p + "=" + data[p]
      parameters.push(ss)
    }
    if (parameters.length > 0) {
      url += "?" + parameters.join("&")
    }
    console.log(url)
    wx.request({
      url: url,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        success(res)
      },
      fail: function (e) {
        // fail
        fail(e)
      },
      complete: function () {
        // complete
      }
    })
  }, (e) => {
    fail({ msg: "token请求失败" })
  })

}

function POST(url, data, success, fail) {
  request(url, "POST", data, success, fail)
}

function GET(url, data, success, fail) {
  request(url, "GET", data, success, fail)
}

module.exports = {
  Url: Url,
  geocoder:geocoder,
  POST: POST,
  GET: GET

}