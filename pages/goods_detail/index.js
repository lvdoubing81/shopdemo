// pages/goods_detail/index.js
import { request } from '../../request/index'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goodsObj:{},
      isCollected:false
  },

  // 商品对象
  goodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求商品详情数据
      this.getGoodsDetail(options.goods_id)
      // 判断是否为收藏商品

  },
  // 请求数据
  async getGoodsDetail(goods_id){
     const res = await request({url:"goods/detail",data:{goods_id}})
     this.goodsInfo = res
      // 判断是否商品被收藏
      let collect = wx.getStorageSync('collect')||[]
      let isCollected = collect.some(v=>v.goods_id === res.goods_id)
      console.log(isCollected);
      

     this.setData({
       isCollected,
       goodsObj:{
        goods_id:res.goods_id,
        goods_name:res.goods_name,
        goods_small_logo:res.goods_small_logo,
        goods_price:res.goods_price,
        // 应急处理格式问题
        goods_introduce:res.goods_introduce.replace(/\.webq/g,'.jpg'),
        pics:res.pics
       }
     })
  },
  // 图片放大
  handlePreviewImage(e){
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.mid
    wx.previewImage({
      current,
      urls
    })
  },
  // 加入购物车
  cartAdd(){
    console.log("加入购物车");
    const cart = wx.getStorageSync('cart')||[];
    let index = cart.findIndex(v=>v.goods_id === this.goodsInfo.goods_id)
    if(index === -1){
      //不存在，第一次添加
      this.goodsInfo.count=1
      // 默认商品选中
      this.goodsInfo.check=true
      cart.push(this.goodsInfo)
      
    }else{
      //存在，数量++
      cart[index].count++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon:"success",
      mask:true
    })
  },


  // 点击收藏
  collected(){
    // 收藏状态转换
    let isCollected = !this.data.isCollected
    let goodsObj = this.data.goodsObj;
    let collect = wx.getStorageSync('collect')||[];
    if(isCollected){
      // 加入收藏
      collect.push(goodsObj)
      wx.showToast({
        title: '收藏成功',
        icon:"none",
        mask:true
      })
    }else{
      // 清除收藏缓存
      let index =  collect.findIndex(v=>v.goods_id === goodsObj.goods_id)
      collect.splice(index,1) 
      wx.showToast({
        title: '取消收藏',
        icon:"none",
        mask:true
      })
    }
    this.setData({
      isCollected
    })
    wx.setStorageSync('collect', collect)    
  },

  // 立即购买
  pay(){
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }
})