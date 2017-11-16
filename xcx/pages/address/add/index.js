const A = getApp()

Page({
  data: {
    show: false,
    form: {
      name: '',
      gender: 'male',
      tel: '',
      address: '',
      isDef: false,
    },
    radio: [
      {
        name: '先生',
        value: 'male',
        checked: true,
      },
      {
        name: '女士',
        value: 'female',
      },
    ],
  },

  onLoad() {
    this.validateInit()
  },

  validateInit: function () {
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
  radioChange(e) {
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
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      A.WxService.showModal({
        title: '友情提示',
        content: `${error.param} : ${error.msg}`,
        showCancel: !1,
      })
      return false
    }
    A.RES['address'].saveAsync(params)
      .then(res => {
        this.showToast(res.message)
      })
  },
  showToast(message) {
    A.WxService.showToast({
      title: message,
      icon: 'success',
      duration: 1500,
    }).then(() => A.WxService.navigateBack())
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