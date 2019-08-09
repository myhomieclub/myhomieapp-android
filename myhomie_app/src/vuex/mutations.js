// 提交 mutations是更改Vuex状态的唯一合法方法
export const loginStatus = (state, data) => {
	localStorage.setItem('isLogin', data);
	state.isLogin = data;
}
export const loginMessage = (state, data) => {
	state.loginMessage = data;
}
export const netWork = (state, data) => {
	state.netWork = data;
}