/**
 * ------------------------------------------------------------------
 *  分页组件
 * ------------------------------------------------------------------
 */
import template from './pagination.html'
avalon.component('pagination', {
  template: template,
  defaults: {
    isDisabled: function (name, page) {
      var result = this.$buttons[name] = (this.currentPage === page)
      return result
    },
    $buttons: {},
    showPages: 5,
    pageSize: 5,
    pages: [],
    totalPages: 100,
    currentPage: 1,
    totalRecord: 200,

    onPageClick: avalon.noop,
    pageObj: {},

    toPage: function (p) {
      const cur = this.currentPage
      const max = this.totalPages
      switch (p) {
        case 'prev':
          return Math.max(cur - 1, 1)/* 从第一页开始 */
        case 'next':
          return Math.min(cur + 1, max)
        default:
          return p
      }
    },
    cbProxy: function (e, p) {
      let cur = this.toPage(p)
      cur = cur > this.totalPages ? this.totalPages : cur
      if (this.$buttons[p] || p === this.currentPage) {
        e.preventDefault()
        return // disabled, active不会触发
      }
      this.render(cur)
      console.log(this.currentPage)
      this.onPageClick(cur)
    },
    render: function (cur) { /* 更新页码 */
      const obj = this.generatePage(cur)
      this.currentPage = obj.currentPage
      this.pages = obj.pages
    },
    generatePage:function(currentPage){
      let pages = []
      const s = this.showPages
      const total = this.totalPages
      const half = Math.floor(s / 2)
      let start = currentPage - half + 1 - s % 2
      let end = currentPage + half
      // handle boundary case
      if (start <= 0) {
        start = 1
        end = s
      }
      if (end > total) {
        start = total - s + 1
        end = total
      }
      start = start <= 0 ? 1 : start
      var itPage = start
      while (itPage <= end) {
        pages.push(itPage)
        itPage++
      }
      return {currentPage: currentPage, pages: pages}
    },
    onInit: function () {
      this.render(this.currentPage)
    }
  }
})
