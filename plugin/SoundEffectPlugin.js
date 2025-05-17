// @name 抽选音效插件
// @version 1.0.0
const sounds = {
    draw: new Audio('https://lx-sycdn.kuwo.cn/978484aa13738b1574fb41a86bb88011/68271e53/resource/n2/89/45/1785137185.mp3'), // 抽选音效
    success: new Audio('https://assets.mixkit.co/active_storage/sfx/1771/1771-preview.mp3') // 成功音效
};

window.plugin_抽选音效插件_beforeDraw = function() {
    sounds.draw.play();
};

window.plugin_抽选音效插件_afterDraw = function() {
    sounds.success.play();
};