// pages/goods_list/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabs:[
        {
          id:0,
          value:"综合",
          isActive:true,
        },
        {
          id:1,
          value:"销量",
          isActive:false,
        },
        {
          id:2,
          value:"价格",
          isActive:false,
        }
      ],
      goodsList:[]  
  },
  totalPage:1,

  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid||""
    this.QueryParams.query = options.query||""
    
    this.getGoodsList()
  },

  async getGoodsList(){
    const res =await request({url:"goods/search",data:this.QueryParams});
    this.totalPage =Math.ceil(res.total / this.QueryParams.pagesize) 
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    wx.stopPullDownRefresh()
  },
  // 导航切换
  handleTabsItemChange(e){
    const {index} = e.detail
    let {tabs} = this.data

    tabs.forEach((v,i)=> i === index ? v.isActive = true : v.isActive = false)

    this.setData({
      tabs
    })
    
  },
  // 上拉置底操作
  onReachBottom(){
    if(this.QueryParams.pagenum >= this.totalPage){
        wx.showToast({
          title: '没有更多数据了',
        })
        
    }else{
        this.QueryParams.pagenum++;
        this.getGoodsList()
    }
  },

  onPullDownRefresh(){
    console.log("下拉");
    // 重置数据
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  }
})