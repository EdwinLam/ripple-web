import { otherRouter, appRouter } from '@/router/router';
import Util from '@/libs/util';
import NodeUtil from '@/utils/NodeUtil'
import { router } from '@/router/index';

const state = {
  cachePage: [],
  lang: '',
  isFullScreen: false,
  openedSubmenuArr: [], // 要展开的菜单数组
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
  tagsList: [],
  routers: [
    otherRouter,
    ...appRouter
  ],
  messageCount: 0,
  defaultPageSize: 10
}

// getters
const getters = {}

const actions = {
  initRouter:function({rootState}){
    const userState = rootState.user
    const authItems = userState.authItems
    let routerList = NodeUtil.filterRouterItems(authItems)
    router.addRoutes(Util.createTree(routerList))
  },
  initPage: function ({commit,rootState,dispatch}) {
    const userState = rootState.user
    const authItems = userState.authItems
    let menuList = authItems
    let routerList = NodeUtil.filterRouterItems(authItems)
    let tagList = NodeUtil.filterTagItems(authItems)
    dispatch("initRouter")
    commit("initPage", {
      menuList:Util.createTree(menuList),
      tagList:tagList,
      routerList:routerList,
      userInfo:userState.userInfo})
  },
  setCurrentPath:function(){

  }
}
const mutations = {
  initPage:function(state,{menuList,tagList,routerList,userInfo}){
    state.menuList = menuList
    state.tagsList=tagList
    state.messageCount = userInfo.messageCount;
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

  increateTag (state, tagObj) {
    state.pageOpenedList.push(tagObj);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}