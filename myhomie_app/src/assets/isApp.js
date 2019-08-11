var isApp = () => {
    var userAgentInfo = navigator.userAgent.toLowerCase();
    console.log(userAgentInfo);
    var Agents = new Array("android", "iphone", "symbianOS", "windows phone", "ipad", "ipod");
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}
export default isApp;