// pages/search/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    inputValue:"",
    isFocus:true 
  },
  timeId:-1,

  // 搜索输入查询
  searchInput(e){
    let {value} = e.detail
    if(!value.trim()){
      return;
    }

    this.setData({isFocus:false})
    // 防抖操作
    clearTimeout(this.timeId);
    this.timeId = setTimeout(()=>{
      this.qSearch(value);
    },1000)
    
    
  },
  // 查询数据
  async qSearch(query){
    const res = await request({url:"goods/qsearch",data:{query}});
    this.setData({
      goods:res
    })
  },
  // 重置按钮
  handleCancel(){
    clearTimeout(this.timeId);
    this.setData({
      goods:[],
      inputValue:"",
      isFocus:true 
    })
  }

})