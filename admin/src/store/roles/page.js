import {otherRouter, appRouter} from '@/router/router';
import Cookies from 'js-cookie';
import Util from '@/libs/util';
import {router} from '@/router/index';

const state = {
  cachePage: [],
  lang: '',
  isFullScreen: false,
  openedSubmenuArr: [], // 要展开的菜单数组
  menuTheme: 'dark', // 主题
  themeColor: '',
  pageOpenedList: [{
    title: '首页',
    path: '',
    name: 'home_index'
  }],
  currentPageName: '',
  currentPath: [
    {
      title: '首页',
      path: '',
      name: 'home_index'
    }
  ], // 面包屑数组
  menuList: [],
  routers: [
    otherRouter,
    ...appRouter
  ],
  tagsList: [...otherRouter.children],
  messageCount: 0,
  dontCache: ['text-editor', 'artical-publish'], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
  defaultPageSize : 10
}

// getters
const getters = {

}

const actions = {
  /*初始化router数据*/
  initRouter:function({commit},{authItems}){
    // 数据树状处理
    let hash = {}
    let list = []
    let filterData = []
    authItems.forEach(function(el){
        el.children = []
        hash[el.id] = el
    })
    authItems.forEach(function(el){
      hash[el.id] = Object.assign(el,{component:() => import('@/views/'+el.componentPath)})
      if(hash[el.parentId]){
        hash[el.parentId].children.push(el)
      }else{
        list.push(el)
      }
    })
    router.addRoutes(list)
    console.log(list)
    commit("initLeftNav", list)
  }
}
const mutations =  {
  initLeftNav (state, menuList) {
    state.menuList = menuList;
  },
  setTagsList (state, list) {
    state.tagsList.push(...list);
  },
  updateMenulist (state, menuList) {
    // state.menuList = menuList;
  },
  changeMenuTheme (state, theme) {
    state.menuTheme = theme;
  },
  changeMainTheme (state, mainTheme) {
    state.themeColor = mainTheme;
  },
  addOpenSubmenu (state, name) {
    let hasThisName = false;
    let isEmpty = false;
    if (name.length === 0) {
      isEmpty = true;
    }
    if (state.openedSubmenuArr.indexOf(name) > -1) {
      hasThisName = true;
    }
    if (!hasThisName && !isEmpty) {
      state.openedSubmenuArr.push(name);
    }
  },
  closePage (state, name) {
    state.cachePage.forEach((item, index) => {
      if (item === name) {
        state.cachePage.splice(index, 1);
      }
    });
  },
  initCachepage (state) {
    if (localStorage.cachePage) {
      state.cachePage = JSON.parse(localStorage.cachePage);
    }
  },
  removeTag (state, name) {
    state.pageOpenedList.map((item, index) => {
      if (item.name === name) {
        state.pageOpenedList.splice(index, 1);
      }
    });
  },
  pageOpenedList (state, get) {
    let openedPage = state.pageOpenedList[get.index];
    if (get.argu) {
      openedPage.argu = get.argu;
    }
    if (get.query) {
      openedPage.query = get.query;
    }
    state.pageOpenedList.splice(get.index, 1, openedPage);
    localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
  },
  clearAllTags (state) {
    state.pageOpenedList.splice(1);
    state.cachePage.length = 0;
    localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
  },
  clearOtherTags (state, vm) {
    let currentName = vm.$route.name;
    let currentIndex = 0;
    state.pageOpenedList.forEach((item, index) => {
      if (item.name === currentName) {
        currentIndex = index;
      }
    });
    if (currentIndex === 0) {
      state.pageOpenedList.splice(1);
    } else {
      state.pageOpenedList.splice(currentIndex + 1);
      state.pageOpenedList.splice(1, currentIndex - 1);
    }
    let newCachepage = state.cachePage.filter(item => {
      return item === currentName;
    });
    state.cachePage = newCachepage;
    localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
  },
  setOpenedList (state) {
    state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
  },
  setCurrentPath (state, pathArr) {
    state.currentPath = pathArr;
  },
  setCurrentPageName (state, name) {
    state.currentPageName = name;
  },
  setAvator (state, path) {
    localStorage.avatorImgPath = path;
  },
  switchLang (state, lang) {
    state.lang = lang;
    Vue.config.lang = lang;
  },
  clearOpenedSubmenu (state) {
    state.openedSubmenuArr.length = 0;
  },
  setMessageCount (state, count) {
    state.messageCount = count;
  },
  increateTag (state, tagObj) {
    if (!Util.oneOf(tagObj.name, state.dontCache)) {
      state.cachePage.push(tagObj.name);
      localStorage.cachePage = JSON.stringify(state.cachePage);
    }
    state.pageOpenedList.push(tagObj);
    localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}