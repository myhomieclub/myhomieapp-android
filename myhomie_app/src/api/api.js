import axios from './http.js';
import URL from './../assets/url.js';
// import qs from 'qs';

/*登录注册相关接口*/
const login = params => { //登陆 手机号+密码
    return axios.post(URL.base_url + '/login/index/login', params).then(res => res.data);
}
const register = params => { //注册 
    return axios.post(URL.base_url + '/login/index/reUser', params).then(res => res.data);
}
const resetPass = params => { //重置密码
    return axios.post(URL.base_url + '/login/index/resetPass', params).then(res => res.data);
}
const sendSMS = params => { //发送短信验证码 手机号+密码+图形验证码
    return axios.post(URL.base_url + '/login/index/sendSMS', params).then(res => res.data);
}
var que = Math.random(); //获取图片验证码
const getImgCode = URL.base_url + '/login/index/getImageCode?query=' + que;

const isLogin = params => { //是否登录
    return axios.get(URL.base_url + '/index/index/isLoggedIn').then(res => res.data);
}
const logout = params => { //退出登录
    return axios.get(URL.base_url + '/index/index/logout').then(res => res.data);
}
const loginViaw = params => {
    return axios.post(URL.base_url + '/login/index/loginViaW', params).then(res => res.data);
}
/*登录注册相关接口*/

/*个人中心页面相关*/
const getUserInfo = params => { //获取单个用户信息
    return axios.post(URL.base_url + '/user/index/getUserInfo').then(res => res.data);
}
const updateUserInfo = params => { //更新用户信息
    return axios.post(URL.base_url + '/user/index/updateUserInfo', params).then(res => res.data);
}
const getUsers = params => { //获得所有的用户信息
    return axios.post(URL.base_url + '/user/index/getUsers').then(res => res.data);
}
const getUserInfoById = params => { //根据id获得个人信息
    return axios.get(URL.base_url + '/user/index/getUserBasic?userid=' + params).then(res => res.data);
}
const getPMList = params => { //获得私信列表
    return axios.post(URL.base_url + '/pmessage/index/getPMList').then(res => res.data);
}
const getPM = params => { //获得私信内容
    return axios.post(URL.base_url + '/pmessage/index/getPM', params).then(res => res.data);
}
const message = params => { //发私信
    return axios.post(URL.base_url + '/pmessage/index/message', params).then(res => res.data);
}

/*个人中心页面相关*/

/*发帖相关*/
const uploadImg = params => { //发帖上传照片
    return axios.post(URL.base_url + '/post/Index/uploadImg', params).then(res => res.data);
}
const uploadVideo = params => { //发帖上传视频
    return axios.post(URL.base_url + '/post/Index/uploadVideo', params).then(res => res.data);
}
const sendPost = params => { //发帖
    return axios.post(URL.base_url + '/post/Index/sendPost', params).then(res => res.data);
}
/*发帖相关*/

/*帖子展示相关*/
const queryPosts = params => { //根据分类展示帖子列表
    return axios.get(URL.base_url + '/post/Index/queryPosts?' + params).then(res => res.data);
}
const queryPostDetail = params => { //获得一个帖子的详细信息 postid
    return axios.get(URL.base_url + '/post/Index/queryPostDetailed?postid=' + params).then(res => res.data);
}
const getGroupComments = params => { //获得帖子下的大评论
    return axios.post(URL.base_url + '/comment/index/adv_getGroupComments', params).then(res => res.data);
}
const getCommentReplies = params => { //获得一个评论的所有回复
    return axios.post(URL.base_url + '/comment/index/adv_getCommentReplies', params).then(res => res.data);
}
const delPost = params => {
    return axios.get(URL.base_url + '/post/Index/delPost?postid=' + params).then(res => res.data);
}
/*帖子展示相关*/

