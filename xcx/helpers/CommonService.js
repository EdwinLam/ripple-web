export default {
  getEl:function(e,items){
    const index = e.currentTarget.dataset.index
    return items[index]
  }
}