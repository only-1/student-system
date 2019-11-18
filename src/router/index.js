import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routes = () => {
  return [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['@view/login/login'], resolve),
    },
    {
      path: '/studentCenter',
      component: resolve => require(['@view/studentCenter'], resolve),
    },
    {
      path: '/studentCenter/:categoryCode',
      component: resolve => require(['@view/studentCenter'], resolve),
    },
    {
      path: '/publicDetail/:id',
      component: resolve => require(['@view/publicDetail'], resolve),
    },
    {
      path: '/curriculum',
      component: resolve => require(['@view/curriculum'], resolve),
    },
    {
      path: '/curriculum/:categoryCode',
      component: resolve => require(['@view/curriculum'], resolve),
    },
    {
      path: '/curriculumDetail/:id',
      component: resolve => require(['@view/curriculumDetail'], resolve),
    },
    {
      path: '/examCenter/:catecode',
      component: resolve => require(['@view/examCenter'], resolve),
    },
    {
      path: '/examDetail/:examId',
      component: resolve => require(['@view/examDetail'], resolve),
    },
    {
      path: '/examOnline/:examId',
      component: resolve => require(['@view/examOnline'], resolve),
    },
    {
      path: '/examOnline/:paperId/:curriculumId',
      component: resolve => require(['@view/examOnline'], resolve),
    },
    {
      path: '/examRecord',
      component: resolve => require(['@view/examRecord'], resolve),
    },
    {
      path: '/recordDetail/:examId',
      component: resolve => require(['@view/examRecord'], resolve),
    },
    {
      path: '/publicDetail',
      component: resolve => require(['@view/publicDetail'], resolve),
    },
    {
      path: '/chapterPlay/:cswId/:chapterId',
      component: resolve => require(['@view/chapterPlay'], resolve),
    },
    {
      path: '/chapterPlay/:curriculumId/:cswId/:chapterId',
      component: resolve => require(['@view/chapterPlay'], resolve),
    },
    {
      path: '/subject',
      component: resolve => require(['@view/subject'], resolve),
    },
    {
      path: '/examOnline',
      component: resolve => require(['@view/examOnline'], resolve),
    }
    ,
    {
      path: '/testPlayer',
      component: resolve => require(['@components/video_player_mp4'], resolve),
    }


  ]
}

const router = new Router({
  mode: 'hash',
  base: '',
  routes: routes(),
});

//将路由配置公布
export default router
