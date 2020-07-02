// pages/auth/index.js
import { request } from '../../request/index'
import { login } from "../../utils/asyncWX.js"
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async getUserInfo(e){
    try {
      const {encryptedData,iv,rawData,signature} = e.detail;
      const {code} = await login();
      const loginParams = {encryptedData,iv,rawData,signature,code};
      const res = await request({url:"users/wxlogin",data:loginParams,methods:"post"});
      wx.setStorageSync('token', "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
      wx.navigateBack({
      delta:1
    });
    } catch (error) {
      console.log(err);
      
    }
    
  }
})