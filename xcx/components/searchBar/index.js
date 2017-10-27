module.exports = {
  data: {
    inputVal:''
  },
  props: {
    text: "start"
  },
  methods: {
    inputTyping:function(event){
      this.setData({

      })
      console.log(event.detail.value)
      console.log("??")
      console.log("打字中")
    },
    clearInput:()=>{
      this.inputVal=''
    }
  }
}