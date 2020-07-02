// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品、商家问题",
        isActive:false
      },
    ],
    imgs:[],
    textVal:""
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

  // 上传图片
  chooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (res) => {
        this.setData({
          imgs:[...this.data.imgs,...res.tempFilePaths]
        })
      },
    })
  },

  // 删除图片
  deleteImg(e){
    let {index} = e.currentTarget.dataset;
    const {imgs} = this.data
    imgs.splice(index,1)
    this.setData({
      imgs
    })
  },

  txtInput(e){
      this.setData({
        textVal:e.detail.value
      })
  },

  // 提交数据
  submit(){
    // 判断输入文本是否合法
    let {textVal,imgs} = this.data
    
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:"none",
        mask:true
      });
      return;
    }
    // 上传文件  上传文件在小程序之中是不能多个上传的，只能逐个遍历，再上传至服务器

    imgs.forEach((v,i)=>{
      
      wx.uploadFile({
        // 上传的文件路径
        filePath: v,
        // 前后台约定名称
        name: 'file',
        // 上传到的链接
        url: 'https://images.ac.cn/Home/Index/UploadAction',
        success:(res)=>{
          // console.log(res);
        }
      });

      // 重置数据
      this.setData({
        imgs:[],
        textVal:""
      });
      // 返回上一页
      wx.switchTab({
        url: '/pages/my/my',
      })
    })

    wx.showToast({
      title: '因为缺少接口，所以假装文件上传过去了',
      icon:"none",
      mask:true
    });
    
  }
})