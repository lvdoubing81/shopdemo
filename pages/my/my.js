// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collect:[],
  },
  onShow(){
    const userInfo = wx.getStorageSync('userInfo')
    const collect = wx.getStorageSync('collect')
    this.setData({userInfo,collect})

    let address = wx.getStorageSync('address')
    let addressAll = address.provinceName + address.cityName + address.countyName + address.detailInfo
  },

})