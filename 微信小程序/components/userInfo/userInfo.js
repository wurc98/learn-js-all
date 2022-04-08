// components/userInfo/userInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: "xxx"
    },
    age: {
      type: Number,
      value: 18
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    message: "我是组件userInfo"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickMe(){
      this.triggerEvent('test',{
        name:"333"
      })
    }
  }
})
