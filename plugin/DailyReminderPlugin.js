// @name 每日提醒插件
// @version 1.0.0
function showReminder() {
    const hour = new Date().getHours();
    if (hour === 9) { // 每天9点提醒
        api.alert('⏰ 今日抽选任务尚未完成！');
    }
}

// 页面加载时检查提醒
window.onload = showReminder;
// 每小时检查一次
setInterval(showReminder, 3600*1000);