// pages/login/index.js
import {showToast} from "../../utils/asyncWX.js"
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
 Page({
  async login(e){
    const {userInfo} = e.detail;
    wx.setStorageSync('userInfo', userInfo);
    await showToast({title:"登录成功"})
    wx.navigateBack({
      delta:1
    });
  }
})