/*评论点赞收藏相关*/
const likePost = params => { //点赞取消点赞一个帖子 postid
    return axios.post(URL.base_url + '/like/index/likePost', params).then(res => res.data);
}
const isPostLiked = params => { //帖子点赞状态 postid
    return axios.post(URL.base_url + '/like/index/isPostLiked', params).then(res => res.data);
}
const likeComment = params => { //点赞取消点赞一个评论 commentid
    return axios.post(URL.base_url + '/like/index/likeComment', params).then(res => res.data);
}
const isCommentLiked = params => { //评论点赞状态 commentid
    return axios.post(URL.base_url + '/like/index/isCommentLiked', params).then(res => res.data);
}
const queryLikes = params => { //我收到的点赞
    return axios.get(URL.base_url + '/like/index/queryLikes').then(res => res.data);
}
const getCommentDetail = params => {
    return axios.get(URL.base_url + '/comment/index/getCommentDetail?comment_id=' + params).then(res => res.data);
}
const commentAPost = params => { //添加一个评论 postid groupid content
    return axios.post(URL.base_url + '/comment/index/commentAPost', params).then(res => res.data);
}
const getMyComments = params => { //获得自己的评论/回复
    return axios.post(URL.base_url + '/comment/index/adv_getMyComments').then(res => res.data);
}
const getReceivedComments = params => { //我收到的评论/回复
    return axios.post(URL.base_url + '/comment/index/adv_getReceivedComments').then(res => res.data);
}
const delAComment = params => { //删除一个评论 commentid
    return axios.post(URL.base_url + '/comment/index/delAComment', params).then(res => res.data);
}
const fav = params => { //收藏取消收藏一个帖子
    return axios.post(URL.base_url + '/favorite/index/fav', params).then(res => res.data);
}
const isFav = params => { //是否收藏一个帖子 根据postid
    return axios.get(URL.base_url + '/favorite/index/isFav?postid=' + params).then(res => res.data);
}
const addToFav = params => { //添加到收藏 postid
    return axios.post(URL.base_url + '/favorite/index/addToFav', params).then(res => res.data);
}
const deleteAFav = params => { //删除一个收藏 favoriteid
    return axios.post(URL.base_url + '/favorite/index/deleteAFav', params).then(res => res.data);
}
const getAllFav = params => { //获得所有收藏 favoriteid
    return axios.get(URL.base_url + '/favorite/index/adv_getAllFav?post_type=' + params).then(res => res.data);
}
/*评论点赞收藏相关*/

/*搜索相关*/
const queryPostsBySearchItem = params => { //根据关键词获得帖子搜索项
    return axios.get(URL.base_url + '/post/Index/queryPostsBySearchItem?sort=latest' + params).then(res => res.data);
}
const getAllAvailableSearches = params => { //获得用户的搜索 
    return axios.get(URL.base_url + '/search/Index/getAllAvailableSearches').then(res => res.data);
}
const getHotSearch = params => { //获得热度搜索
    return axios.get(URL.base_url + '/search/Index/getHotSearches?num=10&post_type=' + params).then(res => res.data);
}
const deleteASearch = params => { //删除某一个搜索
    return axios.get(URL.base_url + '/search/Index/deleteASearch?search_id=' + params).then(res => res.data);
}
const deleteAllSearches = params => { //删除所有的搜索
    return axios.get(URL.base_url + '/search/Index/deleteAllSearches').then(res => res.data);
}
/*搜索相关*/

/*举报相关*/
const reportAPost = params => {
    return axios.post(URL.base_url + '/report/index/reportAPost', params).then(res => res.data);
}
const reportAComment = params => {
    return axios.post(URL.base_url + '/report/index/reportAComment', params).then(res => res.data);
}
/*举报相关*/
export default {
    login,
    register,
    resetPass,
    sendSMS,
    getImgCode,
    isLogin,
    logout,
    loginViaw,
    getUserInfo,
    updateUserInfo,
    getUsers,
    getUserInfoById,
    getPMList,
    getPM,
    message,
    delAComment,
    uploadImg,
    uploadVideo,
    sendPost,
    queryPosts,
    queryPostDetail,
    getGroupComments,
    getCommentReplies,
    delPost,
    likePost,
    likeComment,
    isPostLiked,
    isCommentLiked,
    queryLikes,
    getCommentDetail,
    commentAPost,
    getMyComments,
    getReceivedComments,
    fav,
    isFav,
    addToFav,
    deleteAFav,
    getAllFav,
    queryPostsBySearchItem,
    getAllAvailableSearches,
    getHotSearch,
    deleteASearch,
    deleteAllSearches,
    reportAPost,
    reportAComment
}


// //获取post列表
// const getPostList = params => {
// 	return axios.get(`/post/list`, {
// 		params: params
// 	});
// };
// //获取单个post内容
// const getPost = params => {
// 	return axios.get(`/post/detail`, {
// 		params: params
// 	});
// };
// //获取当个post下面的评论内容
// const getCommentList = params => {
// 	return axios.get(`/post/commentList`, {
// 		params: params
// 	});
// };
// //获取单个评论
// const getComment = params => {
// 	return axios.get(`/post/comment`, {
// 		params: params
// 	});
// };
// //新增加一个post
// const addPost = params => {
// 	return axios.post(`/post/addPost`, params).then(res => res.data);
// };


