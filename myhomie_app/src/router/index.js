import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
////登录注册相关////
import login_register from '../pages/login/login_register.vue'
import login from '../pages/login/login.vue'
import register from '../pages/login/register.vue'
import binding from '../pages/login/binding.vue'
import verification from '../pages/login/verification.vue'
import resetPassword from '../pages/login/resetPassword.vue'
////新闻相关////
import news from '../pages/news/news.vue'
import newsDetail from '../pages/news/newsDetail.vue'
////分类信息相关////
import information from '../pages/information/information.vue'
import informationList from '../pages/information/informationList.vue'
import informationDetail from '../pages/information/informationDetail.vue'
////发布相关////
import selectPostType from '../pages/sendPost/selectPostType.vue'
import sendPost from '../pages/sendPost/sendPost.vue'
import sendNews from '../pages/sendPost/sendNews.vue'
import sendDiscover from '../pages/sendPost/sendDiscover.vue'
import richText from '../components/richText.vue'
////发现页相关////
import discover from '../pages/discover/discover.vue'
import discoverDetail from '../pages/discover/discoverDetail.vue'
////个人中心相关////
import center from '../pages/center/center.vue'
import profile from '../pages/center/profile.vue'
import privateLetter from '../pages/center/private_letter.vue'
import privateDetail from '../pages/center/private_detail.vue'
import message from '../pages/center/message.vue'
import setting from '../pages/center/setting.vue'
import myRelease from '../pages/center/my_release.vue'
import myComment from '../pages/center/my_comment.vue'
import myCollection from '../pages/center/my_collection.vue'
////公用的评论等////
import commentReply from '../components/commentReply.vue'
import search from '../components/search.vue'

Vue.use(Router)

const router = new Router({
    // mode: 'history',////使用时apicloud发布会出现不显示页面的问题
    routes: [
        {
            path: '/',
            redirect: '/login_register'  //重定向
        },
        {
            path: '/news',
            component: news,
            meta: {
                name: '新闻首页',
                showFooter: true,
                requireAuth: false,
                keepAlive: true
            }
        },
        {
            path: '/newsDetail/:id',
            name: 'newsDetail',
            component: newsDetail,
            meta: {
                name: '新闻详情页',
                showFooter: false,
                requireAuth: false,
                keepAlive: false
            }
        },
        {
            path: '/commentReply/:commentId',
            name: 'commentReply',
            component: commentReply,
            meta: {
                name: '评论详情页',
                showFooter: false,
                requireAuth: false,
                keepAlive: false
            }
        },
        {
            path: '/search/:type',
            name: 'search',
            component: search,
            meta: {
                name: '搜索页',
                showFooter: false,
                keepAlive: true
            }
        },
        {
            path: '/information',
            component: information,
            meta: {
                name: '信息列表选择页',
                showFooter: true,
                requireAuth: false,
            },
        },
        {
            path: '/informationList/:type',
            name: 'informationList',
            component: informationList,
            meta: {
                name: '信息列表页',
                showFooter: false,
                requireAuth: false,
            },
        },
        {
            path: '/informationDetail/:id',
            name: 'informationDetail',
            component: informationDetail,
            meta: {
                name: '新闻详情页',
                showFooter: false,
                requireAuth: false,
                keepAlive: false
            }
        },
        {
            path: '/selectPostType',
            component: selectPostType,
            meta: {
                name: '发帖选择页面',
                showFooter: false,
                requireAuth: false,
            },
        },
        {
            path: '/sendPost/:type',
            name: 'sendPost',
            component: sendPost,
            meta: {
                name: '发帖',
                showFooter: false,
                requireAuth: true,
                keepAlive: true
            }
        },
        {
            path: '/sendNews',
            name: 'sendNews',
            component: sendNews,
            meta: {
                name: '新闻页发帖',
                showFooter: false,
                requireAuth: true,
            }
        },
        {
            path: '/sendDiscover',
            name: 'sendDiscover',
            component: sendDiscover,
            meta: {
                name: '发现页发帖',
                showFooter: false,
                requireAuth: true,
            }
        },
        {
            path: '/richText',
            component: richText,
            meta: {
                name: '富文本编辑',
                showFooter: false,
                requireAuth: true,
            }
        },
        {
            path: '/discover',
            component: discover,
            meta: {
                name: '发现列表页',
                showFooter: true,
                requireAuth: false,
                keepAlive: true
            },
        },
        {
            path: '/discoverDetail/:id',
            name: 'discoverDetail',
            component: discoverDetail,
            meta: {
                name: '发现详情页',
                showFooter: false,
                requireAuth: false,
                keepAlive: false
            }
        },
        {
            path: '/center',
            component: center,
            meta: {
                name: '个人中心',
                showFooter: true,
                requireAuth: false,
                // keepAlive: true
            },
        },
        {
            path: '/profile',
            component: profile,
            meta: {
                name: '个人基本信息',
                showFooter: false,
                requireAuth: true,
            },
        },
        {
            path: '/private',
            component: privateLetter,
            meta: {
                name: '私信',
                showFooter: false,
                requireAuth: true,
                keepAlive: false
            },
        },
        {
            path: '/private_detail/:id',
            component: privateDetail,
            meta: {
                name: '私信详情',
                showFooter: false,
                requireAuth: true,
            },
        },
        {
            path: '/message',
            component: message,
            meta: {
                name: '消息',
                showFooter: false,
                requireAuth: true,
                keepAlive: true,
            },
        },
        {
            path: '/setting',
            component: setting,
            meta: {
                name: '系统设置',
                showFooter: false,
                requireAuth: false,
            },
        },
        {
            path: '/release',
            component: myRelease,
            meta: {
                name: '我的发布',
                showFooter: false,
                requireAuth: true,
                keepAlive: true,
            },
        },
        {
            path: '/myComment',
            component: myComment,
            meta: {
                name: '我的评论',
                showFooter: false,
                requireAuth: true,
                keepAlive: true,
            },
        },
        {
            path: '/collection',
            component: myCollection,
            meta: {
                name: '收藏',
                showFooter: false,
                requireAuth: true,
                keepAlive: true,
            },
        },
        /////////////////////注册登录绑定相关页面////////////////
        {
            path: '/login_register',
            name: 'login_register',
            component: login_register,
            meta: {
                name: '注册登录页',
                showFooter: false,
                requireAuth: false,
            },
        },
        {
            path: '/login',
            component: login,
            meta: {
                name: '登录页',
                showFooter: false,
                requireAuth: false,
            },
        },
        {
            path: '/register',
            component: register,
            meta: {
                name: '注册页',
                showFooter: false,
                requireAuth: false,
            },
        },
        {
            path: '/binding',
            component: binding,
            meta: {
                name: '微信号绑定手机号',
                showFooter: false,
                requireAuth: false,
            },
        },
        {
            path: '/verification/:data',
            name: 'verification',
            component: verification,
            meta: {
                name: '手机验证码',
                showFooter: false,
                requireAuth: false,
            },
        },
        {
            path: '/resetPassword/:data',
            name: 'resetPassword',
            component: resetPassword,
            meta: {
                name: '重置密码',
                showFooter: false,
                requireAuth: false,
            },
        },
    ],
})
router.beforeEach((to, from, next) => {
    //console.log(store.state.isLogin);
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.loginMessage != null) {
            var data = store.state.loginMessage;
        } else {
            var data = api.getPrefs({
                sync: true,
                key: 'loginMessage'
            });
        }
        if (data != null) {  // 记录的有登录信息
            next();
        } else {
            next({
                path: '/login_register',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
});

export default router;

