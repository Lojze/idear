//index.js
const app = getApp()
const { envList } = require('../../envList.js')

Page({
  data: {
    showUploadTip: false,
  },
  onLoad(){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getList',
      success: function(res) {
        console.log(res.result.ideasaiList?.data) // 3
      },
      fail: console.error
    })
  }
})
