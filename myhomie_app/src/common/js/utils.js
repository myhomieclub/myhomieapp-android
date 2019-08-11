var year, month, date, hour, minute, day;
var year_now, month_now, date_now, hours_now, minutes_now;

function time_php(par) { //php传过来的时间
    let time = new Date(parseInt(par) * 1000);
    year = time.getFullYear();
    month = time.getMonth() + 1;
    date = time.getDate();
    hour = time.getHours();
    minute = time.getMinutes();
    day = time.getDay();
    if (day == 0) day = 'Sun';
    if (day == 1) day = 'Mon';
    if (day == 2) day = 'Tue';
    if (day == 3) day = 'Wed';
    if (day == 4) day = 'Thu';
    if (day == 5) day = 'Fri';
    if (day == 6) day = 'Sat';
    // var second = time.getSeconds();
}

function time_now() { //当前时间
    let time = new Date();
    year_now = time.getFullYear();
    month_now = time.getMonth() + 1;
    date_now = time.getDate();
    hours_now = time.getHours();
    minutes_now = time.getMinutes();
    // var second_now = time.getSeconds();
}

const time_post_list = par => { //帖子列表页的时间显示 几小时前几分钟前 昨天
    time_now();
    time_php(par);
    let result_time = '';
    if (year == year_now) {
        if (month == month_now) {
            if (date == date_now) {
                var diff_hour = hours_now - hour;
                if (diff_hour = 0) {
                    var diff_minute = minutes_now - minute;
                    result_time = diff_minute + 'min ago';
                } else {
                    result_time = diff_hour + 'hours ago';
                }
            } else if (data == date_now - 1) {
                result_time = 'yesterday' + ' ' + hour + ':' + minute;
            } else {
                result_time = month + '-' + date + ' ' + hour + ':' + minute;
            }
        } else {
            result_time = month + '-' + date + ' ' + hour + ':' + minute;
        }
    } else result_time = year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
    return result_time;
}
const time_post_detail = par => { //帖子详情页的时间显示 （年）月日 时分
    time_php(par);
    time_now();
    let result_time = '';
    if (year == year_now) result_time = month + '-' + date + ' ' + hour + ':' + minute;
    else result_time = year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
    return result_time;
}
const time_chat_list = par => { //私信聊天的时间显示 
    time_php(par);
    time_now();
    let result_time = '';
    if (year == year_now) {
        if (month == month_now) {
            let diff_date = date_now - date;
            if (diff_date == 0) {
                result_time = hour + ':' + minute;
            } else if (diff_date == 1) {
                result_time = 'yesterday';
            } else if (diff_date < 7) {
                result_time = day;
            }
        } else {
            result_time = month + '-' + date;
        }
    } else result_time = year + '-' + month + '-' + date;
    return result_time;
}
const time_chat_detail = par => { //私信聊天详情页的时间显示 
    time_php(par);
    time_now();
    let result_time = '';
    if (year == year_now) {
        if (month == month_now) {
            let diff_date = date_now - date;
            if (diff_date == 0) {
                result_time = hour + ':' + minute;
            } else if (diff_date == 1) {
                result_time = 'yesterday' + ' ' + hour + ':' + minute;
            } else if (diff_date < 7) {
                result_time = day + ' ' + hour + ':' + minute;
            }
        } else {
            result_time = month + '-' + date + ' ' + hour + ':' + minute;
        }
    } else result_time = year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
    return result_time;
}
export {time_post_list, time_post_detail, time_chat_list, time_chat_detail}