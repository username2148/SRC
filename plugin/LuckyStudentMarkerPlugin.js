// @name 幸运学生标记插件（修复版）
// @version 1.1.0

function markLuckyStudent() {
    if (students.length === 0) return;
    
    // 生成随机索引（避免每次相同）
    const luckyIndex = Math.floor(Math.random() * students.length);
    const luckyStudent = students[luckyIndex];
    
    // 使用文本节点匹配，避免 HTML 标签干扰
    const currentListText = document.getElementById('currentList').textContent;
    const regex = new RegExp(`\\b${luckyStudent}\\b`, 'g');
    const newHtml = currentListText.replace(regex, 
        `<span style="color: #FF4444; font-weight: bold;">${luckyStudent}</span>`
    );
    
    // 安全更新 DOM
    document.getElementById('currentList').innerHTML = newHtml;
}

// 绑定到主系统的 updateDisplay 事件（名单更新时触发）
window.plugin_幸运学生标记插件_onUpdateDisplay = function() {
    markLuckyStudent();
};

// 在抽选后和名单更新时触发标记
window.plugin_幸运学生标记插件_afterDraw = function() {
    markLuckyStudent();
    api.log('[幸运标记] 已更新');
};

// 初始化时绑定到主系统的加载事件
window.onload = function() {
    // 确保主系统加载完成后执行
    setTimeout(() => {
        markLuckyStudent();
        api.log('[幸运标记] 初始化完成');
    }, 500);
};