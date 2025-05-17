// @name 抽选冷却插件
// @version 1.0.0

let cooldown = false;
const COOLDOWN_SECONDS = 5; // 冷却时间（秒）

// 抽选前检查冷却
window.plugin_抽选冷却插件_beforeDraw = function() {
    if (cooldown) {
        api.alert(`请等待 ${COOLDOWN_SECONDS} 秒后再抽选`);
        return { cancelDraw: true }; // 取消抽选
    }
    cooldown = true;
    setTimeout(() => cooldown = false, COOLDOWN_SECONDS * 1000);
};

// 显示冷却状态
api.addButton('冷却状态', function() {
    api.alert(`冷却剩余时间：${Math.max(0, COOLDOWN_SECONDS - (Date.now() - cooldownStart))/1000 | 0}秒`);
});