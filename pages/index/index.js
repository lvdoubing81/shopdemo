//index.js
//获取应用实例
const app = getApp()
import { request } from '../../request/index'

Page({
  data: {
    // 轮播图数据
    swiperList:[],
    // 分类导航数据
    catesList:[],
    // 楼层图数据
    floorList:[],
    
  },

  onLoad:function(options){
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  onShow:function(){
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
  },

 // 获取轮播图数据
   getSwiperList(){
    request({url:"home/swiperdata"}).then(res=>{ 
      res.forEach(v=>{
        v.navigator_url = v.navigator_url.replace('main','index')
      })
      this.setData({
              swiperList: res
            })
    })
  },

  // 获取分类导航数据
  getCateList(){
    request({url:"home/catitems"}).then(res=>{;
      
      this.setData({
        catesList: res
            })
    })
  },

  // 获取楼层数据
  getFloorList(){
    request({url:"home/floordata"}).then(res=>{
      res.forEach(v=>{
        v.product_list.forEach(v1=>{
          v1.navigator_url = v1.navigator_url.replace('list','list/index')
        })
      });
      this.setData({
        floorList: res
            })
    })
  },


  
  
})
