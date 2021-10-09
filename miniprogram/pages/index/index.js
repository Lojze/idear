//index.js
const app = getApp()
const { envList } = require('../../envList.js')

Page({
  data: {
    showUploadTip: false,
    now_time: "",
    list:[]
  },
  onLoad(){
    let that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getList',
      success: function(res) {
        let list = res.result.ideasaiList?.data

        console.log(list[list.length - 1])
        that.setData({
          now_time: list[list.length - 1].now_time,
          list: list[list.length - 1].data[3]
        })
      },
      fail: console.error
    })
  }
})
