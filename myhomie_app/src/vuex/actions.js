// 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
export const setStatus = ({commit},data) => commit('loginStatus', data);
export const setLogin = ({commit},data) => commit('loginMessage', data);
export const setNetWork = ({commit},data) => commit('netWork', data);