// @name 抽选次数限制插件
// @version 1.0.0

let drawCounter = 0;
const MAX_DRAWS = 10; // 最大抽选次数

// 监听抽选事件
window.plugin_抽选次数限制插件_afterDraw = function() {
    drawCounter++;
    if (drawCounter >= MAX_DRAWS) {
        document.getElementById('drawStudent').disabled = true; // 禁用抽选按钮
        api.alert(`今日抽选次数已达上限（${MAX_DRAWS}次）`);
    }
};

// 添加重置按钮
api.addButton('重置次数', function() {
    if (confirm('确定重置抽选次数？')) {
        drawCounter = 0;
        document.getElementById('drawStudent').disabled = false;
        api.alert('抽选次数已重置');
    }
});