// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWX.js"
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    checkAll: true,
    totalPrice: 0,
    totalCount: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    // 判断是否已登录，如果没有，跳转至用户中心页面
    let {nickName} = wx.getStorageSync('userInfo')
    if(!nickName){
      
      wx.navigateTo({
        url: '/pages/login/index',
      })
      wx.showToast({
        title: '请先登录',
        icon:"none",
        mask:true
      })
    }

    let address = wx.getStorageSync('address')
    let addressAll = address.provinceName + address.cityName + address.countyName + address.detailInfo
    const cart = wx.getStorageSync('cart') || []
    this.getTotal(cart)
    this.setData({
      address,
      addressAll,
    })
  },

  async changeAddress() {
    try {
      const res = await getSetting()
      const scopeAddress = res.authSetting["scope.address"]
      if (scopeAddress === false) {
        wx.showModal({
          content: '是否授权地理位置',
          showCancel: true,
          success: (res) => {
            if (res.confirm) {
              wx.openSetting({
                complete: (res) => {
                  console.log(res)
                },
              })
            }
          },
          title: 'title',
        })

        // const res = await showModal({content:"是否授权地理位置"})
        // if(res.confirm){
        //   wx.openSetting({
        //             complete: (res) => {
        //               console.log(res)
        //             },
        //           })
        // }

      }
      const address = await chooseAddress()
      wx.setStorageSync('address', address)
    }
    catch (error) {
      console.log(error);
    }
  },

  getTotal(cart) {
    let checkAll = true
    let totalPrice = 0
    let totalCount = 0
    cart.forEach(v => {
      if (v.check) {
        totalCount += v.count
        totalPrice += v.goods_price * v.count
      } else {
        checkAll = false
      }
    })
    checkAll = cart.length != 0 ? checkAll : false
    this.setData({
      cart,
      totalPrice, totalCount, checkAll
    })
    wx.setStorageSync('cart', cart)

  },
  // 单元选中
  itemChange(e) {
    const goods_id = e.currentTarget.dataset.id
    const { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].check = !cart[index].check
    this.getTotal(cart)
  },
  // 全选
  allCheck() {
    let checkAll = !this.data.checkAll
    const { cart } = this.data
    cart.forEach(v => v.check = checkAll)
    this.getTotal(cart)
  },
  // 数量加减
  async countChange(e) {
    let { id, operation } = e.currentTarget.dataset
    const { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === id)
    if (cart[index].count === 1 && operation === "-1") {
      const res = await showModal({ content: "是否删除该商品" })
      if (res.confirm) {
        cart.splice(index, 1)
      }
    } else {
      cart[index].count += parseInt(operation)
    }
    this.getTotal(cart)
  },

  // 支付
  pay() {
    const { address, totalCount } = this.data
    if (!address.userName) {
      showToast({ title: "请填写收货地址" });
      return;
    }
    if (totalCount === 0) {
      showToast({ title: "请添加商品" });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }

})