// pages/pay/pay.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWX.js"
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalCount: 0

  },

  onShow: function () {
    // 获取地址
    let address = wx.getStorageSync('address')
    address.addressAll = address.provinceName + address.cityName + address.countyName + address.detailInfo
    // 获取购物车信息
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(v=>v.check)
    let totalPrice = 0
    let totalCount = 0
    cart.forEach(v=>{
      totalCount += v.count
      totalPrice += v.goods_price * v.count
    })
    this.setData({
      cart,
      totalPrice, totalCount,address
    })
  },
  // 支付
  async pay(){
    // 获取token
    const token = wx.getStorageSync('token')
    // 判断token是否存在
    if(!token){
      // 不存在，跳转授权
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }
    console.log(111);
    
      // 存在，创建订单
      // 准备请求头
      const header={Authorization:token};
      // 请求参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address;
      const cart = this.data.cart;
      let goods = []
      cart.forEach(v => goods.push({
            goods_id:v.goods_id,
            goods_number:v.count,
            goods_price:v.goods_price,
        })
      );
      const orderParams = {order_price,consignee_addr,goods}
      // 发送请求
        const res = await request({url:"my/orders/create",methods:"POST",data:orderParams,header});
        console.log(res);
        showToast({title:"无效的token，暂时无法实现支付功能"})
        

  }
})