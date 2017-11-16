const A = getApp()

Page({
  data: {
    show: true,
    form: {
      name: '',
      gender: 'male',
      tel: '',
      address: '',
      is_def: !1,
    },
    radio: [
      {
        name: '先生',
        value: 'male',
        checked: !0,
      },
      {
        name: '女士',
        value: 'female',
      },
    ],
  },
  onLoad(option) {
    this.initValidate()
    this.setData({
      id: option.id
    })
  },
  onShow() {
    this.renderForm(this.data.id)
  },
  initValidate() {
    this.WxValidate = A.WxValidate({
      name: {
        required: true,
        minlength: 2,
        maxlength: 10,
      },
      tel: {
        required: true,
        tel: true,
      },
      address: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
    }, {
        name: {
          required: '请输入收货人姓名',
        },
        tel: {
          required: '请输入收货人电话',
        },
        address: {
          required: '请输入收货人地址',
        },
      })
  },
  renderForm(id) {
    A.RES['address'].getAsync({ id: id })
      .then(res => {
      	const data = res.data
        const form = {
          name: data.name,
          gender: data.gender,
          tel: data.tel,
          address: data.address,
          isDef: data.isDef,
        }
        const radio = this.data.radio
        radio.forEach(n => n.checked = n.value ===data.gender)
        this.setData({radio,form})
      })
  },
  radioChange(e) {
    const params = e.detail.value
    const value = e.detail.value
    const radio = this.data.radio
    radio.forEach(n => n.checked = n.value === value)
    this.setData({
      radio: radio,
      'form.gender': value,
    })
  },
  submitForm(e) {
    const params = e.detail.value
    const id = this.data.id
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      A.WxService.showModal({
        title: '友情提示',
        content: `${error.param} : ${error.msg}`,
        showCancel: !1,
      })
      return false
    }
    A.RES['address'].updateAsync({ id: id }, params)
      .then(res => {
          this.showToast(res.message)
      })
  },
  delete() {
    A.RES['address'].deleteAsync({ id: this.data.id })
      .then(res => {
        this.showToast(res.message)
      })
  },
  showToast(message) {
    A.WxService.showToast({
      title: message,
      icon: 'success',
      duration: 1500,
    })
      .then(() => A.WxService.navigateBack())
  },
  chooseLocation() {
    A.WxService.chooseLocation()
      .then(data => {
        this.setData({
          'form.address': data.address
        })
      })
  },
})