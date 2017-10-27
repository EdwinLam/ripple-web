module.exports = {
  data: {
    indicatorDots: 1,
    autoplay: 1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: 0,
    image:[],
  },

  // 组件属性
  // 可以预先定义默认值
  // 也可以外部传入覆盖默认值
  props: {
    text: "start"
  },

  // 组件私有方法
  methods: {

  }
}