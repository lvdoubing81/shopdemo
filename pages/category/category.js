// pages/category/category.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类数据
    currentIndex:0,
    rightScrollTOP:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')
    if(!Cates){
      this.getcategoryList()
    }else{
      if(Date.now() - Cates.time >1000*300){
        this.getcategoryList()
      }else{
        this.Cates = Cates.data 
       let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children
       this.setData({
         leftMenuList,
         rightContent
             })
      }
    }
    
  },
  onShow: function(){
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

  // 获取分类数据
  async getcategoryList(){
    const res = await request({url:"categories"});
    wx.setStorageSync('cates', {time:Date.now(),data:res})
      this.Cates = res
      // 左侧菜单数据
       let leftMenuList = this.Cates.map(v=>v.cat_name)
      //  右侧内容区域
       let rightContent = this.Cates[0].children
      this.setData({
        //左侧菜单数据构建
        leftMenuList,
        // 右侧内容构建
        rightContent
            })
  },
  changeMenu(e){
    // 获取当前元素索引
    const index = e.currentTarget.dataset.index ;
    // 获取索引对应的右侧内容
    let rightContent = this.Cates[index].children;
    // 存数据
    this.setData({
      currentIndex: index,
      rightContent,
      rightScrollTOP: 0
    })


  }

  
})