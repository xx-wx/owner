var util = require('./util.js')
let base = "https://api.xiucheren.net";


function token(url,success,fail) {
  let urls = new Array()
  let host = base
  urls = url.split("/")
  if (urls.length > 2){
    host = urls[0]+ "//" + urls[1]+urls[2]
  }
  wx.request({
    url: host + '/oauth/token?grant_type=client_credentials',
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    data: {
      "grant_type": "client_credentials"
    },
    header: {
      "Authorization": "Basic " + util.base64encode("xiucheren-client-owner-ios:1a2730fc771f359db9ebe14b45b02705"),
      "username": "xiucheren-client-owner-ios",
      "password": "1a2730fc771f359db9ebe14b45b02705",
    }, // 设置请求的 header
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
}
function request(url,method,data,success,fail){
  if (url.indexOf("https")===0){
      token((res)=>{

      },(e)=>{

      })
  }else{

  }

}
function POST(){

}
function GET(){

}

module.exports = {
  token: token
}